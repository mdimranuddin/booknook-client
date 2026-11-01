"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/api";

export default function AddBookForm() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const imageFile = form.image.files[0];

    setLoading(true);
    try {
      // 1. upload the image to imgbb
      const imageData = new FormData();
      imageData.append("image", imageFile);
      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        { method: "POST", body: imageData }
      );
      const imgJson = await imgRes.json();
      if (!imgJson.success) throw new Error("Image upload failed");

      // 2. save the book on the server
      const book = {
        title: form.title.value,
        author: form.author.value,
        category: form.category.value,
        image: imgJson.data.display_url,
        description: form.description.value,
        totalCopies: Number(form.totalCopies.value),
        addedByName: user.name,
        addedByEmail: user.email,
      };

      const res = await authFetch("/books", {
        method: "POST",
        body: JSON.stringify(book),
      });
      if (!res.ok) throw new Error("Failed to add the book");

      toast.success("Book added successfully!");
      form.reset();
      router.push("/books");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="p-20 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Add a New Book</h1>
      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl card-body">
        <label className="label">Book Title</label>
        <input name="title" type="text" className="input input-bordered w-full" placeholder="Book title" required />

        <label className="label">Author Name</label>
        <input name="author" type="text" className="input input-bordered w-full" placeholder="Author name" required />

        <label className="label">Category</label>
        <select name="category" className="select select-bordered w-full" defaultValue="" required>
          <option value="" disabled>Select a category</option>
          <option>Fiction</option>
          <option>Science</option>
          <option>History</option>
          <option>Kids</option>
          <option>Others</option>
        </select>

        <label className="label">Total Copies</label>
        <input name="totalCopies" type="number" min="1" defaultValue="1" className="input input-bordered w-full" required />

        <label className="label">Book Image</label>
        <input name="image" type="file" accept="image/*" className="file-input file-input-bordered w-full" required />

        <label className="label">Short Description</label>
        <textarea name="description" className="textarea textarea-bordered w-full" rows="4" placeholder="Write a short description" required></textarea>

        <label className="label">Your Name</label>
        <input type="text" value={user?.name || ""} readOnly className="input input-bordered w-full bg-base-200" />

        <label className="label">Your Email</label>
        <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full bg-base-200" />

        <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
          {loading ? <span className="loading loading-spinner"></span> : "Add Book"}
        </button>
      </form>
    </div>
  );
}
