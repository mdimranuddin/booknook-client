import { Search, BookMarked, Undo2 } from "lucide-react";

const steps = [
  {
    Icon: Search,
    title: "1. Find a Book",
    text: "Browse all books and open the one that catches your eye.",
  },
  {
    Icon: BookMarked,
    title: "2. Borrow It",
    text: "Log in, click Borrow and confirm. The book is yours for 7 days.",
  },
  {
    Icon: Undo2,
    title: "3. Return It",
    text: "Finished reading? Open My Borrows and press Return Book.",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-10 py-16">
      <div className="text-center mb-10">
        <h2 className="section-title">How Borrowing Works</h2>
        <p className="mt-3 opacity-70">Three simple steps. No paperwork.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.title}
            className="card bg-base-100 text-center h-full"
          >
            <div className="card-body items-center">
              <div className="icon-box">
                <step.Icon size={30} strokeWidth={2.5} />
              </div>
              <h3 className="card-title text-2xl mt-3">{step.title}</h3>
              <p className="opacity-75">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
