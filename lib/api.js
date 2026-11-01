import { authClient } from "@/lib/auth-client";

// fetch that sends the JWT token to the Express server
export async function authFetch(path, options = {}) {
  const { data } = await authClient.token();
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${data?.token}`,
    },
  });
}
