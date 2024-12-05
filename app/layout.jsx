"use client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "@/providers/NextAuthProvider";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import BootstrapClient from "@/providers/BootstrapClient";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>LegioConnect</title>
        <meta
          name="description"
          content="LegioConnect is an application created for members of Legio Maria and those interested in learning more about the faith. It offers rich content on Legio Maria’s history, prayers, and the Bible, for deeper engagement with the faith."
        />
      </head>
      <body>
        <Toaster position="top-right" />
        <NextAuthProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </NextAuthProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}
