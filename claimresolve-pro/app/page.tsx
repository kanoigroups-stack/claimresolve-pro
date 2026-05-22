import Header from "@/components/navigation/Header";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TrustSection from "@/components/sections/TrustSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import KnowledgeSection from "@/components/sections/KnowledgeSection";
import CTABannerSection from "@/components/sections/CTABannerSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/sections/Footer";
import WhatsAppFloat from "@/components/floating/WhatsAppFloat";
import StickyMobileCTA from "@/components/floating/StickyMobileCTA";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <TrustSection />
      <TestimonialsSection />
      <KnowledgeSection />
      <CTABannerSection />
      <FAQSection />
      <Footer />
      <WhatsAppFloat />
      <StickyMobileCTA />
    </main>
  );
}