"use client";

import { getTeamOranisations } from "@/db/organisation.queries";
import { Organisation } from "@/lib/types";
import { useActionState, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { updateEmployedOrganisation } from "@/actions/organisation";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Building2 } from "lucide-react";

export default function SelectOrganisation() {
  const router = useRouter();
  const [organisationId, setOrganisationId] = useState<string>("");
  const [organisations, setOrganisations] = useState<Organisation[]>([]);

  useEffect(() => {
    async function fetchOrganisations() {
      const organisations = await getTeamOranisations();
      setOrganisations(organisations);
    }
    fetchOrganisations();
  }, []);

  function handleOrganisationChange(value: string) {
    setOrganisationId(value);
  }

  const [formState, action] = useActionState(
    updateEmployedOrganisation.bind(null, organisationId),
    {
      success: false,
      message: "",
      errors: {},
    }
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (formState.success) {
      timeout = setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [formState.success, router]);

  return (
    <Card className="max-w-md mx-auto mt-20 px-4 py-6 shadow-sm bg-white border border-slate-200 rounded-2xl">
      <CardHeader className="text-center pb-4">
        <div className="w-14 h-14 rounded-2xl bg-oxford-blue flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Select Organisation</h2>
        <p className="text-slate-500 text-sm mt-1">Choose which organisation to work with</p>
      </CardHeader>
      <CardContent>
        <Select value={organisationId} onValueChange={handleOrganisationChange}>
          <SelectTrigger className="w-full h-12 bg-white border-slate-200 rounded-xl cursor-pointer focus:border-oxford-blue focus:ring-oxford-blue/20">
            <SelectValue placeholder="Select Organisation" />
          </SelectTrigger>
          <SelectContent className="w-full bg-white border-slate-200 rounded-xl">
            {organisations.map((organisation) => (
              <SelectItem
                className="cursor-pointer"
                key={organisation.id}
                value={organisation.id}
              >
                {organisation.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <form action={action}>
          <Button
            type="submit"
            className="mt-4 w-full h-12 bg-oxford-blue hover:bg-oxford-blue-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            Continue
          </Button>
        </form>
        {formState.success && (
          <p className="text-green-600 mt-4 text-center text-sm font-medium bg-green-50 p-3 rounded-xl border border-green-100">
            {formState.message || "Organisation updated successfully!"}
          </p>
        )}
        {!formState.success && !!formState.message && (
          <p className="text-red-600 mt-4 text-center text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-100">
            {formState.message || "Couldn't update Organisation"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
