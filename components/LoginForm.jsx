"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // go back to the page the user wanted
  const redirectParam = searchParams.get("redirect");
  const redirectTo =
    redirectParam && redirectParam.startsWith("/") ? redirectParam : "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Invalid email or password");
      return;
    }
    toast.success("Login successful!");
    router.push(redirectTo);
    router.refresh();
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: redirectTo });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <form onSubmit={handleSubmit} className="card-body">
          <h1 className="text-3xl font-bold text-center">Welcome Back</h1>

          <label className="label">Email</label>
          <input name="email" type="email" className="input input-bordered w-full" placeholder="you@example.com" required />

          <label className="label">Password</label>
          <input name="password" type="password" className="input input-bordered w-full" placeholder="Password" required />

          <button
            type="button"
            onClick={() => toast("Forgot password will be added soon")}
            className="link link-hover text-sm text-left"
          >
            Forgot password?
          </button>

          <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span> : "Login"}
          </button>

          <div className="divider">OR</div>
          <button type="button" onClick={handleGoogle} className="btn btn-outline">
            Continue with Google
          </button>

          <p className="text-center text-sm mt-3">
            New to BookNook?{" "}
            <Link href="/register" className="link link-primary">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
