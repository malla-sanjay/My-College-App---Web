/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Header from "@/components/global_components/Header";
import Sidebar from "@/components/global_components/Sidebar";
import Table from "@/components/classes-college/Table";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddClassModal from "@/components/classes-college/AddClassModal";

const classes = () => {
  const [classes, setClasses] = useState([]);
  const [currentDay, setCurrentDay] = useState("Sunday");
  const [filteredData, setFilteredData] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const [refresh, setRefresh] = useState(true);

  const refreshData = () => {
    console.log("the page was refreshed");
    setRefresh(!refresh);
  };

  const filterClasses = (dayOfWeek) => {
    let filtered_arr = classes;
    if (dayOfWeek === "ALL") {
      return filtered_arr;
    } else {
      return filtered_arr.filter((item) => item.dayOfWeek === dayOfWeek);
    }
  };

  const getClasses = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/filesystem/classes/${localStorage.getItem("id")}`
      );
      const result = await response.json();
      console.log(result.data);
      setClasses(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getClasses();
    //sets the filtered data to data returned from filtered
    setFilteredData(filterClasses(currentDay));
  }, [refresh]);

  const onDelete = async (id) => {
    console.log("delete");
    const response = await fetch(
      `http://localhost:5000/filesystem/classes/${localStorage.getItem(
        "id"
      )}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    console.log(result);
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
      refreshData();
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

  const closeModal = () => {
    setDisplayModal("false");
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
      <Header />
      <Sidebar />

      <div className="page-content bg-violet-600 rounded-lg">
        <div className="w-full flex mt-3 justify-between mb-4">
          <div>
            <label className="font-semibold text-xl m-3"> Filter:</label>
            <select
              name="filter"
              value={currentDay}
              onChange={(e) => {
                setCurrentDay(e.target.value);
                console.log(currentDay);
                refreshData();
              }}
              className="text-base m-3 text-xl bg-slate-200"
            >
              <option value={"ALL"}>ALL</option>
              {dayOfWeek.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
              ;
            </select>
          </div>
          <button
            className="bg p-2 m-2 mr-5 font-semibold text-xl rounded-lg bg-fuchsia-500 transition-colors duration-200 ease-in-out hover:bg-fuchsia-600 active:bg-fuchsia-400focus:outline-none"
            onClick={() => {
              setDisplayModal(true);
            }}
          >
            + Add Schedule
          </button>
        </div>
        <Table
          data={filteredData}
          refreshData={refreshData}
          onDelete={onDelete}
        />
        {displayModal ? (
          <AddClassModal
            dayOfWeek={dayOfWeek}
            refreshData={refreshData}
            closeModal={setDisplayModal}
          />
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default classes;
