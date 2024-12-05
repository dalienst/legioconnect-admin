import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
