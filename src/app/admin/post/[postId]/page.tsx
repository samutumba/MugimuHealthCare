import { validateRequest } from "@/lib/auth/validate-request";
import { createClient } from "@/lib/supabase/client";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

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
    <div className="flex flex-row gap-4">

      <h1 className="text-4xl font-bold text-center">
        Post Details
      </h1>


    </div>
  );
}