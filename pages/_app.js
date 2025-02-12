import "../styles/globals.css";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout isAdmin={pageProps.isAdmin}> {/* ✅ Pass isAdmin */}
      <Component {...pageProps} />
    </Layout>
  );
}
