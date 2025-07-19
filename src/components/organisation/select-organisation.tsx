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
    <Card className="max-w-md mx-auto mt-20 px-2 py-4 shadow-lg bg-gradient-to-br from-slate-100 to-slate-200">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">Select Organisation</h2>
      </CardHeader>
      <CardContent>
        <Select value={organisationId} onValueChange={handleOrganisationChange}>
          <SelectTrigger className="w-full bg-white cursor-pointer">
            <SelectValue placeholder="Select Organisation" />
          </SelectTrigger>
          <SelectContent className="w-full bg-white cursor-pointer">
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
            className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            Select
          </Button>
        </form>
        {formState.success && (
          <p className="text-green-600 mt-2">
            {formState.message || "Organisation updated successfully!"}
          </p>
        )}
        {!formState.success && !!formState.message && (
          <p className="text-red-600 mt-2">
            {formState.message || "Couldn't update Organisation"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
