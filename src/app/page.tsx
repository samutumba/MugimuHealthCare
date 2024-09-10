import Link from "next/link";
import { LatestPosts } from "@/app/_components/post";
import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { HeaderTitle } from "./_components/hero";
import Image from "next/image";
import { SubscriptionToNewsletter } from "./_components/subscription";
import { ContactUs } from "./_components/contact-us";

export default async function Home() {

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col gap-8 justify-center items-center">
        <Navigation />
        <Hero />
        <AsFeaturedIn />
        <Posts />
        <SubscriptionToNewsletter />
        <ContactUs />
        <Footer />
      </main>
    </HydrateClient>
  );
}

export const Navigation = () => {
  return (
    <nav className="flex items-center justify-between w-full max-w-7xl mx-auto my-4">
      <Link href="/" className="text-lg font-semibold">
        <Image src="/mugimu.png" alt="Logo" width={80} height={80} />
      </Link>
      <div className="flex items-center justify-end gap-4">
        <Link href="/" className="text-lg font-semibold">
          Home
        </Link>
        <Link href="/#posts" className="text-lg font-semibold">
          Posts
        </Link>
        <Link href="/#contact-us" className="text-lg font-semibold">
          Contact Us
        </Link>
      </div>
    </nav >
  );
};

const Hero = () => {
  return (
    <section className="flex lg:flex-row flex-col items-center justify-center w-full gap-9 max-w-7xl px-3">
      <div className="flex flex-col items-center justify-center lg:w-2/3">
        <h1 className="md:text-left text-center font-display font-bold tracking-[-0.02em] drop-shadow-sm text-6xl md:text-7xl">Caring for those who care first</h1>
        <p className="mt-4 md:text-left text-center text-lg w-full">
          We provide the tools and resources to help you care for your little ones. Our mission is to make your motherhood easier and more enjoyable.
        </p>
      </div>
      <div>
        <Image src="/images/meeting3.jpeg" alt="Hero" width={800} height={200} className="rounded-lg" />
      </div>
    </section>
  );
};

const Posts = () => {
  return (
    <>
      <div id="posts" className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mb-10">
          <h2 className="text-4xl font-bold md:text-5xl md:leading-tight dark:text-white">
            View our latest blog posts
          </h2>
          <p className="mt-1 text-gray-600 dark:text-orange-400">
            Read up on our online resources and tips for new moms.
          </p>
        </div>
        <LatestPosts />
      </div>

    </>

  );
};

const AsFeaturedIn = () => {
  return (<>
    {/* Clients */}
    <div id="featured-in" className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Title */}
      <div className="w-2/3 sm:w-1/2 lg:w-1/3 mx-auto text-center mb-6">
        <h2 className="text-gray-600 dark:text-orange-400">
          As featured in
        </h2>
      </div>
      {/* End Title */}
      <div className="flex justify-center gap-x-6 sm:gap-x-12 lg:gap-x-24">
        <img
          src="https://pbs.twimg.com/profile_images/1161981948207804418/4uSjXWCM_400x400.jpg"
          className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
          alt="PEDN Uganda"
        />

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3I4ilyPQ2Qwp2YEJNAlWCoj19EcXfp9-DBw&s"

          className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
          alt="New Vision Uganda"
        />

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnxhYpmpQ2HgNpNRscQR0ko1y6HtNTBM9QuA&s"

          className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
          alt="Daily Monitor Uganda"
        />

      </div>
    </div>
    {/* End Clients */}
  </>
  );
};

const Footer = () => {
  return (
    <>
      {/* ========== FOOTER ========== */}
      <footer className="relative overflow-hidden bg-orange-900">
        <svg
          className="absolute -bottom-20 start-1/2 w-[1900px] transform -translate-x-1/2"
          width={2745}
          height={488}
          viewBox="0 0 2745 488"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 330.864C232.505 403.801 853.749 527.683 1482.69 439.719C2111.63 351.756 2585.54 434.588 2743.87 487"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 308.873C232.505 381.81 853.749 505.692 1482.69 417.728C2111.63 329.765 2585.54 412.597 2743.87 465.009"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 286.882C232.505 359.819 853.749 483.701 1482.69 395.738C2111.63 307.774 2585.54 390.606 2743.87 443.018"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 264.891C232.505 337.828 853.749 461.71 1482.69 373.747C2111.63 285.783 2585.54 368.615 2743.87 421.027"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 242.9C232.505 315.837 853.749 439.719 1482.69 351.756C2111.63 263.792 2585.54 346.624 2743.87 399.036"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 220.909C232.505 293.846 853.749 417.728 1482.69 329.765C2111.63 241.801 2585.54 324.633 2743.87 377.045"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 198.918C232.505 271.855 853.749 395.737 1482.69 307.774C2111.63 219.81 2585.54 302.642 2743.87 355.054"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 176.927C232.505 249.864 853.749 373.746 1482.69 285.783C2111.63 197.819 2585.54 280.651 2743.87 333.063"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 154.937C232.505 227.873 853.749 351.756 1482.69 263.792C2111.63 175.828 2585.54 258.661 2743.87 311.072"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 132.946C232.505 205.882 853.749 329.765 1482.69 241.801C2111.63 153.837 2585.54 236.67 2743.87 289.082"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 110.955C232.505 183.891 853.749 307.774 1482.69 219.81C2111.63 131.846 2585.54 214.679 2743.87 267.091"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 88.9639C232.505 161.901 853.749 285.783 1482.69 197.819C2111.63 109.855 2585.54 192.688 2743.87 245.1"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 66.9729C232.505 139.91 853.749 263.792 1482.69 175.828C2111.63 87.8643 2585.54 170.697 2743.87 223.109"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 44.9819C232.505 117.919 853.749 241.801 1482.69 153.837C2111.63 65.8733 2585.54 148.706 2743.87 201.118"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 22.991C232.505 95.9276 853.749 219.81 1482.69 131.846C2111.63 43.8824 2585.54 126.715 2743.87 179.127"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
          <path
            d="M0.5 1C232.505 73.9367 853.749 197.819 1482.69 109.855C2111.63 21.8914 2585.54 104.724 2743.87 157.136"
            className="stroke-orange-700/50"
            stroke="currentColor"
          />
        </svg>
        <div className="relative z-10">
          <div className="w-full max-w-5xl px-4 xl:px-0 py-10 lg:pt-16 mx-auto">
            <div className="inline-flex items-center">
              <Image src="/mugimu.png" alt="Logo" width={70} height={70} />
              {/* End Logo */}
              <div className="border-s border-orange-700 ps-5 ms-5">
                <p className="text-sm text-orange-400">
                  2023-{(new Date()).getFullYear()} Mugimu Health Care</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* ========== END FOOTER ========== */}
    </>
  );
};
