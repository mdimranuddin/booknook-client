"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/api";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function MyBorrowsTable() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const loadBorrows = async () => {
      try {
        const res = await authFetch("/borrows");
        const data = await res.json();
        setBorrows(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error("Failed to load your borrows");
      } finally {
        setLoading(false);
      }
    };
    loadBorrows();
  }, [user?.email]);

  const handleReturn = async (id) => {
    setReturningId(id);
    try {
      const res = await authFetch(`/borrows/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to return the book");

      setBorrows((prev) => prev.filter((b) => b._id !== id));
      toast.success("Book returned successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setReturningId(null);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-10 py-12">
      <div className="text-center mb-10">
        <h1 className="section-title">My Borrows</h1>
        <p className="mt-2 opacity-70">
          Books you borrowed. Please return them on time.
        </p>
      </div>

      {borrows.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl font-semibold">You have not borrowed any book yet</p>
          <Link href="/books" className="btn btn-primary mt-4">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-box shadow-md">
          <table className="table">
            <thead>
              <tr className="text-base">
                <th>Image</th>
                <th>Title</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((borrow) => (
                <tr key={borrow._id}>
                  <td>
                    <img
                      src={borrow.bookImage}
                      alt={borrow.bookTitle}
                      className="w-14 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="font-semibold">{borrow.bookTitle}</td>
                  <td>{formatDate(borrow.borrowDate)}</td>
                  <td>{formatDate(borrow.returnDate)}</td>
                  <td>
                    <button
                      onClick={() => handleReturn(borrow._id)}
                      disabled={returningId === borrow._id}
                      className="btn btn-secondary btn-sm"
                    >
                      {returningId === borrow._id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        "Return Book"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
