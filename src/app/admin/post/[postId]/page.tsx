import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default async function PostPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error ?? data?.user) {
    redirect('/login');
  }

  return (
    <div>

    </div>
  );
}