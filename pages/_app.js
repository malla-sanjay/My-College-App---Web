import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  //Checks if user is logged in or not
  useEffect(() => {
    //Token verify func
    const tokenIsValid = async () => {
      const response = await fetch(
        "http://localhost:5000/authentication/verify",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
      //if error is true it means token expired hence pushed to login
      if (data.error) {
        router.push("http://localhost:3000/login");
      }
    };

    if (
      !(
        window.location.pathname == "/login" ||
        window.location.pathname == "/signup" ||
        window.location.pathname == "/forgotPassword"
      )
    ) {
      //to avoid user to directly navigate other pages without logging in
      if (!localStorage["authenticated"]) {
        router.push("http://localhost:3000/login");
      } else {
        //redirect user again to login page when token expires
        tokenIsValid();
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
