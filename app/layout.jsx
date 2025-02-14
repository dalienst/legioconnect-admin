"use client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "@/providers/NextAuthProvider";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import BootstrapClient from "@/providers/BootstrapClient";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>LegioConnect</title>
        <meta
          name="description"
          content="LegioConnect is an application for members of Legio Maria and those interested in learning more about the faith. It offers rich content on Legio Maria’s history, prayers, and the Bible, for deeper engagement with the faith."
        />
        <meta
          name="keywords"
          content="Legio Maria, LegioConnect, Catholic app, prayers, Bible, faith, Catholic community, religious history"
        />
        <meta property="og:title" content="LegioConnect" />
        <meta
          property="og:description"
          content="LegioConnect is an app that provides in-depth content for Legio Maria members and those seeking to learn more about the faith."
        />
        <meta property="og:url" content="https://www.legioconnect.com" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://www.legioconnect.com",
              "name": "LegioConnect",
              "description": "LegioConnect is an app for members of Legio Maria and faith learners, providing rich content on history, prayers, and the Bible.",
              "publisher": {
                "@type": "Organization",
                "name": "LegioConnect",
                "url": "https://www.legioconnect.com"
              }
            }
          `}
        </script>
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
