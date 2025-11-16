import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { contactFieldSchema } from "@/lib/contact/field-schema";
import { handleFieldToggle } from "@/lib/utils";
import { getContactsByOurOrganisation } from "@/db/contact.queries";

export default function useContact(organisationId: string) {
  const [directFields, setDirectFields] = useState<string>(
    "name,email,phoneNumber,gender"
  );
  const [relationalFields, setRelationalFields] = useState<string>("");

  const queryClient = useQueryClient();

  const handleFieldSelection = (field: string) => {
    queryClient.invalidateQueries({
      queryKey: ["contacts", directFields, relationalFields],
    });
    const fieldInfo = contactFieldSchema.find((f) => f.name === field);
    if (!fieldInfo) return;
    if (fieldInfo.composite) {
      setRelationalFields((prev) => {
        return handleFieldToggle(prev, field);
      });
    } else {
      setDirectFields((prev) => {
        return handleFieldToggle(prev, field);
      });
    }
  };

  // Pending: Implement filtering logic

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["contacts", directFields, relationalFields],
    queryFn: () =>
      getContactsByOurOrganisation(
        organisationId,
        directFields,
        relationalFields
      ),
    staleTime: 5 * 60 * 1000,
  });

  return {
    isLoading,
    contacts,
    handleFieldSelection,
    directFields,
    relationalFields,
  };
}
