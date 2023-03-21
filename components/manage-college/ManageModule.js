import React from "react";
import { useState, useEffect } from "react";
import DataCard3 from "./datacards/DataCard3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoDataCard from "./datacards/NoDataCard";

const ManageModule = () => {
  //Modules data get stored here
  const [modules, setModules] = useState([]);

  //Refresh usestate to trigger useeffect
  const [refresh, setRefresh] = useState(true);

  //refresh data function after crud operations
  const refreshData = () => {
    setRefresh(!refresh);
  };

  //Usestates for block obj
  const [moduleDetails, setModuleDetails] = useState({
    module_id: "",
    module_name: "",
    module_credits: "",
  });

  //Onchange function to interract with form
  const onChange = (e) => {
    setModuleDetails({ ...moduleDetails, [e.target.name]: e.target.value });
  };

  //add block functoin
  const addModule = async (e) => {
    e.preventDefault();
    try {
      const body = {
        module_id: moduleDetails.module_id,
        college_id: localStorage.getItem("id"),
        module_name: moduleDetails.module_name,
        module_credits: moduleDetails.module_credits,
      };
      const response = await fetch("http://localhost:5000/module/addModule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (result.error) {
        console.log(result.message);
        toast.error(result.message, {
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
        toast.success(result.message, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        //rerender the component
        refreshData();
      }
    } catch (err) {
      toast.error("Server Issue", {
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

  //remove block function
  const removeEntry = async (id) => {
    const response = await fetch("http://localhost:5000/module/deleteModule", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ module_id: id }),
    });

    const result = await response.json();
    if (result.error) {
      console.log(result.message);
      toast.error(result.message, {
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
      toast.success(result.message, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //rerenders the component
      refreshData();
    }
  };

  useEffect(() => {
    //function to get all block and set it to modules
    const getModule = async () => {
      try {
        const college_id = localStorage.getItem("id");
        const response = await fetch("http://localhost:5000/module/getModule", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({ college_id }),
        });
        const Data = await response.json();

        setModules(Data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getModule();
  }, [refresh]);

  const cards = () => {
    try {
      if (modules.length === 0) {
        return <NoDataCard />;
      } else {
        return modules.map((row) => {
          return (
            <DataCard3
              key={row.module_id}
              removeEntry={removeEntry}
              id={row.module_id}
              data1={row.module_name}
              data2={`Credits: ${row.module_credits}`}
              data3={row.module_id}
            />
          );
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
      <div className="w-full h-[640px] flex">
        <div className="w-7/12 m-3 h-[600px] p-4 rounded-2xl overflow-auto">
          {cards()}
        </div>
        <div className="w-5/12 h-5/6 m-3 p-4 rounded-2xl">
          <form className=" p-12 py-0 update account flex flex-col">
            <h1 className=" text-2xl font-semibold mb-6">Add Module</h1>
            <label htmlFor="module_id" className="text-xl font-normal mb-3">
              Module ID
            </label>
            <input
              className="text-xl p-2 bg-purple-100 mb-2"
              type="text"
              name="module_id"
              id="module_id"
              value={moduleDetails.module_id}
              placeholder="ID for Module"
              onChange={(e) => {
                onChange(e);
              }}
            />
            <label htmlFor="module_name" className="text-xl font-normal mb-3">
              Module Name
            </label>
            <input
              className="text-xl p-2 bg-purple-100"
              type="text"
              name="module_name"
              id="module_name"
              value={moduleDetails.module_name}
              placeholder="Name of Module"
              onChange={(e) => {
                onChange(e);
              }}
            />
            <label
              htmlFor="module_credits"
              className="text-xl font-normal mb-3"
            >
              Module Credits
            </label>
            <input
              className="text-xl p-2 bg-purple-100 mb-2"
              type="text"
              name="module_credits"
              id="module_credits"
              value={moduleDetails.module_credits}
              placeholder="Credits for Module"
              onChange={(e) => {
                onChange(e);
              }}
            />
            <button
              type="button"
              onClick={addModule}
              className="w-full px-3 py-4 mt-6 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
            >
              Add New Module
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManageModule;
