import LoginForm from './form';

export default function LoginPage() {
  return (
    <div className="h-screen justify-center md:items-center flex flex-col w-full gap-2 ">

      <h1 className="text-4xl font-bold">Login</h1>
      <LoginForm />

    </div>
  );
}