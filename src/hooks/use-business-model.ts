import { useState } from "react";
import {
  BusinessModelOption,
  businessModelOptions,
} from "@/lib/options/business-models.options";

export function useBusinessModel() {
  const [selectedBusinessModel, setSelectedBusinessModel] =
    useState<BusinessModelOption | null>(null);

  const handleBusinessModelChange = (option: string) => {
    const selectedOption = businessModelOptions.find(
      (bm) => bm.value === option
    );
    if (selectedOption) {
      setSelectedBusinessModel(selectedOption);
    }
  };

  return {
    selectedBusinessModel,
    handleBusinessModelChange,
    businessModelOptions,
  };
}
