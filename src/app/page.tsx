/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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
      <MetricsSection />
      <TechnologySection />
      <UseCasesSection />
      <WaitlistSection />
      <Footer />
    </>
  );
}
