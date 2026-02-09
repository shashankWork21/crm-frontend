"use client";

interface LeadMagnetStepItemProps {
  stepNumber: number;
  title: string;
  description: string;
}

export default function LeadMagnetStepItem({
  stepNumber,
  title,
  description,
}: LeadMagnetStepItemProps) {
  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg border-l-4 bg-sunglow text-black`}
    >
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full font-bold bg-sunglow text-black border-2 border-rich-black`}
      >
        {stepNumber}
      </div>
      <div>
        <h3 className={`text-lg font-semibold `}>{title}</h3>
        <p className={`mt-1 text-sm`}>{description}</p>
      </div>
    </div>
  );
}
