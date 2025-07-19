"use client";

import {
  createActivity,
  CreateActivityData,
  updateActivity,
  UpdateActivityData,
} from "@/actions/activity";
import { Activity, ActivityType, User } from "@/lib/types";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DatePicker } from "../general/date-picker";
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
import { getTeamMembersBySearchTerm } from "@/db/team.queries";
import { getSessionCookie } from "@/actions";

interface ActivityFormProps {
  contactId: string;
  setOpen: (open: boolean) => void;
  submitFormText: string;
  activity?: Activity;
  followUpActivityId?: string;
}

export default function ActivityForm({
  contactId,
  setOpen,
  activity,
  submitFormText,
  followUpActivityId,
}: ActivityFormProps) {
  const [needFollowUp, setNeedFollowUp] = useState<boolean>(
    activity ? activity.needFollowUp : false
  );
  const [activityType, setActivityType] = useState<ActivityType>(
    activity ? activity.type : ActivityType.MISCELLANEOUS
  );
  const [followupDate, setFollowupDate] = useState<Date | undefined>(
    activity?.followUpDate ? new Date(activity.followUpDate) : undefined
  );

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState<string | undefined>(
    activity?.assignedToId || undefined
  );
  const [name, setName] = useState<string | undefined>(
    activity
      ? activity.assignedTo?.firstName + " " + activity.assignedTo?.lastName
      : undefined
  );
  const [teamMembers, setTeamMembers] = useState<User[]>([]);

  useEffect(() => {
    const sessionCookie = getSessionCookie();
    const debounceTimeout = setTimeout(async () => {
      try {
        const teamMembers = await getTeamMembersBySearchTerm(
          searchTerm,
          await sessionCookie
        );
        setTeamMembers(teamMembers);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleTeamMemberChange = (id: string, name: string) => {
    setUserId(id);
    setName(name);
    setPopoverOpen(false);
  };

  const data: CreateActivityData | UpdateActivityData = {
    contactId,
    needFollowUp,
    type: activityType,
  };

  if (needFollowUp) {
    data.assignedToId = userId;
    data.followUpDate = followupDate;
  }

  if (followUpActivityId) {
    data.followUpActivityId = followUpActivityId;
  }

  const formSubmitAction = !activity
    ? createActivity.bind(null, data)
    : updateActivity.bind(null, { ...data, id: activity.id });

  const [formState, action] = useActionState(formSubmitAction, {
    success: false,
    message: "",
    errors: {},
  });

  useEffect(() => {
    if (formState.success) {
      setOpen(false);
    }
  }, [formState.success, setOpen]);

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
            defaultValue={activity?.title || ""}
            name="title"
            type="text"
            placeholder="Activity Title"
            className="bg-slate-50"
          />
          {!!formState.errors.title && (
            <ul>
              {formState.errors.title.map((error: string, index: number) => (
                <li key={index} className="text-red-600">
                  {error}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Textarea
            defaultValue={activity?.description || ""}
            name="description"
            placeholder="Activity Description"
            className="bg-white"
          />
          {!!formState.errors.description && (
            <ul>
              {formState.errors.description.map(
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
          <Select
            value={activityType}
            onValueChange={(value) => setActivityType(value as ActivityType)}
          >
            <SelectTrigger className="bg-white cursor-pointer w-full">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent className="bg-white cursor-pointer w-full">
              {Object.values(ActivityType).map((type, index) => (
                <SelectItem
                  key={index}
                  value={type}
                  className="cursor-pointer hover:bg-slate-100"
                >
                  {type
                    .split("_")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row space-x-2 items-center">
          <Checkbox
            className={`cursor-pointer ${
              needFollowUp ? "bg-blue-800 text-white" : ""
            }`}
            checked={needFollowUp}
            onCheckedChange={() => setNeedFollowUp(!needFollowUp)}
          />
          <span className="text-slate-800">
            Does this activity require a follow-up?
          </span>
        </div>
        {needFollowUp && (
          <>
            <div className="flex flex-col space-y-2">
              <DatePicker
                label="Follow-up Date"
                date={followupDate}
                setDate={setFollowupDate}
              />
            </div>
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
                    {name ? name : "Select Team Member"}
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
                      onValueChange={setSearchTerm}
                    />
                    <CommandList className="basis-5/6">
                      <CommandEmpty>No team member found</CommandEmpty>
                      <CommandGroup>
                        {teamMembers.map((user) => (
                          <CommandItem
                            key={user.id}
                            value={`${user.firstName} ${user.lastName}`.toLowerCase()}
                            onSelect={() =>
                              handleTeamMemberChange(
                                user.id,
                                `${user.firstName} ${user.lastName}`
                              )
                            }
                          >
                            {`${user.firstName} ${user.lastName}`}
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                userId === user.id ? "opacity-100" : "opacity-0"
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
          </>
        )}
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
