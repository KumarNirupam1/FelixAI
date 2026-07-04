import { useCallback, useEffect, useRef, useState } from "react";

interface Options {
  onTranscript?: (text: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
}

export function useVoiceInput(options: Options = {}) {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current?.stop();
    }
    mediaRecorderRef.current = null;

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.close();
    }
    socketRef.current = null;

    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;

    setIsRecording(false);
  }, []);

  const startRecording = useCallback(async () => {
    const apiKey =
      (await window.api.getDeepgramKey?.()) ||
      import.meta.env.VITE_DEEPGRAM_API_KEY;

    if (!apiKey) {
      setError("Add DEEPGRAM_API_KEY to your .env file");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const socket = new WebSocket(
        "wss://api.deepgram.com/v1/listen?model=nova-2&language=en&punctuate=true&smart_format=true",
        ["token", apiKey],
      );
      socketRef.current = socket;

      socket.onopen = () => {
        setIsRecording(true);
        setError(null);

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
            socket.send(event.data);
          }
        };

        mediaRecorder.start(250);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data as string) as {
            channel?: { alternatives?: Array<{ transcript?: string }> };
            is_final?: boolean;
          };
          const text = data.channel?.alternatives?.[0]?.transcript;
          if (text) {
            optionsRef.current.onTranscript?.(text, Boolean(data.is_final));
          }
        } catch {
          /* ignore malformed frames */
        }
      };

      socket.onerror = () => {
        setError("Voice connection error");
        optionsRef.current.onError?.("Voice connection error");
        stopRecording();
      };

      socket.onclose = () => setIsRecording(false);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Microphone access denied";
      setError(msg);
      optionsRef.current.onError?.(msg);
    }
  }, [stopRecording]);

  const toggleRecording = useCallback(() => {
    if (isRecording) stopRecording();
    else void startRecording();
  }, [isRecording, startRecording, stopRecording]);

  useEffect(() => () => stopRecording(), [stopRecording]);

  return { isRecording, error, toggleRecording };
}
