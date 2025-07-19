"use client";

import { getAllRegions } from "@/db/region.queries";
import { FormState, Region } from "@/lib/types";
import { useActionState, useState, useEffect, startTransition } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { SelectLabel, SelectValue } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface OrganisationCreateFormProps {
  createOrganisationAction: (
    regionId: string,
    formState: FormState,
    formData: FormData
  ) => Promise<FormState>;
}

export default function OrganisationCreateForm({
  createOrganisationAction,
}: OrganisationCreateFormProps) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<Partial<Region>>({
    id: "",
    name: "",
    state: "",
    country: "",
  });

  const [addRegion, setAddRegion] = useState(false);

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

  const [formState, action] = useActionState(
    createOrganisationAction.bind(null, selectedRegion.id as string),
    {
      success: false,
      message: "",
      errors: {},
    }
  );

  const states = regions
    .map((region: Region) => region.state)
    .reduce<string[]>((acc, curr: string) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => action(formData));
  }

  const handleRegionValueChange = (value: string) => {
    const region = regions.find((region: Region) => region.id === value);

    if (region) {
      setSelectedRegion({
        id: region.id,
        name: region.name,
        state: region.state,
        country: region.country,
      });
    }
  };

  const handleAddRegionClick = () => {
    setSelectedRegion({
      id: "",
      name: "",
      state: "",
      country: "",
    });
    setAddRegion(true);
  };

  return (
    <Card className="max-w-md mx-auto mt-20 px-2 py-4 shadow-lg bg-gradient-to-br from-slate-200 to-slate-300">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">Enter Organisation Details</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Input
              name="name"
              type="text"
              placeholder="Organisation Name"
              className="bg-white"
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
          {regions.length > 0 && (
            <div className="flex flex-row space-x-2">
              <Select
                value={selectedRegion.id}
                onValueChange={handleRegionValueChange}
                disabled={addRegion}
              >
                <SelectTrigger className="basis-5/6 bg-white cursor-pointer">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent className="basis-5/6 bg-white cursor-pointer">
                  {states.map((state, index) => {
                    return (
                      <SelectGroup key={index}>
                        <SelectLabel className="p-3 font-bold text-slate-500">
                          {state}
                        </SelectLabel>
                        {regions
                          .filter((region: Region) => region.state === state)
                          .map((region: Region) => {
                            return (
                              <SelectItem
                                className="cursor-pointer"
                                key={region.id}
                                value={region.id}
                              >
                                {region.name} ({region.state}, {region.country})
                              </SelectItem>
                            );
                          })}
                      </SelectGroup>
                    );
                  })}
                </SelectContent>
              </Select>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      className="basis-1/6 cursor-pointer bg-white"
                      onClick={handleAddRegionClick}
                    >
                      <Plus size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white">
                    Add a new Region
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
          {(regions.length === 0 || addRegion) && (
            <>
              <div className="flex flex-col space-y-2">
                <Input
                  name="regionName"
                  type="text"
                  placeholder="Region Name"
                  className="bg-white"
                />
                {!!formState.errors.regionName && (
                  <ul>
                    {formState.errors.regionName.map(
                      (error: string, index: number) => (
                        <li key={index} className="text-red-600">
                          {error}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <Input
                  name="state"
                  type="text"
                  placeholder="State"
                  className="bg-white"
                />
                {!!formState.errors.state && (
                  <ul>
                    {formState.errors.state.map(
                      (error: string, index: number) => (
                        <li key={index} className="text-red-600">
                          {error}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <Input
                  name="country"
                  type="text"
                  placeholder="Country"
                  className="bg-white"
                />
                {!!formState.errors.country && (
                  <ul>
                    {formState.errors.country.map(
                      (error: string, index: number) => (
                        <li key={index} className="text-red-600">
                          {error}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </>
          )}
          <div className="flex flex-col space-y-2">
            <Input
              name="city"
              type="text"
              placeholder="City"
              className="bg-white"
            />
            {!!formState.errors.city && (
              <ul>
                {formState.errors.city.map((error: string, index: number) => (
                  <li key={index} className="text-red-600">
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
              className="bg-white"
            />
            {!!formState.errors.address && (
              <ul>
                {formState.errors.address.map(
                  (error: string, index: number) => (
                    <li key={index} className="text-red-600">
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
              className="bg-white"
            />
            {!!formState.errors.landlineNumber && (
              <ul>
                {formState.errors.landlineNumber.map(
                  (error: string, index: number) => (
                    <li key={index} className="text-red-600">
                      {error}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Input
              name="postalCode"
              type="text"
              placeholder="Postal Code"
              className="bg-white"
            />
            {!!formState.errors.postalCode && (
              <ul>
                {formState.errors.postalCode.map(
                  (error: string, index: number) => (
                    <li key={index} className="text-red-600">
                      {error}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          >
            Create Organisation
          </Button>
        </form>
        {formState.success && (
          <div className="mt-4 text-green-600">
            {formState.message || "Organisation created successfully!"}
          </div>
        )}
        {formState.message && !formState.success && (
          <div className="mt-4 text-red-600">
            {formState.message || "Failed to create organisation."}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
