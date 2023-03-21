import React, { useState, useEffect } from "react";
import Header from "@/components/global_components/Header";
import Sidebar from "@/components/global_components/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoDataCard from "@/components/manage-college/datacards/NoDataCard";
import EventsCardHome from "./EventsCardHome";
import ScheduleChart from "./ScheduleChart";
import PieChartSchedule from "./PieChartSchedule";

const EventsView = () => {
  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState("newest");
  const [classes, setClasses] = useState([]);
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
            <EventsCardHome
              key={data.id}
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
    getClasses();
  }, [refresh]);

  return (
    <>
      <div className=" bg-white w-full rounded-lg flex">
        <div className="h-[700px] w-5/12 flex flex-col bg-inherit rounded-lg">
          <div className="flex flex-row  mt-3">
            <h1 className="text-3xl font-semibold m-3 ml-8 ">Events : </h1>
            <select
              name="filter"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                console.log(filterType);
                refreshData();
              }}
              className="text-base m-3 bg-slate-200 w-36"
            >
              <option value="newest">LATEST</option>
              <option value="ascending">ASC</option>
              <option value="descending">DESC</option>

              <option value="oldest">OLDEST</option>
            </select>
          </div>
          <div className="m-3 ml-6 h-[600px] p-4 rounded-2xl overflow-auto">
            {cards()}
          </div>
        </div>
        <div className="m-4 ml-12">
          <ScheduleChart data={classes} />
          <PieChartSchedule scheduleData={classes} />
        </div>
      </div>
    </>
  );
};

export default EventsView;
