import { OceanBackground } from "@/components/ocean-background";
import { HeroSection } from "@/components/hero-section";
import { DashboardPreview } from "@/components/dashboard-preview";
import { SocialProof } from "@/components/social-proof";
import { BentoSection } from "@/components/bento-section";
import { ArchitectureFlowSection } from "@/components/architecture-flow-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { FooterSection } from "@/components/footer-section";
import { AnimatedSection } from "@/components/animated-section";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black">
      <OceanBackground />

      <div className="relative z-10">
        <main className="relative w-full">
          <HeroSection />
          <div className="relative mx-auto -mt-8 max-w-5xl px-5 md:-mt-16">
            <AnimatedSection>
              <DashboardPreview />
            </AnimatedSection>
          </div>
        </main>

        <AnimatedSection className="mx-auto mt-20 w-full px-6 md:mt-28" delay={0.1}>
          <SocialProof />
        </AnimatedSection>

        <AnimatedSection
          id="features-section"
          className="mx-auto mt-20 w-full md:mt-28"
          delay={0.15}
        >
          <BentoSection />
        </AnimatedSection>

        <AnimatedSection className="mx-auto mt-16 w-full md:mt-24" delay={0.15}>
          <ArchitectureFlowSection />
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

        <AnimatedSection className="mx-auto w-full" delay={0.1}>
          <FooterSection />
        </AnimatedSection>
      </div>
    </div>
  );
}
