import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  //Checks if user is logged in or not
  useEffect(() => {
    if (
      !(
        window.location.pathname == "/login" ||
        window.location.pathname == "/signup" ||
        window.location.pathname == "/forgotPassword"
      )
    ) {
      if (!localStorage["authenticated"]) {
        router.push("http://localhost:3000/login");
      }
    }
  });

  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
