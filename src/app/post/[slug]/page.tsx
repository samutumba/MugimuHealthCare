
import { validateRequest } from "@/lib/auth/validate-request";
import { createClient } from "@/lib/supabase/client";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { Interweave } from 'interweave';
//import { EditPost } from "./edit";

export default async function PostsPage({ params }: { params: { slug: string; }; }) {
  const { user } = await validateRequest();
  if (!user) {
    redirect('/login');
  }
  const post = await db.post.findFirst({
    where: {
      id: params.slug,
    },
    include: {
      createdBy: {
        select: {
          name: true,
        },
      },
    }
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex flex-col w-full justify-center gap-4">

      <h1 className="text-4xl font-bold text-center">
        {post.name}
      </h1>
      <h2 className="text-2xl font-bold text-center">
        Authored by {post.createdBy.name}
      </h2>

      <div className="prose max-w-6xl w-full mx-auto mb-80">
        <Interweave content={post.content} />;
      </div>
    </div>
  );

}