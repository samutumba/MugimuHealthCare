import { validateRequest } from "@/lib/auth/validate-request";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default async function PostsPage() {
  const { user } = await validateRequest();
  if (!user) {
    redirect('/login');
  }

  return (
    <div>

    </div>
  );
}