import Navbar from "./Navbar";  // ✅ Ensure correct import path
import Footer from "./Footer";  // ✅ Ensure correct import path

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
