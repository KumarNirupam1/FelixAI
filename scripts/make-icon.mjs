// Generates a valid 32x32 PNG tray/app icon (accent-colored disc on transparent).
// Writes apps/desktop/build/icon.png and prints its base64 to stdout.
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";

const W = 32, H = 32;
const accent = [0x7c, 0x5c, 0xff];

const stride = 1 + W * 4;
const raw = Buffer.alloc(H * stride);
const cx = (W - 1) / 2, cy = (H - 1) / 2, r = W / 2 - 2;
for (let y = 0; y < H; y++) {
  raw[y * stride] = 0; // filter type: none
  for (let x = 0; x < W; x++) {
    const dist = Math.hypot(x - cx, y - cy);
    const a = dist <= r ? 255 : dist <= r + 1 ? 128 : 0;
    const o = y * stride + 1 + x * 4;
    raw[o] = accent[0];
    raw[o + 1] = accent[1];
    raw[o + 2] = accent[2];
    raw[o + 3] = a;
  }
}

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (~c) >>> 0;
}
function chunk(type, data) {
  const t = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}

const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;  // bit depth
ihdr[9] = 6;  // color type: RGBA
const idat = deflateSync(raw);
const png = Buffer.concat([
  sig,
  chunk("IHDR", ihdr),
  chunk("IDAT", idat),
  chunk("IEND", Buffer.alloc(0)),
]);

mkdirSync("apps/desktop/build", { recursive: true });
writeFileSync("apps/desktop/build/icon.png", png);
process.stdout.write(png.toString("base64"));
