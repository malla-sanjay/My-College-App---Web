import { initScriptLoader } from "next/script";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddClassModal = ({ dayOfWeek, closeModal, refreshData }) => {
  //useStates for retrieve
  const [blocks, setBlocks] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [studentGroups, setStudentGroups] = useState([]);
  const [modules, setModules] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const durations = ["1 Hours", "1.5 Hours", "2 Hours"];

  //Object that contains all fields key value pair
  const [classSchedule, setClassSchedule] = useState({
    id: Math.random().toString(36).slice(2, 7),
    dayOfWeek: "Monday",
    startingTime: "7:00 AM",
    duration: "1 Hours",
    block: "",
    classroom: "",
    group: "",
    module: "",
    teacher: "",
    faculty: "",
  });

  //dummy object
  const initialSchedule = {
    block: "",
    classroom: "",
    group: "",
    module: "",
    teacher: "",
    faculty: "",
  };

  //initializes the schedule
  const initialize = (initialSchedule) => {
    setClassSchedule({
      ...classSchedule,
      block: initialSchedule.block,
      classroom: initialSchedule.classroom,
      group: initialSchedule.group,
      module: initialSchedule.module,
      teacher: initialSchedule.teacher,
      faculty: initialSchedule.faculty,
    });
  };

  const handleAddClass = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/filesystem/classes/${localStorage.getItem(
          "id"
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(classSchedule),
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
        closeModal(false);
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

  const handleCancel = () => {
    console.log(classSchedule);
    closeModal();
  };

  const startTimes = [
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
  ];

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const getAllBlocks = async () => {
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
      const blocksData = await response.json();
      //Set the block
      setBlocks(blocksData.data);
      //set the initial value
      initialSchedule.block = blocksData.data[0].block_name;
      initialize(initialSchedule);
    } catch (err) {
      console.log(err);
      console.log("error from the blocks retrival");
    }
  };

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
      //set the initial value
      initialSchedule.classroom = data.data[0].class_name;
      initialize(initialSchedule);
    } catch (err) {
      console.log(err);
      console.log("error from classroom retrieval");
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
      initialSchedule.faculty = facultiesData.data[0].faculty_name;
      initialize(initialSchedule);
    } catch (err) {
      console.log(err);
      console.log("error from faculties");
    }
  };

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
      const data = await response.json();
      setStudentGroups(data.data);
      initialSchedule.group = data.data[0].student_group_id;
      initialize(initialSchedule);
    } catch (err) {
      console.log(err);
    }
  };

  const getTeachers = async () => {
    try {
      const college_id = localStorage.getItem("id");
      const response = await fetch("http://localhost:5000/teacher/getTeacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ college_id }),
      });
      const fetchData = await response.json();

      setTeachers(fetchData.data);
      initialSchedule.teacher = fetchData.data[0].teacher_name;
      initialize(initialSchedule);
    } catch (err) {
      console.log(err);
    }
  };

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
      initialSchedule.module = Data.data[0].module_name;
      //initialization
      initialize(initialSchedule);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setClassSchedule({
      ...classSchedule,
      [e.target.name]: e.target.value,
    });

    console.log(classSchedule);
  };

  useEffect(() => {
    //get all the data for drop down menus
    getAllBlocks();
    getClassroom();
    getFaculties();
    getStudentGroup();
    getTeachers();
    getModule();
  }, []);

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Add Class Modal"
      style={customStyles}
    >
      <div>
        <form className=" flex pt-10 ml-52 mr-52 flex-col">
          <h2 className="text-2xl font-semibold mb-2">Add Class</h2>
          <div className="flex flex-wrap justify-between">
            <div className="w-1/3 p-4 flex flex-col">
              <label htmlFor="dayOfWeek" className="text-xl font-semibold mb-2">
                Day of the week
              </label>
              <select
                name="dayOfWeek"
                value={classSchedule.dayOfWeek}
                onChange={(e) => {
                  onChange(e);
                }}
                className="text-xl p-2 bg-purple-100 mb-2"
              >
                {dayOfWeek.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-1/3 p-4 flex flex-col">
              <label
                htmlFor="startingTime"
                className="text-xl font-semibold mb-2"
              >
                Starting Time
              </label>
              <select
                name="startingTime"
                value={classSchedule.startingTime}
                onChange={(e) => {
                  onChange(e);
                }}
                className="text-xl p-2  bg-purple-100 mb-2"
              >
                {startTimes.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-1/3 p-4 flex flex-col">
              <label htmlFor="duration" className="text-xl font-semibold mb-2">
                Duration
              </label>
              <select
                name="duration"
                value={classSchedule.duration}
                onChange={(e) => {
                  onChange(e);
                }}
                className="text-xl p-2  bg-purple-100 mb-2"
              >
                {durations.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>{" "}
            </div>
            <div className="w-1/3 p-4 flex flex-col">
              <label htmlFor="block" className="text-xl font-semibold mb-2">
                Block
              </label>
              <select
                name="block"
                value={classSchedule.block}
                onChange={(e) => {
                  onChange(e);
                  console.log(classSchedule);
                }}
                className="text-xl p-2  bg-purple-100 mb-2"
              >
                {blocks.map((data) => {
                  return (
                    <option key={data.block_id} value={data.block_name}>
                      {data.block_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-1/3 p-4 flex flex-col">
              <label htmlFor="classroom" className="text-xl font-semibold mb-2">
                Classroom
              </label>
              <select
                name="classroom"
                value={classSchedule.classroom}
                onChange={(e) => {
                  onChange(e);
                }}
                className="text-xl p-2  bg-purple-100 mb-2"
              >
                {classrooms.map((data) => {
                  return (
                    <option key={data.class_id} value={data.class_name}>
                      {data.class_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-1/3 p-4 flex flex-col">
              <label htmlFor="group" className="text-xl font-semibold mb-2">
                Student Group
              </label>
              <select
                name="group"
                value={classSchedule.group}
                onChange={(e) => {
                  onChange(e);
                }}
                className="text-xl p-2  bg-purple-100 mb-2"
              >
                {studentGroups.map((data) => {
                  return (
                    <option
                      key={data.student_group_id}
                      value={data.student_group_id}
                    >
                      {data.student_group_id}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-1/3 p-4 flex flex-col">
              <label htmlFor="module" className="text-xl font-semibold mb-2">
                Module
              </label>
              <select
                name="module"
                value={classSchedule.module}
                onChange={(e) => {
                  onChange(e);
                }}
                className="text-xl p-2  bg-purple-100 mb-2"
              >
                {modules.map((data) => {
                  return (
                    <option key={data.module_id} value={data.module_name}>
                      {data.module_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-1/3 p-4 flex flex-col">
              <label htmlFor="teacher" className="text-xl font-semibold mb-2">
                Teacher
              </label>
              <select
                name="teacher"
                value={classSchedule.teacher}
                onChange={(e) => {
                  onChange(e);
                }}
                className="text-xl p-2  bg-purple-100 mb-2"
              >
                {teachers.map((data) => {
                  return (
                    <option key={data.teacher_id} value={data.teacher_name}>
                      {data.teacher_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-1/3 p-4 flex flex-col">
              <label htmlFor="faculty" className="text-xl font-semibold mb-2">
                Faculty
              </label>
              <select
                name="classroom"
                value={classSchedule.faculty}
                onChange={(e) => {
                  onChange(e);
                }}
                className="text-xl p-2  bg-purple-100 mb-2"
              >
                {faculties.map((data) => {
                  return (
                    <option key={data.faculty_id} value={data.faculty_name}>
                      {data.faculty_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="w-full px-3 py-4 mt-6 mb-2 text-white bg-slate-700 rounded-md focus:bg-slate-800 focus:outline-none"
              onClick={handleAddClass}
            >
              Add
            </button>
            <button
              type="button"
              className="w-full px-3 py-4 mt-6 mb-7 text-white bg-slate-700 rounded-md focus:bg-slate-800 focus:outline-none"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddClassModal;
