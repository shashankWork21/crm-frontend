"use client";

import { useState, useEffect, useActionState, startTransition } from "react";

import { BranchType, Region } from "@/lib/types";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import { createBranch, updateBranch } from "@/actions/branch";
import { getAllRegions } from "@/db/region.queries";

export interface BranchFormProps {
  id: string | null;
  defaultValues: {
    organisationId: string;
    city: string;
    address: string;
    postalCode: string;
    regionId: string;
    type: BranchType;
    landlineNumber?: string;
  };
  setEdit: (edit: boolean) => void;
  submitFormText: string;
}

export default function BranchForm({
  id,
  defaultValues,
  setEdit,
  submitFormText,
}: BranchFormProps) {
  const [branchType, setBranchType] = useState<BranchType>(
    defaultValues.type || BranchType.BRANCH
  );
  const [regionId, setRegionId] = useState<string>(
    defaultValues.regionId || ""
  );
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    async function fetchRegions() {
      const regions = await getAllRegions();
      setRegions(
        regions.map((region: Region) => ({
          id: region.id,
          name: region.name,
          state: region.state,
          country: region.country,
        }))
      );
    }
    fetchRegions();
  }, []);

  const formSubmitAction = !!id
    ? updateBranch.bind(null, {
        id,
        regionId,
        branchType,
        organisationId: defaultValues.organisationId,
      })
    : createBranch.bind(null, {
        regionId,
        branchType,
        organisationId: defaultValues.organisationId,
      });

  const [formState, action] = useActionState(formSubmitAction, {
    success: false,
    message: "",
    errors: {},
  });

  useEffect(() => {
    if (formState.success) {
      setEdit(false);
    }
  }, [formState.success, setEdit]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => action(formData));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 py-2">
        <div className="flex flex-col space-y-2">
          <Input
            name="city"
            type="text"
            placeholder="City"
            defaultValue={defaultValues.city}
            className="bg-white"
          />
          {!!formState.errors.city && (
            <ul>
              {formState.errors.city.map((error: string, index: number) => (
                <li key={index} className="text-red-500 text-sm">
                  {error}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Input
            name="address"
            type="text"
            placeholder="Address"
            defaultValue={defaultValues.address}
            className="bg-white"
          />
          {!!formState.errors.address && (
            <ul>
              {formState.errors.address.map((error: string, index: number) => (
                <li key={index} className="text-red-500 text-sm">
                  {error}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Input
            name="postalCode"
            type="text"
            placeholder="Postal Code"
            defaultValue={defaultValues.postalCode}
            className="bg-white"
          />
          {!!formState.errors.postalCode && (
            <ul>
              {formState.errors.postalCode.map(
                (error: string, index: number) => (
                  <li key={index} className="text-red-500 text-sm">
                    {error}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Input
            name="landlineNumber"
            type="text"
            placeholder="Landline Number"
            defaultValue={defaultValues.landlineNumber}
            className="bg-white"
          />
          {!!formState.errors.landlineNumber && (
            <ul>
              {formState.errors.landlineNumber.map(
                (error: string, index: number) => (
                  <li key={index} className="text-red-500 text-sm">
                    {error}
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        <div className="flex flex-col space-y-2 w-full">
          <Select
            value={branchType}
            onValueChange={(value) => setBranchType(value as BranchType)}
          >
            <SelectTrigger className="bg-white cursor-pointer w-full">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent className="bg-white cursor-pointer w-full">
              {Object.values(BranchType).map((type, index) => (
                <SelectItem
                  key={index}
                  value={type}
                  className="cursor-pointer hover:bg-slate-100"
                >
                  {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!!formState.errors.branchType && (
            <ul>
              {formState.errors.branchType.map(
                (error: string, index: number) => (
                  <li key={index} className="text-red-500 text-sm">
                    {error}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <Select
            value={regionId}
            onValueChange={(value: string) => setRegionId(value)}
          >
            <SelectTrigger className="bg-white cursor-pointer w-full">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent className="bg-white cursor-pointer w-full">
              {regions.map((region, index) => (
                <SelectItem
                  key={index}
                  value={region.id}
                  className="cursor-pointer hover:bg-slate-100"
                >
                  {region.name}, {region.state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!!formState.errors.regionId && (
            <ul>
              {formState.errors.regionId.map((error: string, index: number) => (
                <li key={index} className="text-red-500 text-sm">
                  {error}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-800 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
        >
          {submitFormText}
        </Button>
      </form>
      {formState.success && (
        <div className="mt-4 text-green-600">
          {formState.message || "Region created successfully!"}
        </div>
      )}
    </>
  );
}
