import React from "react";
import { useState, useEffect } from "react";
import DataCard2 from "./datacards/DataCard2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoDataCard from "./datacards/NoDataCard";

const ManageFaculty = () => {
  //Blocks data get stored here
  const [faculties, setFaculties] = useState([]);

  //Refresh usestate to trigger useeffect
  const [refresh, setRefresh] = useState(true);

  //refresh data function after crud operations
  const refreshData = () => {
    console.log("the page was refreshed");
    setRefresh(!refresh);
  };

  //Usestates for block obj
  const [facultyDetails, setFacultyDetails] = useState({
    faculty_id: "",
    faculty_name: "",
  });

  //Onchange function to interract with form
  const onChange = (e) => {
    setFacultyDetails({ ...facultyDetails, [e.target.name]: e.target.value });
  };

  //add block functoin
  const addFaculty = async (e) => {
    e.preventDefault();
    try {
      const body = {
        faculty_id: facultyDetails.faculty_id,
        faculty_name: facultyDetails.faculty_name,
        college_id: localStorage.getItem("id"),
      };
      const response = await fetch("http://localhost:5000/faculty/addFaculty", {
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
    const response = await fetch(
      "http://localhost:5000/faculty/deleteFaculty",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ faculty_id: id }),
      }
    );

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
      refreshData();
    }
  };

  useEffect(() => {
    //function to get all block and set it to faculties
    const getFaculties = async () => {
      try {
        const college_id = localStorage.getItem("id");
        const response = await fetch(
          "http://localhost:5000/faculty/getFaculty",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
            body: JSON.stringify({ college_id }),
          }
        );
        const facultiesData = await response.json();
        setFaculties(facultiesData.data);
      } catch (err) {
        console.log(err);
        router.push("http://localhost:3000/login");
      }
    };
    getFaculties();
  }, [refresh]);

  const cards = () => {
    try {
      if (faculties.length === 0) {
        return <NoDataCard />;
      } else {
        return faculties.map((row) => {
          return (
            <DataCard2
              key={row.faculty_id}
              removeEntry={removeEntry}
              id={row.faculty_id}
              data1={row.faculty_name}
              data2={row.faculty_id}
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
            <h1 className=" text-2xl font-semibold mb-6">Add Faculties</h1>
            <label htmlFor="faculty_id" className="text-xl font-normal mb-3">
              Faculty ID
            </label>
            <input
              className="text-xl p-2 bg-purple-100 mb-2"
              type="text"
              name="faculty_id"
              id="faculty_id"
              value={facultyDetails.faculty_id}
              placeholder="ID for Faculty"
              onChange={(e) => {
                onChange(e);
              }}
            />
            <label htmlFor="faculty_name" className="text-xl font-normal mb-3">
              Faculty Name
            </label>
            <input
              className="text-xl p-2 bg-purple-100 mb-2"
              type="text"
              name="faculty_name"
              id="faculty_name"
              value={facultyDetails.faculty_name}
              placeholder="Name of Faculty"
              onChange={(e) => {
                onChange(e);
              }}
            />
            <button
              type="button"
              onClick={addFaculty}
              className="w-full px-3 py-4 mt-6 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
            >
              Add New Faculty
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManageFaculty;
