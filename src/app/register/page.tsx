import RegisterForm from "@/components/auth/register-form";
import { Role } from "@/lib/types";

export default function EmployeeRegisterPage() {
  return <RegisterForm role={Role.ORGANISATION_ADMIN} />;
}
