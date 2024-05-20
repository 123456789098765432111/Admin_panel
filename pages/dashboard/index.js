import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading/Loading";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      axios.get("/api/products").then((response) => {
        setProducts(response.data);
      });
      axios.get("/api/categories").then((result) => {
        setCategories(result.data);
      });
    }
  }, [status]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen p-4">
        <p>You need to be authenticated to view this page.</p>
        <button onClick={() => signIn()}>Sign in</button>
      </main>
    );
  }

  const totalImagesCount = products.reduce(
    (total, product) => total + product.images.length,
    0
  );
  const totalPrice = products.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <>
      <main className="min-h-screen p-4">
        <header>
          <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">
                  Welcome Back,{" "}
                  <span className="text-green-700 font-bold">
                    {session.user.name}
                  </span>
                </h1>
                <p className="mt-1.5 text-md text-gray-500 max-w-md">
                  View the statistics about your business. Also manage and add
                  products.
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-500 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                  type="button"
                >
                  <span className="text-sm font-medium"> View Products </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
                <Link
                  href="https://frontend-new-mauve.vercel.app/"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-orange-500 px-5 py-3 text-orange-500 transition hover:bg-orange-50 hover:text-orange-700 focus:outline-none focus:ring"
                  type="button"
                >
                  <span className="text-sm font-medium"> View Shop </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center">
            <article className="flex max-md:flex-col items-end justify-between rounded-lg gap-4">
              <div>
                <p className="text-sm text-gray-500">Profit</p>
                <p className="text-2xl font-medium text-gray-900">
                  Ksh {formatPrice(totalPrice)}
                </p>
              </div>
              <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span className="text-xs font-medium"> 67.81% </span>
              </div>
            </article>
          </div>
          <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center">
            <article className="flex max-md:flex-col items-end justify-between rounded-lg gap-4">
              <div>
                <p className="text-sm text-gray-500">Products</p>
                <p className="text-2xl font-medium text-gray-900">
                  {products.length}
                </p>
              </div>
              <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                <span className="text-xs font-medium"> {products.length} </span>
              </div>
            </article>
          </div>
          <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center">
            <article className="flex max-md:flex-col items-end justify-between rounded-lg gap-4">
              <div>
                <p className="text-sm text-gray-500">Images</p>
                <p className="text-2xl font-medium text-gray-900">
                  {totalImagesCount}
                </p>
              </div>
              <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5V12a9 9 0 0118 0v4.5M12 19.5v2.25M8.25 22.5h7.5M12 4.5v9"
                  />
                </svg>
                <span className="text-xs font-medium">
                  {" "}
                  {totalImagesCount}{" "}
                </span>
              </div>
            </article>
          </div>
          <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center">
            <article className="flex max-md:flex-col items-end justify-between rounded-lg gap-4">
              <div>
                <p className="text-sm text-gray-500">Categories</p>
                <p className="text-2xl font-medium text-gray-900">
                  {categories.length}
                </p>
              </div>
              <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3.75l3 6.75 7.5 1.125-5.625 5.5 1.25 7.5-6.625-3.5-6.625 3.5 1.25-7.5L1.5 11.625 9 10.5l3-6.75z"
                  />
                </svg>
                <span className="text-xs font-medium">
                  {" "}
                  {categories.length}{" "}
                </span>
              </div>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
