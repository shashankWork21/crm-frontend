"use client";

import { Automation, Token } from "@/lib/types";

import ExistingAutomationItemReviewer from "./existing-automation-item-reviewer";

interface ExistingAutomationsListProps {
  tokens: Token[];
  automations: Automation[];
  onToggleActive?: (id: string, isActive: boolean) => void;
  onDelete?: (id: string) => void;
}

export default function ExistingAutomationsListReviewer({
  tokens,
  automations,
  onToggleActive,
  onDelete,
}: ExistingAutomationsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4 my-5">
      {automations.map((automation) => (
        <ExistingAutomationItemReviewer
          key={automation.id}
          tokens={tokens}
          automation={automation}
          onToggleActive={onToggleActive}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
