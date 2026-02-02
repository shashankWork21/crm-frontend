"use client";

import { leadMagnetSteps } from "@/lib/utils";
import LeadMagnetStepItem from "./lead-magnet-step-item";

interface LeadMagnetStepsProps {
  currentStep: number;
}

export default function LeadMagnetSteps({ currentStep }: LeadMagnetStepsProps) {
  return (
    <div className="flex md:flex-row items-center justify-center gap-4 xl:gap-8 my-10 mx-auto">
      {leadMagnetSteps.map((step) => (
        <LeadMagnetStepItem
          key={step.stepNumber}
          currentStep={currentStep}
          stepNumber={step.stepNumber}
          title={step.title}
          description={step.description}
        />
      ))}
    </div>
  );
}
