export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/users/:path*",
    "/reports/:path*",
    "/deletion-requests/:path*",
    "/verses/:path*",
  ],
};
