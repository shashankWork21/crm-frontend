import { getSuffix } from "@/lib/date";

export default function DateDisplay({ day }: { day: number }) {
  const suffix = getSuffix(day);
  return (
    <span>
      {day}
      <sup className="text-xs font-normal">{suffix}</sup>
    </span>
  );
}
