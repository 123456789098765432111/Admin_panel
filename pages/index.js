import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Dashboard from "./dashboard";

const Home = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  console.log(session);
  const router = useRouter();
  if (session?.user?.email === process.env.NEXT_PUBLIC_EMAIL) {
    return <Dashboard />;
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-5 text-center `}
    >
      <div className="max-w-xl lg:max-w-3xl">
        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Welcome to my-Shop
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500 max-w-sm">
          This website is only accessible to admins only. Add new products and
          manage database.
        </p>
        <div className="col-span-6 sm:flex sm:items-center sm:gap-4 my-4 flex items-center justify-center">
          <button
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              signIn("google");
            }}
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Login With Google
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
