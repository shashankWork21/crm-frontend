"use client";

import { useRouter } from "next/navigation";
import { Building2, Loader2 } from "lucide-react";

import { useActionState, startTransition, useState, useEffect } from "react";
import { BusinessModel, FormState } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import useCountry from "@/hooks/use-country";
import useGeoState from "@/hooks/use-geo-state";
import useCity from "@/hooks/use-city";
import SelectCountry from "../country/select-country";
import SelectState from "../state/select-state";
import SelectCity from "../city/select-city";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { useBusinessModel } from "@/hooks/use-business-model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface OrganisationCreateFormProps {
  createOrganisationAction: (
    cityId: string,
    businessModel: BusinessModel,
    formState: FormState,
    formData: FormData
  ) => Promise<FormState>;
}

export default function OrganisationCreateForm({
  createOrganisationAction,
}: OrganisationCreateFormProps) {
  const router = useRouter();
  const [hasLegalEntity, setHasLegalEntity] = useState(false);
  const {
    selectedCountry,
    setSelectedCountry,
    countryOptions,
    countrySearchTerm,
    setCountrySearchTerm,
    handleCreateCountry,
    openCountry,
    setOpenCountry,
    isCreatingCountry,
  } = useCountry();

  const {
    selectedState,
    setSelectedState,
    stateOptions,
    stateSearchTerm,
    setStateSearchTerm,
    handleCreateState,
    openState,
    setOpenState,
    isCreatingState,
  } = useGeoState(selectedCountry?.id || "");

  const {
    citySearchTerm,
    setCitySearchTerm,
    cityOptions,
    selectedCity,
    setSelectedCity,
    handleCreateCity,
    openCity,
    setOpenCity,
    isCreatingCity,
  } = useCity(selectedState?.id || "");

  const {
    selectedBusinessModel,
    handleBusinessModelChange,
    businessModelOptions,
  } = useBusinessModel();

  const [formState, action] = useActionState(
    createOrganisationAction.bind(
      null,
      selectedCity?.id || "",
      selectedBusinessModel?.value || BusinessModel.B2C
    ),
    {
      success: false,
      message: "",
      errors: {},
    }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => {
      action(formData);
      setIsSubmitting(false);
    });
  }

  useEffect(() => {
    if (formState.success) {
      router.push("/dashboard");
    }
  }, [formState.success, router]);

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-24">
      <Card className="w-full max-w-2xl shadow-2xl bg-white backdrop-blur-sm border-0 px-4 py-8">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-linear-to-br from-oxford-blue-500 to-powder-blue-400 rounded-full flex items-center justify-center shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-linear-to-r from-powder-blue-200 to-sunglow-200 bg-clip-text text-transparent">
            About your Work
          </CardTitle>
          <CardDescription className="text-black-700 text-lg">
            Tell us a bit about your work to begin your journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-start gap-3 rounded-lg border border-powder-blue-700/40 bg-powder-blue-900/30 px-4 py-3">
                <Checkbox
                  className="border border-powder-blue-600 data-[state=checked]:bg-sunglow data-[state=checked]:text-rich-black"
                  checked={hasLegalEntity}
                  onCheckedChange={() => setHasLegalEntity(!hasLegalEntity)}
                />
                <p className="text-sm text-rich-black-500">
                  I&apos;ve registered a legal entity for my business
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-rich-black flex items-center gap-2"
              >
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter organisation / brand name"
                className="h-11 bg-white border-gray-200 focus:border-powder-blue-500 focus:ring-powder-blue-500"
              />
              {!!formState.errors.orgName && (
                <ul>
                  {formState.errors.orgName.map(
                    (error: string, index: number) => (
                      <li key={index} className="text-red-600">
                        {error}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
            {hasLegalEntity && (
              <>
                <div className="space-y-2">
                  <Label
                    htmlFor="legal-name"
                    className="text-sm font-medium text-rich-black flex items-center gap-2"
                  >
                    Legal Entity Name
                  </Label>
                  <Input
                    id="legal-name"
                    name="legalName"
                    type="text"
                    placeholder="Enter legal entity name"
                    className="h-11 bg-white border-gray-200 focus:border-powder-blue-500 focus:ring-powder-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="gst-number"
                    className="text-sm font-medium text-rich-black flex items-center gap-2"
                  >
                    GST Number
                  </Label>
                  <Input
                    id="gst-number"
                    name="gstNumber"
                    type="text"
                    placeholder="Enter GST number"
                    className="h-11 bg-white border-gray-200 focus:border-powder-blue-500 focus:ring-powder-blue-500"
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label
                htmlFor="business-description"
                className="text-sm font-medium text-rich-black flex items-center gap-2"
              >
                Business Description
              </Label>
              <Textarea
                id="business-description"
                name="businessDescription"
                placeholder="Enter a brief description of your business"
                className="bg-white border-gray-200 focus:border-powder-blue-500 focus:ring-powder-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="business-model"
                className="text-sm font-medium text-rich-black flex items-center gap-2"
              >
                Who is your business aiming to serve?
              </Label>
              <Select
                value={selectedBusinessModel?.value || ""}
                onValueChange={handleBusinessModelChange}
              >
                <SelectTrigger className="w-full !h-11 bg-white border-gray-200 focus:border-powder-blue-500 focus:ring-powder-blue-500">
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 focus:border-powder-blue-500 focus:ring-powder-blue-500 w-full">
                  {businessModelOptions.map((option, index) => (
                    <SelectItem
                      key={index}
                      value={option.value}
                      className={`cursor-pointer ${
                        option.value === selectedBusinessModel?.value
                          ? "font-semibold"
                          : ""
                      }`}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="country"
                className="text-sm font-medium text-rich-black flex items-center gap-2"
              >
                Country
              </Label>
              <SelectCountry
                openCountry={openCountry}
                setOpenCountry={setOpenCountry}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                countrySearchTerm={countrySearchTerm}
                setCountrySearchTerm={setCountrySearchTerm}
                countryOptions={countryOptions}
                isCreatingCountry={isCreatingCountry}
                handleCreateCountry={handleCreateCountry}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="state"
                className="text-sm font-medium text-rich-black flex items-center gap-2"
              >
                State
              </Label>
              <SelectState
                selectedCountry={selectedCountry}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                stateOptions={stateOptions}
                stateSearchTerm={stateSearchTerm}
                setStateSearchTerm={setStateSearchTerm}
                handleCreateState={handleCreateState}
                openState={openState}
                setOpenState={setOpenState}
                isCreatingState={isCreatingState}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="city"
                className="text-sm font-medium text-rich-black flex items-center gap-2"
              >
                City
              </Label>
              <SelectCity
                selectedState={selectedState}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                cityOptions={cityOptions}
                citySearchTerm={citySearchTerm}
                setCitySearchTerm={setCitySearchTerm}
                handleCreateCity={handleCreateCity}
                openCity={openCity}
                setOpenCity={setOpenCity}
                isCreatingCity={isCreatingCity}
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-sunglow hover:bg-sunglow-600 text-rich-black font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg cursor-pointer"
              variant="default"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Organisation...
                </div>
              ) : (
                "Create Organisation"
              )}
            </Button>
          </form>
          {formState.message && (
            <div
              className={`mt-4 w-full text-center ${
                formState.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {formState.message}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
