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
          ? "border-sunglow bg-sunglow-600"
          : isDone
          ? "border-oxford-blue bg-powder-blue"
          : "border-gray-300 bg-gray-300"
      }`}
    >
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
          isActive
            ? "bg-sunglow text-rich-black"
            : isDone
            ? "bg-oxford-blue text-gray-300"
            : "bg-gray-400 text-gray-300"
        }`}
      >
        {stepNumber}
      </div>
      <div>
        <h3
          className={`text-lg font-semibold ${
            isActive || isDone ? "text-rich-black" : "text-gray-400"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-1 text-sm ${
            isActive || isDone ? "text-rich-black/80" : "text-gray-400"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
