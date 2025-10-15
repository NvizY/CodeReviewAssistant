"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("codeFile", file);

    const res = await fetch("/api/review", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setReview(data.review || data.error);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">🧠 AI Code Review Assistant</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept=".js,.py,.java,.cpp,.c"
          onChange={(e) => setFile(e.target.files[0])}
          className="bg-gray-800 p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>
      </form>

      {review && (
        <div className="mt-8 bg-gray-800 p-4 rounded w-full max-w-3xl text-left">
          <h2 className="text-xl mb-2 font-semibold">Review Report:</h2>
          <pre className="whitespace-pre-wrap">{review}</pre>
        </div>
      )}
    </div>
  );
}
