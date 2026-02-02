"use client";

import { User } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useAuth } from "@/context/auth.context";
import TeamActions from "./team-actions";
import { Mail, Phone, Shield, Crown, UserIcon } from "lucide-react";

interface TeamTableProps {
  team: User[];
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

export default function TeamTable({ team }: TeamTableProps) {
  const { user } = useAuth();
  const admin = user as User;

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Desktop Table */}
      <div className="hidden md:block bg-oxford-blue rounded-2xl shadow-sm border border-slate-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-700 hover:bg-transparent">
              <TableHead className="text-slate-400 font-semibold py-4 px-6">
                Team Member
              </TableHead>
              <TableHead className="text-slate-400 font-semibold py-4 px-6">
                Contact
              </TableHead>
              <TableHead className="text-slate-400 font-semibold py-4 px-6">
                Role
              </TableHead>
              <TableHead className="text-slate-400 font-semibold py-4 px-6 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.map((member: User, index: number) => {
              const role = member.role.toUpperCase() as keyof typeof roleConfig;
              const config = roleConfig[role] || roleConfig.MEMBER;
              const RoleIcon = config.icon;

              return (
                <TableRow
                  key={member.id}
                  className={`
                    border-b border-slate-800 transition-colors hover:bg-slate-800/50
                    ${index === team.length - 1 ? "border-b-0" : ""}
                  `}
                >
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-sunglow-500 flex items-center justify-center text-rich-black font-bold text-sm">
                        {member.firstName?.[0]}
                        {member.lastName?.[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-100">
                          {member.firstName} {member.lastName}
                        </p>
                        {member.id === admin?.id && (
                          <span className="text-xs text-sunglow-500">
                            (You)
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span className="text-sm">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span className="text-sm">
                          {member.countryCode}-{member.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <span
                      className={`
                        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border
                        ${config.className}
                      `}
                    >
                      <RoleIcon className="w-3.5 h-3.5" />
                      {config.label}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right">
                    <TeamActions user={member} admin={admin} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {team.map((member: User) => {
          const role = member.role.toUpperCase() as keyof typeof roleConfig;
          const config = roleConfig[role] || roleConfig.MEMBER;
          const RoleIcon = config.icon;

          return (
            <div
              key={member.id}
              className="p-5 rounded-2xl bg-oxford-blue shadow-sm border border-slate-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-sunglow-500 flex items-center justify-center text-rich-black font-bold">
                    {member.firstName?.[0]}
                    {member.lastName?.[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">
                      {member.firstName} {member.lastName}
                    </p>
                    <span
                      className={`
                        inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border mt-1
                        ${config.className}
                      `}
                    >
                      <RoleIcon className="w-3 h-3" />
                      {config.label}
                    </span>
                  </div>
                </div>
                <TeamActions user={member} admin={admin} />
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-700">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-sm truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">
                    {member.countryCode}-{member.phoneNumber}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {team.length === 0 && (
        <div className="text-center py-16 bg-oxford-blue rounded-2xl shadow-sm border border-slate-700">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <UserIcon className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">
            No team members yet
          </h3>
          <p className="text-slate-400">
            Invite your first team member to get started.
          </p>
        </div>
      )}
    </div>
  );
}
