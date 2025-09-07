"use client";

import { updateContactFollowup } from "@/actions/contact";

import { startTransition, useActionState, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ContactEditFormProps } from "./contact-edit-form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CheckIcon, ChevronDown, ChevronUp } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

export default function ContactFollowUpForm({
  contact,
  setOpen,
  team,
  successCallback,
}: ContactEditFormProps) {
  const [userId, setUserId] = useState<string>("");
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [formState, action] = useActionState(
    updateContactFollowup.bind(null, contact.id, userId),
    {
      success: false,
      message: "",
      errors: {},
    }
  );
  useEffect(() => {
    if (formState.success) {
      setOpen(false);
      successCallback?.();
    }
  }, [formState.success, setOpen, successCallback]);

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleTeamMemberChange = (id: string) => {
    setUserId(id);
    setPopoverOpen(false);
  };

  const filteredTeamMembers =
    team?.filter(
      (user) =>
        user?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => action(formData));
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
        <Input
          name="followUpFrequency"
          type="number"
          defaultValue={contact?.followUpFrequency || 0}
          placeholder="How often do you want to follow up (days)?"
          className="bg-white w-full"
        />
        <div className="flex flex-row space-x-2 justify-between">
          <Popover
            open={popoverOpen}
            onOpenChange={setPopoverOpen}
            modal={false}
          >
            <PopoverTrigger asChild className="">
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between cursor-pointer bg-white basis-5/6"
              >
                {userId
                  ? `${team?.find((user) => user?.id === userId)?.firstName} ${
                      team?.find((user) => user?.id === userId)?.lastName
                    }`
                  : "Select Team Member"}
                {popoverOpen ? (
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
                  <CommandEmpty>No team member found</CommandEmpty>
                  <CommandGroup>
                    {filteredTeamMembers.map((user) => (
                      <CommandItem
                        key={user?.id}
                        value={user?.id}
                        onSelect={() => handleTeamMemberChange(user?.id)}
                      >
                        {`${user?.firstName} ${user?.lastName}`}
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            userId === user?.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
        >
          Set
        </Button>
      </form>
      {formState.success && (
        <div className="text-green-600 text-center mt-4">
          {formState.message}
        </div>
      )}
    </>
  );
}
