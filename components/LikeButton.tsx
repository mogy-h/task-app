// components/LikeButton.tsx（Client Component）
"use client";

import { useState } from "react";

export function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);

  return (
    <button
      onClick={() => setLikes(likes + 1)}
      className="bg-pink-500 text-white px-4 py-2 rounded"
    >
      ♥ {likes}
    </button>
  );
}
