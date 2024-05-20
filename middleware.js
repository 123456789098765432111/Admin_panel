import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token);
    if (
      req.nextauth.token?.email !== process.env.NEXT_PUBLIC_EMAIL &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/products", "/categories", "/orders", "/settings"],
};
