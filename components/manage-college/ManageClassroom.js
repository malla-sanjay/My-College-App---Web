import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoDataCard from "./datacards/NoDataCard";
import DataCard4 from "./datacards/DataCard4";

const ManageClassroom = () => {
  //classroom data get stored here
  const [classrooms, setClassrooms] = useState([]);

  //Refresh usestate to trigger useeffect
  const [refresh, setRefresh] = useState(true);

  //refresh data function after crud operations
  const refreshData = () => {
    setRefresh(!refresh);
  };

  //Usestates for block obj
  const [classroomDetails, setClassroomDetails] = useState({
    class_id: "",
    class_name: "",
    class_capacity: "",
    block_id: "",
  });

  //Onchange function to interract with form
  const onChange = (e) => {
    setClassroomDetails({
      ...classroomDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addClassroom = async (e) => {
    e.preventDefault();
    try {
      const body = {
        class_id: classroomDetails.class_id,
        class_name: classroomDetails.class_name,
        college_id: localStorage.getItem("id"),
        class_capacity: classroomDetails.class_capacity,
        block_id: classroomDetails.block_id,
      };
      const response = await fetch(
        "http://localhost:5000/classroom/addClassroom",
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
      "http://localhost:5000/classroom/deleteClassroom",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ class_id: id }),
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

  //options for drop down menu loaded from apis
  const [blockOptions, setBlockOptions] = useState([]);
  const [capacityOptions, setCapacityOptions] = useState([]);

  //function to load block id opitons
  const loadBlockOptions = async () => {
    try {
      const college_id = localStorage.getItem("id");
      const response = await fetch("http://localhost:5000/block/getBlocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ college_id }),
      });

      const data = await response.json();
      const blockData = [];

      data.data.map((row) => {
        blockData.push(row.block_id);
      });

      setBlockOptions(blockData);
    } catch (err) {
      console.log(err);
    }
  };

  //option for capacities loaded using api
  const loadCapacityOptions = async () => {
    try {
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

      const data = await response.json();
      const capacityData = [];

      data.data.map((row) => {
        capacityData.push(row.capacity_code);
      });

      setCapacityOptions(capacityData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //function to get all block and set it to classrooms
    const getClassroom = async () => {
      try {
        const college_id = localStorage.getItem("id");
        const response = await fetch(
          "http://localhost:5000/classroom/getClassroom",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
            body: JSON.stringify({ college_id }),
          }
        );
        const data = await response.json();
        setClassrooms(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    //setting necessary data by calling the function
    getClassroom();
    loadBlockOptions();
    loadCapacityOptions();
  }, [refresh]);

  const cards = () => {
    try {
      if (classrooms.length === 0) {
        return <NoDataCard />;
      } else {
        return classrooms.map((row) => {
          return (
            <DataCard4
              key={row.class_id}
              removeEntry={removeEntry}
              id={row.class_id}
              data1={row.class_name}
              data3={`Class ID: ${row.class_id}`}
              data2={`Size: ${row.class_capacity}`}
              data4={`Block ID: ${row.block_id}`}
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
            <h1 className=" text-2xl font-semibold mb-6">Add Classroom</h1>
            <label htmlFor="class_id" className="text-xl font-normal mb-3">
              Classroom ID
            </label>
            <input
              className="text-xl p-2 bg-purple-100 mb-2"
              type="text"
              name="class_id"
              id="class_id"
              value={classroomDetails.class_id}
              placeholder="ID for Classroom"
              onChange={(e) => {
                onChange(e);
              }}
            />
            <label htmlFor="class_name" className="text-xl font-normal mb-3">
              Name of Classroom
            </label>
            <input
              className="text-xl p-2 bg-purple-100 mb-2"
              type="text"
              name="class_name"
              id="class_name"
              value={classroomDetails.class_name}
              placeholder="Name of classroom"
              onChange={(e) => {
                onChange(e);
              }}
            />

            <label htmlFor="class_name" className="text-xl font-normal mb-3">
              Block ID
            </label>
            <select
              name="block_id"
              value={classroomDetails.block_id}
              onChange={(e) => {
                onChange(e);
              }}
              className="text-xl p-2  bg-purple-100 mb-2"
            >
              <option value="">--Select Block--</option>
              {blockOptions.map((block_id) => {
                return (
                  <option key={block_id} value={block_id}>
                    {block_id}
                  </option>
                );
              })}
            </select>
            <label
              htmlFor="class_capacity"
              className="text-xl font-normal mb-3"
            >
              Classroom Capacity
            </label>
            <select
              name="class_capacity"
              value={classroomDetails.class_capacity}
              onChange={(e) => {
                onChange(e);
              }}
              className="text-xl p-2  bg-purple-100 mb-2"
            >
              <option value="">--Select Capacity--</option>
              {capacityOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>

            <button
              type="button"
              onClick={addClassroom}
              className="w-full px-3 py-4 mt-6 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
            >
              Add New Classroom
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManageClassroom;
