"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must have a lowercase letter";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.photo.value;
    const password = form.password.value;

    const error = validatePassword(password);
    setPasswordError(error);
    if (error) return;

    setLoading(true);
    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
    });
    setLoading(false);

    if (signUpError) {
      toast.error(signUpError.message || "Registration failed");
      return;
    }
    toast.success("Registration successful! Please login.");
    router.push("/login");
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <form onSubmit={handleSubmit} className="card-body">
          <h1 className="text-3xl font-bold text-center">Create Account</h1>

          <label className="label">Name</label>
          <input name="name" type="text" className="input input-bordered w-full" placeholder="Your name" required />

          <label className="label">Email</label>
          <input name="email" type="email" className="input input-bordered w-full" placeholder="you@example.com" required />

          <label className="label">Photo URL</label>
          <input name="photo" type="url" className="input input-bordered w-full" placeholder="https://..." required />

          <label className="label">Password</label>
          <input name="password" type="password" className="input input-bordered w-full" placeholder="Password" required />
          {passwordError && <p className="text-error text-sm">{passwordError}</p>}

          <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span> : "Register"}
          </button>

          <div className="divider">OR</div>
          <button type="button" onClick={handleGoogle} className="btn btn-outline">
            Continue with Google
          </button>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
