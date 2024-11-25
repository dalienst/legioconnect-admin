import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>LegioConnect</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
