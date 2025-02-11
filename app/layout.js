import Layout from "../components/Layout"; // ✅ Import Layout

export const metadata = {
  title: "Pizza Restaurant",
  description: "Best pizza shop in town",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>  {/* ✅ Wrap content inside Layout */}
      </body>
    </html>
  );
}
