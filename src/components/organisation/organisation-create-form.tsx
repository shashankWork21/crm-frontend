"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Building2, Loader2, ArrowRight } from "lucide-react";

import { useActionState, startTransition, useState, useEffect } from "react";
import { BusinessModel, FormState } from "@/lib/types";
import { Card, CardContent, CardHeader } from "../ui/card";
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
import { getSessionCookie, validateSessionToken } from "@/actions";
import { useAuth } from "@/context/auth.context";

interface OrganisationCreateFormProps {
  createOrganisationAction: (
    cityId: string,
    businessModel: BusinessModel,
    formState: FormState,
    formData: FormData,
  ) => Promise<FormState>;
}

export default function OrganisationCreateForm({
  createOrganisationAction,
}: OrganisationCreateFormProps) {
  const router = useRouter();
  const { setUser } = useAuth();
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
      selectedBusinessModel?.value || BusinessModel.B2C,
    ),
    {
      success: false,
      message: "",
      errors: {},
    },
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
      const refreshSession = async () => {
        const sessionToken = await getSessionCookie();
        try {
          const { user: result } = await validateSessionToken(sessionToken);
          if (setUser) {
            setUser(result);
          }
          router.push("/dashboard");
        } catch (error) {
          console.error("Failed to refresh session:", error);
        }
      };
      refreshSession();
    }
  }, [formState.success, router, setUser]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 overflow-hidden bg-rich-black">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-125 h-125 bg-sunglow-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-100 h-100 bg-powder-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--rich-black)_70%)]" />
      </div>

      {/* Logo */}
      <Link
        href="/"
        className="relative z-10 flex items-center gap-2 mb-8 text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-500 rounded-lg px-2 py-1"
      >
        <Image
          src="/initial_logo.svg"
          alt="Smart CRM Logo"
          width={40}
          height={40}
          className="w-10 h-10 group-hover:scale-110 transition-transform"
        />
        <span className="text-2xl font-bold tracking-tight">Smart CRM</span>
      </Link>

      {/* Card */}
      <Card className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/10 bg-oxford-blue backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center space-y-3 pb-6 pt-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sunglow-500/20 border border-sunglow-500/30">
            <Building2 className="h-8 w-8 text-sunglow-500" />
          </div>
          <h1 className="text-3xl font-bold text-white">About your Work</h1>
          <p className="text-white/60">
            Tell us a bit about your work to begin your journey
          </p>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Legal Entity Checkbox */}
            <div className="flex flex-row items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <Checkbox
                className="border border-white/30 data-[state=checked]:bg-sunglow-500 data-[state=checked]:text-rich-black data-[state=checked]:border-sunglow-500"
                checked={hasLegalEntity}
                onCheckedChange={() => setHasLegalEntity(!hasLegalEntity)}
              />
              <p className="text-sm text-white/70">
                I&apos;ve registered a legal entity for my business
              </p>
            </div>

            {/* Organisation Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-white/80"
              >
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter organisation / brand name"
                className="h-12 border border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
              />
              {!!formState.errors.orgName && (
                <ul className="space-y-1 text-sm text-red-400">
                  {formState.errors.orgName.map(
                    (error: string, index: number) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-400" />
                        {error}
                      </li>
                    ),
                  )}
                </ul>
              )}
            </div>

            {/* Legal Entity Fields */}
            {hasLegalEntity && (
              <>
                <div className="space-y-2">
                  <Label
                    htmlFor="legal-name"
                    className="text-sm font-medium text-white/80"
                  >
                    Legal Entity Name
                  </Label>
                  <Input
                    id="legal-name"
                    name="legalName"
                    type="text"
                    placeholder="Enter legal entity name"
                    className="h-12 border border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="gst-number"
                    className="text-sm font-medium text-white/80"
                  >
                    GST Number
                  </Label>
                  <Input
                    id="gst-number"
                    name="gstNumber"
                    type="text"
                    placeholder="Enter GST number"
                    className="h-12 border border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all"
                  />
                </div>
              </>
            )}

            {/* Business Description */}
            <div className="space-y-2">
              <Label
                htmlFor="business-description"
                className="text-sm font-medium text-white/80"
              >
                Business Description
              </Label>
              <Textarea
                id="business-description"
                name="businessDescription"
                placeholder="Enter a brief description of your business"
                className="min-h-25 border border-white/10 bg-white/5 text-white placeholder:text-white/30 rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all resize-none"
              />
            </div>

            {/* Business Model */}
            <div className="space-y-2">
              <Label
                htmlFor="business-model"
                className="text-sm font-medium text-white/80"
              >
                Who is your business aiming to serve?
              </Label>
              <Select
                value={selectedBusinessModel?.value || ""}
                onValueChange={handleBusinessModelChange}
              >
                <SelectTrigger className="w-full h-12! border border-white/10 bg-white/5 text-white rounded-xl focus:border-sunglow-500 focus:ring-sunglow-500/20 focus:ring-2 transition-all [&>span]:text-white/70 [&>span[data-placeholder]]:text-white/30">
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent className="bg-oxford-blue-300 border border-white/10 rounded-xl">
                  {businessModelOptions.map((option, index) => (
                    <SelectItem
                      key={index}
                      value={option.value}
                      className={`cursor-pointer text-white/80 hover:text-white focus:text-white focus:bg-white/10 ${
                        option.value === selectedBusinessModel?.value
                          ? "font-semibold bg-white/5"
                          : ""
                      }`}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label
                htmlFor="country"
                className="text-sm font-medium text-white/80"
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

            {/* State */}
            <div className="space-y-2">
              <Label
                htmlFor="state"
                className="text-sm font-medium text-white/80"
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

            {/* City */}
            <div className="space-y-2">
              <Label
                htmlFor="city"
                className="text-sm font-medium text-white/80"
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-sunglow-500 hover:bg-sunglow-400 text-rich-black font-bold text-base rounded-xl shadow-lg shadow-sunglow-500/25 hover:shadow-sunglow-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Organisation...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Create Organisation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          {/* Success/Error Message */}
          {formState.message && (
            <div
              className={`w-full text-center text-sm font-medium p-3 rounded-xl ${
                formState.success
                  ? "text-green-400 bg-green-500/10 border border-green-500/20"
                  : "text-red-400 bg-red-500/10 border border-red-500/20"
              }`}
              role="alert"
            >
              {formState.message}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bottom Text */}
      <p className="relative z-10 mt-8 text-sm text-white/40">
        Need help?{" "}
        <Link
          href="/contact-us"
          className="text-white/60 hover:text-sunglow-500 transition-colors underline underline-offset-2"
        >
          Contact Support
        </Link>
      </p>
    </div>
  );
}
