"use client";

import LeadMagnetStepItem from "./lead-magnet-step-item";

interface LeadMagnetStepsProps {
  currentStep: number;
}

export default function LeadMagnetSteps({ currentStep }: LeadMagnetStepsProps) {
  const steps = [
    {
      title: "Create Lead Magnet",
      description: "A resource that attracts leads into your business.",
      stepNumber: 1,
    },
    {
      title: "Connect to Instagram",
      description: "Set up Instagram automations to deliver your lead magnet.",
      stepNumber: 2,
    },
    {
      title: "Engage with Leads",
      description:
        "Nurture your new leads through targeted Instagram campaigns.",
      stepNumber: 3,
    },
  ];

  return (
    <div className="flex md:flex-row items-center justify-center gap-4 xl:gap-8 my-10 mx-auto">
      {steps.map((step) => (
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
