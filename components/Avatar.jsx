"use client";
import { useState } from "react";

export default function Avatar({ user }) {
  const fallback = `https://ui-avatars.com/api/?background=7c3aed&color=ffffff&bold=true&name=${encodeURIComponent(
    user?.name || "User"
  )}`;
  const [src, setSrc] = useState(user?.image || fallback);

  return (
    <img
      src={src}
      alt={user?.name || "User"}
      referrerPolicy="no-referrer"
      onError={() => setSrc(fallback)}
      className="w-full h-full object-cover"
    />
  );
}
