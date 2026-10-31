"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    emoji: "📖",
    title: "Your Cozy Corner for Great Books",
    text: "Browse our growing shelf of stories, science and history. Every book is one click away.",
    bg: "from-[#1f5f4a] to-[#0f3d2e]",
  },
  {
    emoji: "🤝",
    title: "Borrow a Book for 7 Days",
    text: "Pick a book you love, borrow it for a week and return it when you finish reading.",
    bg: "from-[#8c3b2a] to-[#4a1d14]",
  },
  {
    emoji: "✍️",
    title: "Share Your Own Books",
    text: "Add the books you own and let other readers enjoy them. A library grows when we share.",
    bg: "from-[#c58b2a] to-[#7a5412]",
    extra: { label: "Add Your Book", href: "/add-book" },
  },
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
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
            <div className="max-w-4xl mx-auto px-12 md:px-20 py-16 text-center">
              <div className="text-6xl mb-4">{slide.emoji}</div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                {slide.title}
              </h1>
              <p className="mt-4 text-base md:text-lg opacity-90 max-w-2xl mx-auto">
                {slide.text}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/books" className="btn btn-secondary btn-lg">
                  Browse Books
                </Link>
                {slide.extra && (
                  <Link
                    href={slide.extra.href}
                    className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-neutral"
                  >
                    {slide.extra.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
