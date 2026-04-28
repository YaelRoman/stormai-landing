/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useState } from "react";
import { LangProvider } from "@/components/demo/LangContext";
import DemoFrame from "@/components/demo/DemoFrame";
import ColdOpen from "@/components/demo/steps/ColdOpen";
import MiseEnPlace from "@/components/demo/steps/MiseEnPlace";
import TheScan from "@/components/demo/steps/TheScan";
import MainCourse from "@/components/demo/steps/MainCourse";
import Plating from "@/components/demo/steps/Plating";
import Tasting from "@/components/demo/steps/Tasting";

const STEPS = [ColdOpen, MiseEnPlace, TheScan, MainCourse, Plating, Tasting];

export default function DemoPage() {
  const [step, setStep] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goNext = () => {
    if (step >= STEPS.length - 1) return;
    setTransitioning(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setTransitioning(false);
    }, 700);
  };

  const StepComponent = STEPS[step];

  return (
    <LangProvider>
      <DemoFrame step={step} onNext={goNext} transitioning={transitioning}>
        <StepComponent />
      </DemoFrame>
    </LangProvider>
  );
}
