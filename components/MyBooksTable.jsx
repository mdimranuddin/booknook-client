"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function MyBooksTable() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const editRef = useRef(null);
  const deleteRef = useRef(null);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editBook, setEditBook] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const loadBooks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
        const data = await res.json();
        const mine = Array.isArray(data)
          ? data.filter((book) => book.addedByEmail === user.email)
          : [];
        setBooks(mine);
      } catch (error) {
        toast.error("Failed to load your books");
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [user?.email]);

  const openEdit = (book) => {
    setEditBook(book);
    editRef.current.showModal();
  };

  const openDelete = (book) => {
    setDeleteBook(book);
    deleteRef.current.showModal();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      title: form.title.value,
      author: form.author.value,
      category: form.category.value,
      image: form.image.value,
      description: form.description.value,
    };

    setSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${editBook._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        }
      );
      if (!res.ok) throw new Error("Failed to update the book");

      setBooks((prev) =>
        prev.map((b) => (b._id === editBook._id ? { ...b, ...updated } : b))
      );
      toast.success("Book updated successfully!");
      editRef.current.close();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${deleteBook._id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete the book");

      setBooks((prev) => prev.filter((b) => b._id !== deleteBook._id));
      toast.success("Book deleted successfully!");
      deleteRef.current.close();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
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
        <h1 className="section-title">My Books</h1>
        <p className="mt-2 opacity-70">The books you added to BookNook.</p>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl font-semibold">You have not added any book yet</p>
          <Link href="/add-book" className="btn btn-primary mt-4">
            Add a Book
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-box shadow-md">
          <table className="table">
            <thead>
              <tr className="text-base">
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Copies</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-14 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="font-semibold">{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <span className="badge badge-secondary badge-outline">
                      {book.category}
                    </span>
                  </td>
                  <td>
                    {book.availableCopies} / {book.totalCopies}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(book)}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDelete(book)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit modal */}
      <dialog ref={editRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-2">Edit Book</h3>
          <form key={editBook?._id} onSubmit={handleUpdate} className="space-y-1">
            <label className="label">Book Title</label>
            <input name="title" type="text" defaultValue={editBook?.title} className="input input-bordered w-full" required />

            <label className="label">Author Name</label>
            <input name="author" type="text" defaultValue={editBook?.author} className="input input-bordered w-full" required />

            <label className="label">Category</label>
            <select name="category" defaultValue={editBook?.category} className="select select-bordered w-full" required>
              <option>Fiction</option>
              <option>Science</option>
              <option>History</option>
              <option>Kids</option>
              <option>Others</option>
            </select>

            <label className="label">Image URL</label>
            <input name="image" type="url" defaultValue={editBook?.image} className="input input-bordered w-full" required />

            <label className="label">Short Description</label>
            <textarea name="description" defaultValue={editBook?.description} className="textarea textarea-bordered w-full" rows="4" required></textarea>

            <div className="modal-action">
              <button type="button" className="btn" onClick={() => editRef.current.close()}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? <span className="loading loading-spinner"></span> : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Delete confirm modal */}
      <dialog ref={deleteRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">Delete this book?</h3>
          <p className="py-4">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{deleteBook?.title}</span>? This
            cannot be undone.
          </p>
          <div className="modal-action">
            <button className="btn" onClick={() => deleteRef.current.close()}>
              Cancel
            </button>
            <button className="btn btn-error" onClick={handleDelete} disabled={deleting}>
              {deleting ? <span className="loading loading-spinner"></span> : "Yes, Delete"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
