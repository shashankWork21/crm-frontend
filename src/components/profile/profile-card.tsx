"use client";

import { Organisation, User } from "@/lib/types";
import {
  Building2,
  Mail,
  Phone,
  Shield,
  Crown,
  UserIcon,
  Pencil,
} from "lucide-react";
import { useState } from "react";
import ProfileEditDialog from "./profile-edit-dialog";
import { Button } from "../ui/button";

interface ProfileCardProps {
  user: User;
  organisation: Organisation;
}

const roleConfig = {
  ADMIN: {
    icon: Crown,
    label: "Admin",
    className: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  MEMBER: {
    icon: UserIcon,
    label: "Member",
    className: "bg-slate-700 text-slate-300 border-slate-600",
  },
  OWNER: {
    icon: Shield,
    label: "Owner",
    className: "bg-green-500/20 text-green-400 border-green-500/30",
  },
} as const;

export default function ProfileCard({ user, organisation }: ProfileCardProps) {
  const [edit, setEdit] = useState(false);

  const role = user?.role?.toUpperCase() as keyof typeof roleConfig;
  const config = roleConfig[role] || roleConfig.MEMBER;
  const RoleIcon = config.icon;

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <div className="p-8 rounded-3xl bg-oxford-blue shadow-sm border border-slate-700">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-sunglow-500 flex items-center justify-center text-rich-black font-bold text-xl shadow-md">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-100">
                {user?.firstName} {user?.lastName}
              </h2>
              <span
                className={`
                  inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border mt-2
                  ${config.className}
                `}
              >
                <RoleIcon className="w-3.5 h-3.5" />
                {config.label}
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <Button
            onClick={() => setEdit(true)}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500 gap-2"
          >
            <Pencil className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Email */}
          <div className="p-4 rounded-2xl bg-rich-black border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                <Mail className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                  Email
                </p>
                <p className="text-slate-100 font-medium">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="p-4 rounded-2xl bg-rich-black border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                <Phone className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                  Phone
                </p>
                <p className="text-slate-100 font-medium">
                  {user?.countryCode}-{user?.phoneNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Organisation - Full Width */}
          <div className="sm:col-span-2 p-4 rounded-2xl bg-sunglow-500/10 border border-sunglow-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sunglow-500/20 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-sunglow-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                  Organisation
                </p>
                <p className="text-slate-100 font-medium">
                  {organisation?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <ProfileEditDialog edit={edit} setEdit={setEdit} user={user} />
    </div>
  );
}
