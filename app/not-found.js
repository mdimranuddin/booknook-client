import Link from "next/link";
import { BookX } from "lucide-react";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="card bg-base-100 max-w-lg w-full text-center">
        <div className="card-body items-center py-12">
          <div className="icon-box">
            <BookX size={32} strokeWidth={2.5} />
          </div>
          <h1 className="section-title mt-5" style={{ fontSize: "5rem" }}>
            404
          </h1>
          <h2 className="text-2xl font-bold mt-3">This page is not on our shelf</h2>
          <p className="opacity-75 mt-2">
            The page you are looking for does not exist or may have been moved.
          </p>
          <Link href="/" className="btn btn-primary btn-lg mt-6">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
