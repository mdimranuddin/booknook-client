import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import BookCard from "@/components/BookCard";
import HowItWorks from "@/components/HowItWorks";
import TopCategories from "@/components/TopCategories";

async function getLatestBooks() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const books = await getLatestBooks();

  return (
    <>
      <HeroSlider />

      <section className="max-w-7xl mx-auto px-4 lg:px-10 py-16">
        <div className="text-center mb-10">
          <h2 className="section-title">New Arrivals</h2>
          <p className="mt-2 opacity-70">The newest books on our shelf.</p>
        </div>

        {books.length === 0 ? (
          <p className="text-center opacity-70">No books yet. Add the first one!</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/books" className="btn btn-primary btn-lg">
            See All Books
          </Link>
        </div>
      </section>

      <TopCategories />
      <HowItWorks />
    </>
  );
}
