import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center"><span className="loading loading-spinner loading-lg"></span></div>}>
      <LoginForm />
    </Suspense>
  );
}
