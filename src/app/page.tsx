/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AnalysisFlowSection from "@/components/AnalysisFlowSection";
import VulnerabilityShowcase from "@/components/VulnerabilityShowcase";
import TestingMethodsSection from "@/components/TestingMethodsSection";
import MetricsSection from "@/components/MetricsSection";
import TechnologySection from "@/components/TechnologySection";
import UseCasesSection from "@/components/UseCasesSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AnalysisFlowSection />
      <TestingMethodsSection />
      <VulnerabilityShowcase />
      <MetricsSection />
      <TechnologySection />
      <UseCasesSection />
      <WaitlistSection />
      <Footer />
    </>
  );
}
