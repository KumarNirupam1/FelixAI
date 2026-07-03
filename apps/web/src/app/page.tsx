import { HeroSection } from "@/components/hero-section";
import { DashboardPreview } from "@/components/dashboard-preview";
import { SocialProof } from "@/components/social-proof";
import { BentoSection } from "@/components/bento-section";
import { LargeTestimonial } from "@/components/large-testimonial";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { FooterSection } from "@/components/footer-section";
import { AnimatedSection } from "@/components/animated-section";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background pb-0">
      <div className="relative z-10">
        <main className="relative w-full">
          <HeroSection />
          <div className="absolute bottom-[-60px] left-1/2 z-30 -translate-x-1/2 transform md:bottom-[-180px]">
            <AnimatedSection>
              <DashboardPreview />
            </AnimatedSection>
          </div>
        </main>

        <AnimatedSection
          className="relative z-10 mx-auto mt-[380px] w-full px-6 md:mt-[360px]"
          delay={0.1}
        >
          <SocialProof />
        </AnimatedSection>

        <AnimatedSection
          id="features-section"
          className="relative z-10 mx-auto mt-16 w-full"
          delay={0.2}
        >
          <BentoSection />
        </AnimatedSection>

        <AnimatedSection className="relative z-10 mx-auto mt-8 w-full md:mt-16" delay={0.2}>
          <LargeTestimonial />
        </AnimatedSection>

        <AnimatedSection
          id="how-it-works-section"
          className="relative z-10 mx-auto mt-8 w-full md:mt-16"
          delay={0.2}
        >
          <HowItWorksSection />
        </AnimatedSection>

        <AnimatedSection
          id="faq-section"
          className="relative z-10 mx-auto mt-8 w-full md:mt-16"
          delay={0.2}
        >
          <FAQSection />
        </AnimatedSection>

        <AnimatedSection className="relative z-10 mx-auto mt-8 w-full md:mt-16" delay={0.2}>
          <CTASection />
        </AnimatedSection>

        <AnimatedSection className="relative z-10 mx-auto mt-8 w-full md:mt-16" delay={0.2}>
          <FooterSection />
        </AnimatedSection>
      </div>
    </div>
  );
}
