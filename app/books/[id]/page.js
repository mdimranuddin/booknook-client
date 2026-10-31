import Link from "next/link";
import { notFound } from "next/navigation";
import BorrowButton from "@/components/BorrowButton";

async function getBook(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = await getBook(id);
  return { title: book ? book.title : "Book Details" };
}

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) notFound();

  const addedDate = new Date(book.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-10 py-12">
      <Link href="/books" className="link link-hover text-sm">
        ← Back to All Books
      </Link>

      <div className="card lg:card-side bg-base-100 shadow-xl mt-4 overflow-hidden">
        <figure className="lg:w-2/5 h-96 lg:h-auto bg-base-200">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="card-body lg:w-3/5">
          <span className="badge badge-secondary badge-outline">
            {book.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {book.title}
          </h1>
          <p className="text-lg opacity-80">by {book.author}</p>

          <p className="mt-4 leading-relaxed">{book.description}</p>

          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-base-200 rounded-lg p-3">
              <p className="opacity-60">Added by</p>
              <p className="font-semibold">{book.addedByName}</p>
              <p className="opacity-70">{book.addedByEmail}</p>
            </div>
            <div className="bg-base-200 rounded-lg p-3">
              <p className="opacity-60">Date added</p>
              <p className="font-semibold">{addedDate}</p>
            </div>
            <div className="bg-base-200 rounded-lg p-3 sm:col-span-2">
              <p className="opacity-60">Available copies</p>
              <p className="font-semibold">
                {book.availableCopies} of {book.totalCopies}
              </p>
            </div>
          </div>

          <div className="card-actions mt-6">
            <BorrowButton
              bookId={book._id}
              availableCopies={book.availableCopies}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
