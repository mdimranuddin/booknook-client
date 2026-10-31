import Link from "next/link";

const categories = [
  { icon: "🧙", name: "Fiction", text: "Stories that take you somewhere new." },
  { icon: "🔬", name: "Science", text: "Curious ideas explained clearly." },
  { icon: "🏛️", name: "History", text: "Learn from the people before us." },
  { icon: "🧸", name: "Kids", text: "Fun reads for little readers." },
  { icon: "✨", name: "Others", text: "Everything else worth reading." },
];

export default function TopCategories() {
  return (
    <section className="bg-base-100 py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-10">
        <div className="text-center mb-10">
          <h2 className="section-title">Top Categories</h2>
          <p className="mt-2 opacity-70">Find your next favourite read by topic.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href="/books"
              className="card bg-base-200 hover:bg-primary hover:text-primary-content transition duration-300 h-full"
            >
              <div className="card-body items-center text-center">
                <div className="text-4xl">{cat.icon}</div>
                <h3 className="card-title">{cat.name}</h3>
                <p className="text-sm opacity-80">{cat.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
