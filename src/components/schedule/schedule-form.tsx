"use client";

import { Schedule } from "@/lib/types";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { createSchedules, updateSchedules } from "@/actions/schedule";
import ScheduleInput from "./schedule-input";

interface ScheduleFormProps {
  defaultValues: Partial<Schedule>[] | null;
  regionId?: string;
  setEdit: (edit: boolean) => void;
}

export default function ScheduleForm({
  regionId,
  setEdit,
  defaultValues,
}: ScheduleFormProps) {
  const ids = !!defaultValues
    ? defaultValues.length > 0
      ? defaultValues.map((schedule) => schedule.id as string)
      : null
    : null;

  const formSubmitAction =
    ids?.length && ids.length > 0
      ? updateSchedules.bind(null, { ids, regionId: regionId as string })
      : createSchedules.bind(null, { regionId: regionId as string });

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

  const [daysOfMonth, setDaysOfMonth] = useState(
    !!defaultValues
      ? defaultValues.map((schedule) => schedule.dayOfMonth || 0)
      : [1]
  );
  useEffect(() => {
    if (formState.success) {
      setEdit(false);
    }
  }, [formState.success, setEdit]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4 items-center">
        {daysOfMonth.map((_, index) => (
          <ScheduleInput
            key={index}
            daysOfMonth={daysOfMonth}
            index={index}
            setDaysOfMonth={setDaysOfMonth}
          />
        ))}

        <Button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded w-full cursor-pointer"
        >
          Submit
        </Button>
      </div>

      {formState.message && (
        <p className={`text-${formState.success ? "green" : "red"}-500`}>
          {formState.message}
        </p>
      )}
    </form>
  );
}
