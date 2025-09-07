"use client";

import { Organisation, User } from "@/lib/types";
import { Building, IdCard, Mail, Phone } from "lucide-react";
import { useState } from "react";
import ProfileEditDialog from "./profile-edit-dialog";

interface ProfileCardProps {
  user: User;
  organisation: Organisation;
}

export default function ProfileCard({ user, organisation }: ProfileCardProps) {
  const [edit, setEdit] = useState(false);
  return (
    <div className="w-full md:w-3/5 mx-auto mt-6 py-5 px-10 text-center text-xl bg-slate-200 rounded-lg">
      <div className="w-full flex flex-row items-center justify-between">
        <h2 className="font-bold text-2xl">
          {user?.firstName} {user?.lastName}
        </h2>
        <ProfileEditDialog edit={edit} setEdit={setEdit} user={user} />
      </div>
      <div className="mt-4 flex flex-col md:flex-row items-center md:justify-between space-y-2 md:space-y-0 text-lg md:px-8 text-slate-600">
        <div className="mt-4 flex flex-row items-center justify-start space-x-4 font-semibold">
          <Mail className="h-6 w-6 text-slate-600 mr-3" />
          {user?.email}
        </div>
        <div className="mt-4 flex flex-row items-center justify-start space-x-4 font-semibold">
          <Phone className="h-6 w-6 text-slate-600 mr-3" />
          {user?.countryCode}-{user?.phoneNumber}
        </div>
      </div>
      <div className="mt-4 flex flex-col md:flex-row items-center md:justify-between space-y-2 md:space-y-0 text-lg md:px-8 text-slate-600">
        <div className="mt-4 flex flex-row items-center justify-start space-x-4 font-semibold">
          <IdCard className="h-6 w-6 text-slate-600 mr-3" />
          {user?.role.charAt(0).toUpperCase() +
            user?.role.slice(1).toLowerCase()}
        </div>
        <div className="mt-4 flex flex-row items-center justify-start space-x-4 font-semibold">
          <Building className="h-6 w-6 text-slate-600 mr-3" />
          {organisation.name}
        </div>
      </div>
    </div>
  );
}
