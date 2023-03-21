import React from "react";
import { useState, useEffect } from "react";
import DataCard2 from "./datacards/DataCard2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoDataCard from "./datacards/NoDataCard";

const ManageCapacity = () => {
  const [capacities, setCapacities] = useState([]);
  const [refresh, setRefresh] = useState(true);

  //refresh data function after crud operations
  const refreshData = () => {
    console.log("the page was refreshed");
    setRefresh(!refresh);
  };

  //Usestates for capacity obj
  const [teacherDetails, setTeacherDetails] = useState({
    capacity_code: "",
    no_of_student: "",
  });

  //Onchange function to interract with form inputs
  const onChange = (e) => {
    setTeacherDetails({ ...teacherDetails, [e.target.name]: e.target.value });
  };

  const addCapacity = async (e) => {
    e.preventDefault();
    try {
      const body = {
        capacity_code: teacherDetails.capacity_code,
        no_of_student: teacherDetails.no_of_student,
        college_id: localStorage.getItem("id"),
      };
      const response = await fetch(
        "http://localhost:5000/capacity/addCapacity",
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

  //remove block function
  const removeEntry = async (id) => {
    const response = await fetch(
      "http://localhost:5000/capacity/deleteCapacity",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ capacity_code: id }),
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
    const getCapacities = async () => {
      const college_id = localStorage.getItem("id");
      const response = await fetch(
        "http://localhost:5000/capacity/getCapacity",
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

      setCapacities(fetchData.data);
    };
    getCapacities();
  }, [refresh]);

  const cards = () => {
    try {
      if (capacities.length === 0) {
        return <NoDataCard />;
      } else {
        return capacities.map((row) => {
          return (
            <DataCard2
              key={row.capacity_code}
              removeEntry={removeEntry}
              id={row.capacity_code}
              data1={row.capacity_code}
              data2={`Student Capacity: ${row.no_of_student}`}
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
            <h1 className=" text-2xl font-semibold mb-6">Add Capacities</h1>
            <label htmlFor="capacity_code" className="text-xl font-normal mb-3">
              Capacity ID
            </label>
            <input
              className="text-xl p-2 bg-purple-100 mb-2"
              type="text"
              name="capacity_code"
              id="capacity_code"
              value={teacherDetails.capacity_code}
              placeholder="ID for Teacher"
              onChange={(e) => {
                onChange(e);
              }}
            />
            <label htmlFor="no_of_student" className="text-xl font-normal mb-3">
              Number of Students
            </label>
            <input
              className="text-xl p-2 bg-purple-100 mb-2"
              type="number"
              name="no_of_student"
              id="no_of_student"
              value={teacherDetails.no_of_student}
              placeholder="No of students"
              onChange={(e) => {
                onChange(e);
              }}
            />
            <button
              type="button"
              onClick={addCapacity}
              className="w-full px-3 py-4 mt-6 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
            >
              Add New Capacity
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManageCapacity;
