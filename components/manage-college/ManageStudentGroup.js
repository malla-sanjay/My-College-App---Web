import React from "react";
import { useState, useEffect } from "react";
import DataCard3 from "./datacards/DataCard3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoDataCard from "./datacards/NoDataCard";

const ManageStudentGroup = () => {
  //studentGroup data get stored here
  const [studentGroups, setStudentGroups] = useState([]);

  //Refresh usestate to trigger useeffect
  const [refresh, setRefresh] = useState(true);

  //refresh data function after crud operations
  const refreshData = () => {
    setRefresh(!refresh);
  };

  //Usestates for block obj
  const [studentGroupDetails, setStudentGroupDetails] = useState({
    student_group_id: "",
    college_grade: "",
    no_of_students: "",
  });

  //Onchange function to interract with form
  const onChange = (e) => {
    setStudentGroupDetails({
      ...studentGroupDetails,
      [e.target.name]: e.target.value,
    });
  };

  //add block functoin
  const addStudentGroup = async (e) => {
    e.preventDefault();
    try {
      const body = {
        student_group_id: studentGroupDetails.student_group_id,
        college_grade: studentGroupDetails.college_grade,
        college_id: localStorage.getItem("id"),
        no_of_students: studentGroupDetails.no_of_students,
      };
      const response = await fetch(
        "http://localhost:5000/studentGroup/addStudentGroup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(body),
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

  const removeEntry = async (id) => {
    const response = await fetch(
      "http://localhost:5000/studentGroup/deleteStudentGroup",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ student_group_id: id }),
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
    //function to get all block and set it to studentGroups
    const getStudentGroup = async () => {
      try {
        const college_id = localStorage.getItem("id");
        const response = await fetch(
          "http://localhost:5000/studentGroup/getStudentGroup",
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
        setStudentGroups(facultiesData.data);
      } catch (err) {
        console.log(err);
        router.push("http://localhost:3000/login");
      }
    };
    getStudentGroup();
  }, [refresh]);

  const cards = () => {
    try {
      if (studentGroups.length === 0) {
        return <NoDataCard />;
      } else {
        return studentGroups.map((row) => {
          return (
            <DataCard3
              key={row.student_group_id}
              removeEntry={removeEntry}
              id={row.student_group_id}
              data1={row.college_grade}
              data3={row.student_group_id}
              data2={`No of Students: ${row.no_of_students}`}
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
            <h1 className=" text-2xl font-semibold mb-6">Add Student Groups</h1>
            <label
              htmlFor="student_group_id"
              className="text-xl font-normal mb-3"
            >
              Student Group ID
            </label>
            <input
              className="text-xl p-2 bg-purple-100 mb-2"
              type="text"
              name="student_group_id"
              id="student_group_id"
              value={studentGroupDetails.student_group_id}
              placeholder="ID for Faculty"
              onChange={(e) => {
                onChange(e);
              }}
            />
            <label htmlFor="college_grade" className="text-xl font-normal mb-3">
              College Grade
            </label>
            <select
              name="college_grade"
              value={studentGroupDetails.college_grade}
              onChange={(e) => {
                onChange(e);
              }}
              className="text-xl p-2  bg-purple-100 mb-2"
            >
              <option value="">--Select Student Year--</option>
              <option value="Year 1">Year 1</option>
              <option value="Year 2">Year 2</option>
              <option value="Year 3">Year 3</option>
            </select>
            <label
              htmlFor="no_of_students"
              className="text-xl font-normal mb-3"
            >
              No of Students
            </label>
            <input
              className="text-xl p-2 bg-purple-100 mb-2"
              type="number"
              name="no_of_students"
              id="no_of_students"
              value={studentGroupDetails.no_of_students}
              placeholder="Number of Students"
              onChange={(e) => {
                onChange(e);
                console.log(studentGroupDetails);
              }}
            />

            <button
              type="button"
              onClick={addStudentGroup}
              className="w-full px-3 py-4 mt-6 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
            >
              Add New Student Group
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManageStudentGroup;
