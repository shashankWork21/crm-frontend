"use client";

import { BranchType, Organisation, Region } from "@/lib/types";
import { Input } from "../ui/input";
import { startTransition, useActionState, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "../ui/select";
import { createContact } from "@/actions/contact";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { CheckIcon, ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import ProtectedRoute from "../auth/protected-route";

interface ContactFormProps {
  regions: Region[];
  organisations: Organisation[];
}

export default function ContactCreateForm({
  regions,
  organisations,
}: ContactFormProps) {
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [orgSelectComboOpen, setOrgSelectComboOpen] = useState(false);
  const [addOrg, setAddOrg] = useState(false);
  const [addBranch, setAddBranch] = useState(false);
  const [addRegion, setAddRegion] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrganisations, setFilteredOrganisations] =
    useState<Organisation[]>(organisations);
  const [branchType, setBranchType] = useState<BranchType>(
    BranchType.HEADQUARTERS
  );

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setFilteredOrganisations(organisations);
    } else {
      const lowerCaseValue = value.toLowerCase();
      const filtered = organisations.filter((org) =>
        org.name.toLowerCase().includes(lowerCaseValue)
      );
      setFilteredOrganisations(filtered);
    }
  };
  const handleOrgValueChange = (value: string) => {
    setSelectedOrgId(value);
    setSelectedBranchId("");
    setSelectedRegionId("");
  };
  const handleBranchValueChange = (value: string) => {
    setSelectedBranchId(value);
    setSelectedRegionId("");
  };

  const handleRegionValueChange = (value: string) => {
    setSelectedRegionId(value);
  };

  const handleAddOrgClick = () => {
    setSelectedOrgId("");
    setAddOrg(!addOrg);
    setAddBranch(!addBranch);
  };
  const handleAddBranchClick = () => {
    setSelectedBranchId("");
    setAddBranch(!addBranch);
  };
  const handleAddRegionClick = () => {
    setSelectedRegionId("");
    setAddRegion(!addRegion);
  };

  const selectedOrgBranches =
    organisations.find((org) => org.id === selectedOrgId)?.branches || [];

  const states = regions
    .map((region: Region) => region.state)
    .reduce<string[]>((acc, curr: string) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    }, []);

  const formSubmitAction = createContact.bind(null, {
    organisationId: selectedOrgId,
    branchId: selectedBranchId,
    regionId: selectedRegionId,
  });

  const [formState, action] = useActionState(formSubmitAction, {
    success: false,
    message: "",
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => action(formData));
  }

  return (
    <ProtectedRoute>
      <Card className="w-9/10 md:w-3/5 xl:w-2/5 mx-auto mt-20 px-2 py-4 shadow-lg bg-gradient-to-br from-slate-200 to-slate-300">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold">Create a new contact</h2>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 py-2"
          >
            <div className="flex flex-col space-y-2">
              <Input
                name="name"
                type="text"
                placeholder="Name"
                className="bg-slate-50"
              />
              {!!formState.errors.name && (
                <ul>
                  {formState.errors.name.map((error: string, index: number) => (
                    <li key={index} className="text-red-600">
                      {error}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <div className="w-full flex flex-row items-center justify-start space-x-2">
                <Input
                  name="countryCode"
                  type="text"
                  placeholder="+XXX"
                  className="basis-1/4 bg-white"
                />
                <Input
                  name="number"
                  type="text"
                  placeholder="Phone Number"
                  className="basis-3/4 bg-white"
                />
              </div>
              {!!formState.errors.countryCode && (
                <ul>
                  {formState.errors.countryCode.map(
                    (error: string, index: number) => (
                      <li key={index} className="text-red-600">
                        {error}
                      </li>
                    )
                  )}
                </ul>
              )}
              {!!formState.errors.phoneNumber && (
                <ul>
                  {formState.errors.phoneNumber.map(
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
                name="email"
                type="email"
                placeholder="Email"
                className="bg-slate-50"
              />
              {!!formState.errors.email && (
                <ul>
                  {formState.errors.email.map(
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
                name="alternateNumber"
                type="text"
                placeholder="Alternate Number"
                className="bg-slate-50"
              />
            </div>
            {organisations.length > 0 && (
              <div className="flex flex-row space-x-2 justify-between">
                <Popover
                  open={orgSelectComboOpen}
                  onOpenChange={setOrgSelectComboOpen}
                >
                  <PopoverTrigger asChild className="">
                    <Button
                      disabled={addOrg}
                      variant="outline"
                      role="combobox"
                      aria-expanded={orgSelectComboOpen}
                      className="w-full justify-between cursor-pointer bg-white basis-5/6"
                    >
                      {selectedOrgId
                        ? organisations.find((org) => org.id === selectedOrgId)
                            ?.name
                        : "Select Organisation"}
                      {orgSelectComboOpen ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="bg-white border-none w-[var(--radix-popover-trigger-width)] basis-5/6 max-h-[42rem] overflow-y-auto"
                    align="start"
                    sideOffset={0}
                  >
                    <Command className="basis-5/6">
                      <CommandInput
                        placeholder="Search"
                        value={searchTerm}
                        onValueChange={handleSearchTermChange}
                      />
                      <CommandList className="basis-5/6">
                        <CommandEmpty>No organisation found</CommandEmpty>
                        <CommandGroup>
                          {filteredOrganisations.map((org) => (
                            <CommandItem
                              key={org.id}
                              value={org.name}
                              onSelect={() => handleOrgValueChange(org.id)}
                            >
                              {org.name}
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedOrgId === org.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        className="basis-1/8 cursor-pointer bg-white"
                        onClick={handleAddOrgClick}
                      >
                        {!addOrg ? <Plus size={16} /> : <X size={16} />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white">
                      Add a new Organisation
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
            {(organisations.length === 0 || addOrg) && (
              <>
                <div className="flex flex-col space-y-2">
                  <Input
                    name="orgName"
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
              </>
            )}
            {!!selectedOrgId &&
              !addBranch &&
              selectedOrgBranches.length > 0 && (
                <div className="flex flex-row space-x-2">
                  <Select
                    value={selectedBranchId}
                    onValueChange={handleBranchValueChange}
                    disabled={addBranch}
                  >
                    <SelectTrigger className="basis-5/6 bg-white cursor-pointer">
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent className="basis-5/6 bg-white cursor-pointer">
                      {selectedOrgBranches.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.type} {branch.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          className="basis-1/6 cursor-pointer bg-white"
                          onClick={handleAddBranchClick}
                        >
                          {!addBranch ? <Plus size={16} /> : <X size={16} />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-white">
                        Add a new Branch
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            {(!!selectedOrgId && addBranch) ||
              ((organisations.length === 0 || addOrg) && (
                <>
                  <div className="flex flex-col space-y-2">
                    <Input
                      name="city"
                      type="text"
                      placeholder="City"
                      className="bg-slate-50"
                    />
                    {!!formState.errors.city && (
                      <ul>
                        {formState.errors.city.map(
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
                      name="address"
                      type="text"
                      placeholder="Area"
                      className="bg-slate-50"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Input
                      name="postalCode"
                      type="text"
                      placeholder="Postal Code"
                      className="bg-slate-50"
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-full">
                    <Select
                      value={branchType}
                      onValueChange={(value) =>
                        setBranchType(value as BranchType)
                      }
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
                            {type.charAt(0).toUpperCase() +
                              type.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {!!formState.errors.type && (
                      <ul>
                        {formState.errors.type.map(
                          (error: string, index: number) => (
                            <li key={index} className="text-red-500 text-sm">
                              {error}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                </>
              ))}
            {(addBranch || organisations.length === 0) &&
              regions.length > 0 && (
                <div className="flex flex-row space-x-2">
                  <Select
                    value={selectedRegionId}
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
                              .filter(
                                (region: Region) => region.state === state
                              )
                              .map((region: Region) => {
                                return (
                                  <SelectItem
                                    className="cursor-pointer"
                                    key={region.id}
                                    value={region.id}
                                  >
                                    {region.name} ({region.state},{" "}
                                    {region.country})
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
                          {!addRegion ? <Plus size={16} /> : <X size={16} />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-white">
                        Add a new Region
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            {addBranch && (regions.length === 0 || addRegion) && (
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
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
            >
              Create Contact
            </Button>
          </form>
          {formState.success && (
            <div className="text-green-600 text-center mt-4">
              {formState.message}
            </div>
          )}
        </CardContent>
      </Card>
    </ProtectedRoute>
  );
}
