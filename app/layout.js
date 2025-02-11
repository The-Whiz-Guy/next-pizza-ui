"use client";  // ✅ Mark as Client Component

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>  {/* Wrap children inside <main> for better structure */}
        <Footer />
      </body>
    </html>
  );
}
