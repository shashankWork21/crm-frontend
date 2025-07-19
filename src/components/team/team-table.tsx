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

interface TeamTableProps {
  team: User[];
}

export default function TeamTable({ team }: TeamTableProps) {
  const { user } = useAuth();
  const admin = user as User;
  return (
    <Table className="w-4/5 mx-auto bg-slate-200 shadow-md text-lg">
      <TableHeader className="bg-slate-300">
        <TableRow className="border-none">
          <TableHead className="font-bold text-center">Name</TableHead>
          <TableHead className="font-bold text-center">Email</TableHead>
          <TableHead className="font-bold text-center">Phone</TableHead>
          <TableHead className="font-bold text-center">Role</TableHead>
          <TableHead className="font-bold text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {team.map((member: User) => (
          <TableRow key={member.id} className="border-none">
            <TableCell className="text-center">
              {member.firstName} {member.lastName}
            </TableCell>
            <TableCell className="text-center">{member.email}</TableCell>
            <TableCell className="text-center">
              {member.countryCode}-{member.phoneNumber}
            </TableCell>
            <TableCell className="text-center">
              {member.role.charAt(0) + member.role.slice(1).toLowerCase()}
            </TableCell>
            <TableCell className="text-center">
              <TeamActions user={member} admin={admin} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
