"use client";

import { leadMagnetSteps } from "@/lib/utils";
import LeadMagnetStepItem from "./lead-magnet-step-item";

export default function LeadMagnetSteps() {
  return (
    <div className="flex flex-col items-start">
      <div>Start capturing leads by following this simple 3-step process</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10 mx-auto">
        {leadMagnetSteps.map((step) => (
          <LeadMagnetStepItem
            key={step.stepNumber}
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </div>
  );
}
