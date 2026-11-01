"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { BookOpen, Handshake, Pencil } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const cover = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

const slides = [
  {
    Icon: BookOpen,
    tag: "Free to browse",
    title: "Your Cozy Corner for Great Books",
    text: "Browse our growing shelf of stories, science and history. Every book is one click away.",
    bg: "from-[#7c3aed] to-[#4c1d95]",
    covers: ["9780590353427", "9780547928227", "9780451524935"],
  },
  {
    Icon: Handshake,
    tag: "7 days, no fees",
    title: "Borrow a Book for 7 Days",
    text: "Pick a book you love, borrow it for a week and return it when you finish reading.",
    bg: "from-[#ff4d8d] to-[#b8195a]",
    covers: ["9780735211292", "9780062316110", "9780062315007"],
  },
  {
    Icon: Pencil,
    tag: "Readers share",
    title: "Share Your Own Books",
    text: "Add the books you own and let other readers enjoy them. A library grows when we share.",
    bg: "from-[#0ea5e9] to-[#0369a1]",
    covers: ["9780142410370", "9780064400558", "9780345539434"],
    extra: { label: "Add Your Book", href: "/add-book" },
  },
];

const positions = [
  { cls: "left-0 top-14 w-36 h-56", ry: -20, delay: "0s" },
  { cls: "left-28 top-0 w-40 h-60 z-10", ry: -12, delay: "-1.6s" },
  { cls: "left-60 top-16 w-36 h-56", ry: -24, delay: "-3.2s" },
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 5500, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      loop
      className="w-full"
      style={{
        "--swiper-theme-color": "#ffffff",
        "--swiper-navigation-size": "28px",
      }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.title}>
          <div
            className={`bg-gradient-to-br ${slide.bg} text-white min-h-[460px] md:min-h-[520px] flex items-center`}
          >
            <div className="max-w-6xl mx-auto w-full px-12 md:px-20 py-14 grid md:grid-cols-2 gap-10 items-center">
              <div className="text-center md:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border-2 border-[#14112b] bg-[#ffd23f] text-[#14112b] px-3 py-1 text-sm font-bold shadow-[3px_3px_0_#14112b]">
                  <slide.Icon size={16} strokeWidth={2.5} />
                  {slide.tag}
                </span>
                <h1 className="mt-5 text-3xl md:text-5xl font-extrabold leading-tight">
                  {slide.title}
                </h1>
                <p className="mt-4 text-base md:text-lg opacity-95 max-w-xl mx-auto md:mx-0">
                  {slide.text}
                </p>
                <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
                  <Link href="/books" className="btn btn-accent btn-lg">
                    Browse Books
                  </Link>
                  {slide.extra && (
                    <Link
                      href={slide.extra.href}
                      className="btn btn-lg bg-white text-[#14112b]"
                    >
                      {slide.extra.label}
                    </Link>
                  )}
                </div>
              </div>

              <div className="hidden md:flex justify-center">
                <div className="relative w-[420px] h-[340px]">
                  {slide.covers.map((isbn, i) => (
                    <img
                      key={isbn}
                      src={cover(isbn)}
                      alt="Book cover"
                      className={`book-3d absolute ${positions[i].cls}`}
                      style={{
                        "--ry": `${positions[i].ry}deg`,
                        animationDelay: positions[i].delay,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
