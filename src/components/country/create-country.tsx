"use client";

import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface CreateCountryProps {
  handleCreate: (countryName: string) => void;
  isCreating: boolean;
  countrySearchTerm: string;
  buttonText: string;
  optionsExist: boolean;
}

export default function CreateCountry({
  handleCreate,
  isCreating,
  countrySearchTerm,
  buttonText,
  optionsExist,
}: CreateCountryProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-6">
      <p className="text-sm text-gray-600">
        {optionsExist
          ? `These are the countries that have the term "${countrySearchTerm}" in them. In case you want to add a new country, click the button below.`
          : `No country found with name "${countrySearchTerm}". Want to add this country to our list?`}
      </p>
      <Button
        size="sm"
        onClick={() => handleCreate(countrySearchTerm)}
        disabled={isCreating}
        className="bg-sunglow hover:bg-sunglow-600 text-rich-black cursor-pointer"
      >
        {isCreating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          buttonText
        )}
      </Button>
    </div>
  );
}
