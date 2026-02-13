"use client";

import { Automation } from "@/lib/types";
import ExistingAutomationItem from "./existing-automation-item";

interface ExistingAutomationsListProps {
  tokenId: string;
  automations: Automation[];
  onToggleActive?: (id: string, isActive: boolean) => void;
  onDelete?: (id: string) => void;
}

export default function ExistingAutomationsList({
  tokenId,
  automations,
  onToggleActive,
  onDelete,
}: ExistingAutomationsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 my-5">
      {automations.map((automation) => (
        <ExistingAutomationItem
          tokenId={tokenId}
          key={automation.id}
          automation={automation}
          onToggleActive={onToggleActive}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
