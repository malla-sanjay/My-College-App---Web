import Sidebar from "@/components/global_components/Sidebar";
import Header from "@/components/global_components/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Sidebar />
      <Header />
      <Component {...pageProps} />
    </>
  );
}
