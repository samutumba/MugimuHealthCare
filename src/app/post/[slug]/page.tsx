
import { validateRequest } from "@/lib/auth/validate-request";
import { createClient } from "@/lib/supabase/client";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { Interweave } from 'interweave';
//import { EditPost } from "./edit";

export default async function PostsPage({ params }: { params: { slug: string; }; }) {

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

      <h1 className="text-4xl font-bold text-center mt-18 max-w-6xl mx-auto">
        {post.name}
      </h1>
      <h2 className="text-2xl font-bold mx-auto text-center max-w-6xl">
        Authored by {post.createdBy.name}
      </h2>

      {/* TODO: Create a safer html rendering process */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose w-full mx-auto mb-12 mt-12" />

    </div>
  );

}