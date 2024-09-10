import LoginForm from './form';
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth/validate-request";

export default async function LoginPage() {
  const { user } = await validateRequest();
  if (user) {
    redirect('/admin');
  }

  return (
    <div className="h-screen justify-center md:items-center flex flex-col w-full gap-2 ">

      <h1 className="text-4xl font-bold">Login</h1>
      <LoginForm />

    </div>
  );
}