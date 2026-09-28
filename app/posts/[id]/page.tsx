// app/posts/[id]/page.tsx（Server Component）
import { LikeButton } from "@/components/LikeButton";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Server Componentで直接データ取得
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  return (
    <article>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.body}</p>

      {/* Client Componentはインタラクティブな部分だけ */}
      <div className="mt-4">
        <LikeButton initialLikes={0} />
      </div>
    </article>
  );
}
