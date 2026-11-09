import { MotionProvider } from "@/components/Motion";
import AboutSection from "@/components/AboutSection";
import AdmissionSection from "@/components/AdmissionSection";
import BackOfficeSection from "@/components/BackOfficeSection";
import CatalogueSection from "@/components/CatalogueSection";
import CounterSection from "@/components/CounterSection";
import CtaSection from "@/components/CtaSection";
import FaqSection from "@/components/FaqSection";
import Hero from "@/components/Hero";
import HomeHeader from "@/components/HomeHeader";
import HomeScrollNav from "@/components/HomeScrollNav";
import PageBackdrop from "@/components/PageBackdrop";
import ParentsSection from "@/components/ParentsSection";
import ReconcileSection from "@/components/ReconcileSection";
import RolesSection from "@/components/RolesSection";
import RulesSection from "@/components/RulesSection";
import SiteFooter from "@/components/SiteFooter";
import SuiteSection from "@/components/SuiteSection";

export default function Home() {
  return (
    <MotionProvider>
      <PageBackdrop />
      <HomeHeader />
      {/* clip, not hidden: the catalogue's sticky rail needs a scrollable page,
          and tilted objects must not widen it on a phone as they animate in. */}
      <main className="overflow-x-clip">
        <Hero />
        <AboutSection />
        <CatalogueSection />
        <AdmissionSection />
        <CounterSection />
        <ParentsSection />
        <BackOfficeSection />
        <ReconcileSection />
        <RolesSection />
        <RulesSection />
        <SuiteSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
      <HomeScrollNav />
    </MotionProvider>
  );
}
