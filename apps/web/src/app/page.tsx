import { HeroSection } from "@/components/hero-section";
import { DashboardPreview } from "@/components/dashboard-preview";
import { SocialProof } from "@/components/social-proof";
import { BentoSection } from "@/components/bento-section";
import { HowItWorksSection } from "@/components/how-it-works";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { FooterSection } from "@/components/footer-section";
import { AnimatedSection } from "@/components/animated-section";

export default function LandingPage() {
  return (
    <div className="relative w-full overflow-x-clip">
      <div className="relative z-10">
        <main className="relative w-full">
          <HeroSection />
          <div className="absolute bottom-[-72px] left-1/2 z-30 -translate-x-1/2 md:bottom-[-200px]">
            <AnimatedSection>
              <DashboardPreview />
            </AnimatedSection>
          </div>
        </main>

        <AnimatedSection className="mx-auto mt-[360px] w-full md:mt-[340px]" delay={0.1}>
          <SocialProof />
        </AnimatedSection>

        <AnimatedSection
          id="features-section"
          className="mx-auto mt-16 w-full md:mt-24"
          delay={0.15}
        >
          <BentoSection />
        </AnimatedSection>

        <AnimatedSection className="mx-auto mt-16 w-full md:mt-24" delay={0.15}>
          <HowItWorksSection />
        </AnimatedSection>

        <AnimatedSection
          id="faq-section"
          className="mx-auto mt-16 w-full md:mt-24"
          delay={0.15}
        >
          <FAQSection />
        </AnimatedSection>

        <AnimatedSection className="mx-auto mt-16 w-full md:mt-24" delay={0.15}>
          <CTASection />
        </AnimatedSection>

        <AnimatedSection className="mx-auto mt-8 w-full md:mt-12" delay={0.1}>
          <FooterSection />
        </AnimatedSection>
      </div>
    </div>
  );
}
