import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="w-full flex flex-col gap-4 px-4">
      <Navigation />
      {children}
    </div>
  );
}


const Navigation = () => {
  return (
    <nav className="flex items-center justify-between w-full max-w-7xl mx-auto my-4">
      <Link href="/" className="text-lg font-semibold">
        <Image src="/mugimu.png" alt="Logo" width={80} height={80} />
      </Link>
      <div className="flex items-center justify-end gap-4">
        <Link href="/" className="text-lg font-semibold">
          Dashboard
        </Link>
        <Link href="/about" className="text-lg font-semibold">
          Pages
        </Link>
        <Link href="/posts" className="text-lg font-semibold">
          Events
        </Link>
      </div>
    </nav >
  );
};