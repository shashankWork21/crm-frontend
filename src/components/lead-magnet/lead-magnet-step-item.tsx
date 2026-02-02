"use client";

interface LeadMagnetStepItemProps {
  currentStep: number;
  stepNumber: number;
  title: string;
  description: string;
}

export default function LeadMagnetStepItem({
  currentStep,
  stepNumber,
  title,
  description,
}: LeadMagnetStepItemProps) {
  const isActive = currentStep === stepNumber;
  const isDone = currentStep > stepNumber;

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg border-l-4 ${
        isActive
          ? "border-sunglow bg-sunglow-500/20"
          : isDone
          ? "border-green-500 bg-green-500/10"
          : "border-slate-600 bg-slate-800/50"
      }`}
    >
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
          isActive
            ? "bg-sunglow text-rich-black"
            : isDone
            ? "bg-green-500 text-white"
            : "bg-slate-700 text-slate-400"
        }`}
      >
        {stepNumber}
      </div>
      <div>
        <h3
          className={`text-lg font-semibold ${
            isActive
              ? "text-sunglow"
              : isDone
              ? "text-green-400"
              : "text-slate-400"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-1 text-sm ${
            isActive || isDone ? "text-slate-300" : "text-slate-500"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
