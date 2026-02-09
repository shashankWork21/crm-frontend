import RegisterForm from "@/components/auth/register-form";
import { Role } from "@/lib/types";

export default function ReviewerRegisterPage() {
  return <RegisterForm role={Role.REVIEWER} />;
}
