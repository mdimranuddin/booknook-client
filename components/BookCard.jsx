"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function BookCard({ book, index = 0 }) {
  const tiltRef = useRef(null);
  const reduce = useReducedMotion();

  const handleMove = (e) => {
    const el = tiltRef.current;
    if (!el || reduce) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
  };

  const handleLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "";
  };

  return (
    <motion.div
      className="h-full"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.1, ease: "easeOut" }}
    >
      <div
        ref={tiltRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ transition: "transform 0.15s ease-out" }}
        className="card bg-base-100 h-full"
      >
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
    </motion.div>
  );
}
