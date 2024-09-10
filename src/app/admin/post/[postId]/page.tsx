
import { validateRequest } from "@/lib/auth/validate-request";
import { createClient } from "@/lib/supabase/client";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { EditPost } from "./edit";

export default async function PostsPage({ params }: { params: { postId: string; }; }) {
  const { user } = await validateRequest();
  if (!user) {
    redirect('/login');
  }
  const post = await db.post.findUnique({
    where: {
      id: params.postId,
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex flex-col w-full justify-center gap-4">

      <h1 className="text-4xl font-bold text-center">
        Post Details
      </h1>

      <div className="flex flex-col gap-2 max-w-6xl w-full mx-auto mb-80">
        <EditPost post={post} />
      </div>
    </div>
  );
}