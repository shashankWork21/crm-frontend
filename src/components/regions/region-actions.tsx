import { Region, Schedule } from "@/lib/types";
import ScheduleAction from "../schedule/schedule-action";
import { SquarePen } from "lucide-react";
import RegionFormDialog from "./region-form-dialog";
import { useState } from "react";
import DeleteDialog from "../general/delete-dialog";
import RegionDeleteForm from "./region-delete-form";

interface RegionActionsProps {
  region: Region;
  regionId: string;
  schedules?: Schedule[];
}

export default function RegionActions({
  region,
  regionId,
  schedules,
}: RegionActionsProps) {
  const [scheduleEdit, setScheduleEdit] = useState(false);
  const [regionEdit, setRegionEdit] = useState(false);

  const button = (
    <button type="button" className="w-6 h-6 p-0 cursor-pointer">
      <SquarePen className="text-blue-700 hover:text-blue-500" />
    </button>
  );

  return (
    <div className="flex flex-row justify-center items-start space-x-3 mx-auto mt-1">
      <ScheduleAction
        edit={scheduleEdit}
        setEdit={setScheduleEdit}
        regionId={regionId}
        schedules={schedules}
      />
      <RegionFormDialog
        button={button}
        id={regionId}
        regionEdit={regionEdit}
        setRegionEdit={setRegionEdit}
        defaultValues={{
          name: region.name,
          state: region.state,
          country: region.country,
        }}
        title="Edit Region"
        description="Edit the region details (name, state, country) to keep your records up to date."
        submitFormText="Save Changes"
      />
      <DeleteDialog
        id={regionId}
        title="Delete Region"
        description="Are you sure you want to delete this region? This action cannot be undone."
        DeleteForm={RegionDeleteForm}
      />
    </div>
  );
}
