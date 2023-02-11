import React from "react";

const Navigation = ({ setTab }) => {
  return (
    <div className="flex justify-end p-2">
      <div className="w-7/12 flex flex-row">
        <button
          className="w-full px-3 py-2 m-1 text-white bg-violet-500 rounded-md focus:bg-indigo-800 focus:outline-none"
          onClick={() => {
            setTab(1);
          }}
        >
          Blocks
        </button>
        <button
          className="w-full px-3 py-2 m-1 text-white bg-violet-500 rounded-md focus:bg-indigo-800 focus:outline-none"
          onClick={() => {
            setTab(2);
          }}
        >
          Modules
        </button>
        <button
          className="w-full px-3 py-2 m-1 text-white bg-violet-500 rounded-md focus:bg-indigo-800 focus:outline-none"
          onClick={() => {
            setTab(3);
          }}
        >
          Faculties
        </button>
        <button
          className="w-full px-3 py-2 m-1 text-white bg-violet-500 rounded-md focus:bg-indigo-800 focus:outline-none"
          onClick={() => {
            setTab(4);
          }}
        >
          Teachers
        </button>
        <button
          className="w-full px-3 py-2 m-1 text-white bg-violet-500 rounded-md focus:bg-indigo-800 focus:outline-none"
          onClick={() => {
            setTab(5);
          }}
        >
          Classrooms
        </button>
        <button
          className="w-full px-3 py-2 m-1 text-white bg-violet-500 rounded-md focus:bg-indigo-800 focus:outline-none"
          onClick={() => {
            setTab(6);
          }}
        >
          Capacities
        </button>
        <button
          className="w-full px-3 py-2 m-1 text-white bg-violet-500 rounded-md focus:bg-indigo-800 focus:outline-none"
          onClick={() => {
            setTab(7);
          }}
        >
          Groups
        </button>
      </div>
    </div>
  );
};

export default Navigation;
