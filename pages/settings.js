import React from "react";
import Sidebar from "@/components/global_components/Sidebar";
import Header from "@/components/global_components/Header";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const settings = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userDetails, setUserDetails] = useState({
    college: "",
    admin: "",
    password: "",
  });

  const { college, admin, password } = userDetails;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const { current_password, new_password, confirm_password } = passwords;

  const onChangeUserForm = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const onChangePasswordForm = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const submitUserForm = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem("email");
      const passwordStatus = await fetch(
        "http://localhost:5000/authentication/checkPass",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const passwordISOK = await passwordStatus.json();
      // if password is ok user account is updated else error message toast
      if (!passwordISOK.error) {
        //post request to account and toast accordingly
        const response = await fetch(
          "http://localhost:5000/authentication/updateAccount",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
            body: JSON.stringify({ college, admin, email }),
          }
        );
        const updateStatus = await response.json();

        if (!updateStatus.error) {
          toast.success(updateStatus.message, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          //local storage update
          localStorage.setItem("college", college);
          localStorage.setItem("admin", admin);
          //page refresh
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error(updateStatus.message, {
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
      } else {
        //Expected server error
        toast.error(passwordISOK.message, {
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
      //Expected server error
      toast.error("SERVER ERROR!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err.message);
    }
  };

  const onSubmitPasswordForm = async (e) => {
    e.preventDefault();
    try {
      //check password new = password confirm
      if (new_password === confirm_password) {
        //check password correct or not
        const email = localStorage.getItem("email");
        const password = current_password;
        const response = await fetch(
          "http://localhost:5000/authentication/checkPass",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
            body: JSON.stringify({ email, password }),
          }
        );
        const passIsCorrect = await response.json();

        if (!passIsCorrect.error) {
          const response = await fetch(
            "http://localhost:5000/authentication/changePassword",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, new_password }),
            }
          );

          const passwordChanged = await response.json();
          if (!passwordChanged.error) {
            //success message
            toast.success(passwordChanged.message, {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            //error message
            toast.error(passwordChanged.message, {
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
        } else {
          //password incorrect
          toast.error(passIsCorrect.message, {
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
      } else {
        //two password dont match
        toast.error("The new passwords must match", {
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
      //Expected server error
      toast.error("SERVER ERROR!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err.message);
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
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
      <div className="page-content bg-white rounded-lg">
        <h2 className="text-3xl font-semibold px-10 py-8 text-slate-800 ">
          Settings
        </h2>
        <div className="flex justify-around">
          <form className=" p-12 py-0 w-2/5 update account h-4/5 flex flex-col mb-20">
            <h1 className=" text-2xl font-semibold mb-6">Update Account</h1>
            <label htmlFor="college" className="text-xl font-normal mb-3">
              College Name
            </label>
            <input
              className="text-xl p-2 bg-purple-100"
              type="text"
              name="college"
              id="college"
              value={college}
              onChange={(e) => onChangeUserForm(e)}
              placeholder="New College Name"
            />
            <label htmlFor="admin" className="text-xl font-normal mb-3">
              User Name
            </label>
            <input
              className="text-xl p-2 bg-purple-100"
              type="text"
              name="admin"
              id="admin"
              value={admin}
              onChange={(e) => onChangeUserForm(e)}
              placeholder="New User Name"
            />
            <label htmlFor="password" className="text-xl font-normal mb-3">
              Password
            </label>
            <input
              className="text-xl p-2 bg-purple-100"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => onChangeUserForm(e)}
              placeholder="Enter your Password"
            />
            <button
              type="button"
              className="w-full px-3 py-4 mt-6 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
              onClick={submitUserForm}
            >
              Update Account
            </button>
          </form>
          <div className="bg-gray-400 w-0.5 h-96 "></div>
          <form className=" p-12 py-0 w-2/5 update account h-4/5 flex flex-col">
            <h1 className=" text-2xl font-semibold mb-6">Change Password</h1>
            <label
              htmlFor="current_password:"
              className="text-xl font-normal mb-3"
            >
              Current Password
            </label>
            <input
              className="text-xl p-2 bg-purple-100"
              type="password"
              name="current_password"
              id="current_password"
              value={current_password}
              onChange={(e) => onChangePasswordForm(e)}
              placeholder="Enter Current Password"
            />
            <label htmlFor="new_password" className="text-xl font-normal mb-3">
              New Password
            </label>
            <input
              className="text-xl p-2 bg-purple-100"
              type="password"
              name="new_password"
              id="new_password"
              value={new_password}
              onChange={(e) => onChangePasswordForm(e)}
              placeholder="New password here"
            />
            <label
              htmlFor="confirm_password"
              className="text-xl font-normal mb-3"
            >
              Confirm
            </label>
            <input
              className="text-xl p-2 bg-purple-100"
              type="password"
              name="confirm_password"
              id="confirm_password"
              value={confirm_password}
              onChange={(e) => onChangePasswordForm(e)}
              placeholder="Re Enter the new Password"
            />
            <button
              type="button"
              onClick={onSubmitPasswordForm}
              className="w-full px-3 py-4 mt-6 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default settings;
