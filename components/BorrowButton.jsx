"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/api";

export default function BorrowButton({ bookId, availableCopies }) {
  const router = useRouter();
  const modalRef = useRef(null);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  const handleBorrow = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authFetch("/borrows", {
        method: "POST",
        body: JSON.stringify({ bookId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to borrow the book");

      toast.success("Book borrowed successfully! Return it within 7 days.");
      modalRef.current.close();
      router.refresh();
    } catch (error) {
      toast.error(error.message);
      modalRef.current.close();
    } finally {
      setLoading(false);
    }
  };

  if (availableCopies <= 0) {
    return (
      <button className="btn btn-disabled w-full sm:w-auto" disabled>
        Not Available
      </button>
    );
  }

  return (
    <>
      <button
        className="btn btn-primary w-full sm:w-auto"
        onClick={() => modalRef.current.showModal()}
      >
        Borrow This Book
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">Borrow This Book</h3>
          <p className="py-2 text-sm opacity-70">
            You will have 7 days to return it.
          </p>

          <form onSubmit={handleBorrow} className="space-y-2">
            <label className="label">Your Name</label>
            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />

            <label className="label">Your Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => modalRef.current.close()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Confirm Borrow"
                )}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
