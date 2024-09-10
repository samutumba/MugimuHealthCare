import { Navigation } from "../page";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="w-full flex flex-col gap-4 px-4">
      <Navigation />
      {children}
    </div>
  );
}