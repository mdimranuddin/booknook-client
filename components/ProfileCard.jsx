"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfileCard() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) return null;

  const joined = new Date(user.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="section-title">My Profile</h1>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                alt={user.name}
              />
            </div>
          </div>
          <h2 className="card-title text-3xl mt-4">{user.name}</h2>
          <p className="opacity-70">{user.email}</p>
          <p className="text-sm opacity-60">Member since {joined}</p>

          <div className="card-actions mt-6 flex-wrap justify-center">
            <Link href="/my-books" className="btn btn-primary">My Books</Link>
            <Link href="/my-borrows" className="btn btn-secondary">My Borrows</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
