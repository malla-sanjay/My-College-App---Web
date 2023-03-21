import React from "react";
import { useState, useEffect } from "react";
import DataCard2 from "./datacards/DataCard2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoDataCard from "./datacards/NoDataCard";

const ManageTeachers = () => {
  //Blocks data get stored here
  const [teachers, setTeachers] = useState([]);

  //Refresh usestate to trigger useeffect
  const [refresh, setRefresh] = useState(true);

  //refresh data function after crud operations
  const refreshData = () => {
    console.log("the page was refreshed");
    setRefresh(!refresh);
  };

  //Usestates for block obj
  const [teacherDetails, setTeacherDetails] = useState({
    teacher_id: "",
    teacher_name: "",
  });

  //Onchange function to interract with form
  const onChange = (e) => {
    setTeacherDetails({ ...teacherDetails, [e.target.name]: e.target.value });
  };

  //add block functoin
  const addTeacher = async (e) => {
    e.preventDefault();
    try {
      const body = {
        teacher_id: teacherDetails.teacher_id,
        teacher_name: teacherDetails.teacher_name,
        college_id: localStorage.getItem("id"),
      };
      const response = await fetch("http://localhost:5000/teacher/addTeacher", {
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
      "http://localhost:5000/teacher/deleteTeacher",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ teacher_id: id }),
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
    //function to get all block and set it to teachers
    const getTeachers = async () => {
      try {
        const college_id = localStorage.getItem("id");
        const response = await fetch(
          "http://localhost:5000/teacher/getTeacher",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
            body: JSON.stringify({ college_id }),
          }
        );
        const fetchData = await response.json();

        setTeachers(fetchData.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTeachers();
  }, [refresh]);

  const cards = () => {
    try {
      if (teachers.length === 0) {
        return <NoDataCard />;
      } else {
        return teachers.map((row) => {
          return (
            <DataCard2
              key={row.teacher_id}
              removeEntry={removeEntry}
              id={row.teacher_id}
              data1={row.teacher_name}
              data2={row.teacher_id}
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
            <label htmlFor="teacher_id" className="text-xl font-normal mb-3">
              Teacher ID
            </label>
            <input
              className="text-xl p-2 bg-purple-100 mb-2"
              type="text"
              name="teacher_id"
              id="teacher_id"
              value={teacherDetails.teacher_id}
              placeholder="ID for Teacher"
              onChange={(e) => {
                onChange(e);
              }}
            />
            <label htmlFor="teacher_name" className="text-xl font-normal mb-3">
              Teacher Name
            </label>
            <input
              className="text-xl p-2 bg-purple-100 mb-2"
              type="text"
              name="teacher_name"
              id="teacher_name"
              value={teacherDetails.teacher_name}
              placeholder="Name of Teacher"
              onChange={(e) => {
                onChange(e);
              }}
            />
            <button
              type="button"
              onClick={addTeacher}
              className="w-full px-3 py-4 mt-6 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
            >
              Add New Teacher
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManageTeachers;
