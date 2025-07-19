import RegisterForm from "@/components/auth/register-form";
import { Role } from "@/lib/types";

export default function AdminRegisterPage() {
  return <RegisterForm role={Role.ADMIN} />;
}
