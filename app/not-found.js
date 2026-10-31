import Link from "next/link";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-4">📕</div>
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold mt-2">This page is not on our shelf</h2>
        <p className="opacity-70 mt-3">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link href="/" className="btn btn-primary btn-lg mt-8">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
