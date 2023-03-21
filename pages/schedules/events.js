/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Header from "@/components/global_components/Header";
import Sidebar from "@/components/global_components/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventsCard from "@/components/events-college/EventsCard";
import NoDataCard from "@/components/manage-college/datacards/NoDataCard";

const events = () => {
  const [events, setEvents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [filterType, setFilterType] = useState("ascending");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDetails, setEventDetails] = useState({
    title: "",
    faculty: "All",
    description: "",
  });

  const [refresh, setRefresh] = useState(true);

  const refreshData = () => {
    console.log("the page was refreshed");
    setRefresh(!refresh);
  };

  const getAllEvents = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/filesystem/events/${localStorage.getItem("id")}`
      );
      const data = await response.json();
      if (data.error) {
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
      setEvents(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getFaculties = async () => {
    try {
      const college_id = localStorage.getItem("id");
      const response = await fetch("http://localhost:5000/faculty/getFaculty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ college_id }),
      });
      const facultiesData = await response.json();
      setFaculties(facultiesData.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEvent = async (id) => {
    const response = await fetch(
      `http://localhost:5000/filesystem/events/${localStorage.getItem(
        "id"
      )}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
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

  const addEvent = async () => {
    try {
      if (
        !eventDetails.title.trim() ||
        !selectedDate ||
        !selectedDate instanceof Date ||
        isNaN(selectedDate.getTime()) ||
        !eventDetails.faculty.trim() ||
        !eventDetails.description.trim()
      ) {
        toast.error("Invalid Credentials", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      const id = Math.random().toString(36).slice(2, 7);
      const response = await fetch(
        `http://localhost:5000/filesystem/events/${localStorage.getItem("id")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id,
            title: eventDetails.title,
            date: selectedDate.toISOString(),
            description: eventDetails.description,
            faculty: eventDetails.faculty,
          }),
        }
      );

      const result = await response.json();
      if (result.error) {
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
      toast.error("SERVER ERROR", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err);
    }
  };

  //Onchange function to interract with form
  const onChange = (e) => {
    setEventDetails({
      ...eventDetails,
      [e.target.name]: e.target.value,
    });
    console.log(eventDetails);
  };

  const filter = (filterType) => {
    let sortedEvents = [...events]; // create a new array based on the current events state
    if (filterType === "ascending") {
      sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filterType === "descending") {
      sortedEvents.sort((a, b) => b.title.localeCompare(a.title));
    } else if (filterType === "newest") {
      sortedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (filterType === "oldest") {
      sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      sortedEvents = [];
    }
    return sortedEvents;
  };

  const cards = () => {
    try {
      if (events.length === 0) {
        return <NoDataCard />;
      } else {
        const filteredEvents = filter(filterType);
        return filteredEvents.map((data) => {
          return (
            <EventsCard
              removeEntry={deleteEvent}
              key={data.id}
              id={data.id}
              data1={data.title}
              data2={data.faculty}
              data3={data.date}
              data4={data.description}
            />
          );
        });
      }
    } catch (err) {
      console.log(err);
      console.log("redirected from manage tab");
    }
  };

  useEffect(() => {
    getAllEvents();
    getFaculties();
  }, [refresh]);

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
      <div className="page-content bg-white rounded-lg">
        <div className="h-[700px] w-full flex bg-inherit rounded-lg">
          <div className="w-7/12">
            <div className="flex flex-row">
              <h1 className="text-3xl font-semibold m-4 ml-8 ">Events : </h1>
              <select
                name="filter"
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  console.log(filterType);
                  refreshData();
                }}
                className="text-base m-3 bg-slate-200"
              >
                <option value="ascending">ASC</option>
                <option value="descending">DESC</option>
                <option value="newest">LATEST</option>
                <option value="oldest">OLDEST</option>
              </select>
            </div>

            <div className="m-3 ml-6 h-[600px] p-4 rounded-2xl overflow-auto">
              {cards()}
            </div>
          </div>
          <div className="m-3 p-4">
            <form className=" mt-12 ml-12 flex flex-col">
              <h1 className=" text-2xl font-semibold mb-5">
                Post Event/Announcement
              </h1>

              <label htmlFor="title" className="text-xl font-semibold mb-2">
                Title
              </label>
              <input
                size="30"
                className="text-xl p-2 bg-purple-100 mb-2"
                type="text"
                name="title"
                id="title"
                value={eventDetails.title}
                placeholder="Title of Event/Announcement"
                onChange={(e) => {
                  onChange(e);
                }}
              />
              <label htmlFor="date" className="text-xl font-semibold mb-2">
                Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
                isClearable
                showYearDropdown
                scrollableYearDropdown
                name="date"
                yearDropdownItemNumber={15}
                className="w-[350px] text-xl border-slate-700 p-2 bg-slate-100 rounded-lg mb-2"
              />
              <label htmlFor="faculty" className="text-xl font-semibold mb-2">
                Faculty
              </label>
              <select
                name="faculty"
                value={eventDetails.faculty}
                onChange={(e) => {
                  onChange(e);
                }}
                className="text-xl p-2  bg-purple-100 mb-2"
              >
                <option value="All">All</option>
                {faculties.map((data) => {
                  return (
                    <option key={data.faculty_id} value={data.faculty_id}>
                      {data.faculty_id}
                    </option>
                  );
                })}
              </select>
              <label
                htmlFor="description"
                className="text-xl font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                className="text-xl p-2 bg-purple-100 h-30 mb-2"
                name="description"
                id="description"
                rows="3"
                value={eventDetails.description}
                placeholder="Event Description here"
                onChange={(e) => {
                  onChange(e);
                }}
              />

              <button
                type="button"
                className="w-full px-3 py-4 mt-6 text-white bg-slate-700 rounded-md focus:bg-slate-800 focus:outline-none"
                onClick={addEvent}
              >
                Post Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default events;
