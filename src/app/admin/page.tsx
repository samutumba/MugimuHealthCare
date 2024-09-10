import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth/validate-request";
import { CreatePost } from "./_components/createPost";
import { CreateEvent } from "./_components/createEvent";
import { LatestPosts } from "./_components/posts";

export default async function AdminPage() {
  const { user } = await validateRequest();
  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <div className="flex flex-row justify-between w-full max-w-7xl mx-auto">
        <div className="max-w-4x mb-10">
          <h2 className="text-4xl font-bold md:leading-tight dark:text-white">
            Welcome back, {user.name}!
          </h2>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Here&apos;s an overview of the latest events and posts.
          </p>
        </div>
      </div>
      <div className="flex flex-col mb-10 items-center md:flex-row justify-between w-full max-w-7xl mx-auto">
        <div className="max-w-4x ">
          <h2 className="text-4xl font-bold md:leading-tight dark:text-white">
            Your Posts
          </h2>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Here are the most recent events.
          </p>
        </div>
        <CreatePost />
      </div>
      <div className="flex flex-col mb-10 items-center md:flex-row justify-between w-full max-w-7xl mx-auto">
        <LatestPosts />
      </div>
      <div className="flex flex-col mb-10 items-center md:flex-row justify-between w-full max-w-7xl mx-auto">
        <div className="max-w-4x">
          <h2 className="text-4xl font-bold md:leading-tight dark:text-white">
            Recent Events
          </h2>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Here are the most recent events.
          </p>
        </div>
        <CreateEvent />
      </div>
    </>
  );
}