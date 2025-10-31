"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import ContactsByOrganisationTable from "@/components/contacts/oganisation/contacts-by-organisation-table";
import OrganisationsFilter from "@/components/contacts/oganisation/organisations-filter";
import { Organisation } from "@/lib/types";

interface ContactsByOrganisationViewProps {
  organisations: Organisation[];
}

export default function ContactsByOrganisationView({
  organisations,
}: ContactsByOrganisationViewProps) {
  const [filteredOrganisations, setFilteredOrganisations] = useState<Organisation[]>(organisations);

  const handleFilteredOrganisations = (filtered: Organisation[]) => {
    setFilteredOrganisations(filtered);
  };

  return (
    <ProtectedRoute>
      <div className="w-full relative">
        {/* Header Section */}
        <div className="w-4/5 mx-auto flex flex-col md:flex-row gap-3 items-center justify-between my-10">
          <h1 className="text-2xl font-bold">Organisations</h1>
        </div>

        {/* Filter Component */}
        {!!organisations && organisations.length > 0 && (
          <OrganisationsFilter
            organisations={organisations}
            onFilteredOrganisations={handleFilteredOrganisations}
          />
        )}

        {/* Results */}
        <div>
          {!!organisations && organisations.length > 0 ? (
            <>
              {/* Results count */}
              <div className="w-4/5 mx-auto mb-4">
                <p className="text-sm text-gray-600">
                  Showing {filteredOrganisations.length} of {organisations.length} organisations
                  {filteredOrganisations.length !== organisations.length && " (filtered)"}
                </p>
              </div>
              
              {filteredOrganisations.length > 0 ? (
                <ContactsByOrganisationTable organisations={filteredOrganisations} />
              ) : (
                <div className="w-4/5 mx-auto mt-10 text-center">
                  <h1 className="text-xl font-bold text-gray-600 mb-2">No organisations match your filters</h1>
                  <p className="text-gray-500">Try adjusting your filter criteria to see more results.</p>
                </div>
              )}
            </>
          ) : (
            <div className="w-4/5 mx-auto mt-10">
              <h1 className="text-2xl font-bold">No Organisations Found</h1>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
