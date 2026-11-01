import Link from "next/link";
import { BookOpen, FlaskConical, Landmark, Smile, Sparkles } from "lucide-react";

const categories = [
  { Icon: BookOpen, name: "Fiction", text: "Stories that take you somewhere new." },
  { Icon: FlaskConical, name: "Science", text: "Curious ideas explained clearly." },
  { Icon: Landmark, name: "History", text: "Learn from the people before us." },
  { Icon: Smile, name: "Kids", text: "Fun reads for little readers." },
  { Icon: Sparkles, name: "Others", text: "Everything else worth reading." },
];

export default function TopCategories() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-10">
        <div className="text-center mb-10">
          <h2 className="section-title">Top Categories</h2>
          <p className="mt-3 opacity-70">Find your next favourite read by topic.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href="/books"
              className="card bg-base-100 hover:-translate-y-1 hover:bg-secondary transition duration-300 h-full"
            >
              <div className="card-body items-center text-center">
                <div className="icon-box">
                  <cat.Icon size={30} strokeWidth={2.5} />
                </div>
                <h3 className="card-title mt-2">{cat.name}</h3>
                <p className="text-sm opacity-80">{cat.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
