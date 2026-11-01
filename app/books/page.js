import BookCard from "@/components/BookCard";

export const metadata = { title: "All Books" };

async function getBooks() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-10 py-12">
      <div className="text-center mb-10">
        <h1 className="section-title">All Books</h1>
        <p className="mt-2 opacity-70">
          Pick a book, borrow it, and enjoy reading.
        </p>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl font-semibold">No books found yet</p>
          <p className="opacity-70 mt-1">Be the first one to add a book!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, index) => (
            <BookCard key={book._id} book={book} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
