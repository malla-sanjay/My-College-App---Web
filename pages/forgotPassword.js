import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Link from "next/link";
import emailjs from "emailjs-com";

const forgotPassword = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState("");
  const temp_password = Math.random().toString(36).slice(2, 7);

  const onChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const body = { email: email, new_password: temp_password };
    console.log(email);
    console.log(temp_password);
    try {
      const response = await fetch(
        "http://localhost:5000/authentication/changePassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();

      console.log(data);
      console.log(data.error);

      if (!data.error) {
        console.log("email changing here");
        await emailjs
          .send(
            "service_u694wab",
            "template_daa9arn",
            {
              password: temp_password,
              email: email,
            },
            "h3AIoE6eIVN0EsXpt"
          )
          .then(
            (result) => {
              //promise success
              toast.success(data.message, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            },
            (error) => {
              //promise failed
              console.log(error.text);
              toast.success(error.text, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          );
        console.log("finish");
      } else {
        //fetch error toast
        toast.error(data.message, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      //server error toast
      toast.error(err.message, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-500 dark:text-gray-200">
                Forgot Password?
              </h1>
              <p className="text-gray-500 dark:text-gray-300">
                Enter your account email,
              </p>
              <p className="text-gray-500 dark:text-gray-300">
                we will send a temporary password there
              </p>
            </div>
            <div className="m-7">
              <form>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => onChange(e)}
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>

                <div className="mb-6">
                  <button
                    type="button"
                    className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                    onClick={sendEmail}
                  >
                    Send Email
                  </button>
                </div>
                <p className="text-sm text-center pb-3 text-gray-400">
                  Login from another Account?{" "}
                  <Link
                    href="/login"
                    className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                  >
                    Log In
                  </Link>
                  .
                </p>
                <p className="text-sm text-center text-gray-400">
                  Or Create a New account at{" "}
                  <Link
                    href="/signup"
                    className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                  >
                    Sign up
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default forgotPassword;
