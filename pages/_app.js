import "../styles/globals.css";
import Layout from "../components/Layout";  // ✅ Import the Layout wrapper

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
