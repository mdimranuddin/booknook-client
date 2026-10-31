import Link from "next/link";

export default function BookCard({ book }) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full">
      <figure className="h-72 bg-base-200">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <span className="badge badge-secondary badge-outline">
          {book.category}
        </span>
        <h2 className="card-title text-xl line-clamp-1">{book.title}</h2>
        <p className="text-sm opacity-70 line-clamp-1">by {book.author}</p>
        <div className="card-actions mt-auto pt-3">
          <Link href={`/books/${book._id}`} className="btn btn-primary w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
