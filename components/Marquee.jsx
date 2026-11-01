import { Star } from "lucide-react";

const words = ["Add a Book", "Borrow a Book", "Return a Book", "Read More", "Share Stories"];

function Row() {
  return (
    <div className="flex items-center shrink-0">
      {words.map((word) => (
        <span
          key={word}
          className="flex items-center gap-6 px-6 py-3 text-lg md:text-xl font-extrabold uppercase tracking-wide"
        >
          {word}
          <Star size={18} className="text-[#ffd23f]" fill="#ffd23f" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
}
