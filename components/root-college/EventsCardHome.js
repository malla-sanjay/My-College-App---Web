import React from "react";
import Image from "next/image";

const EventsCardHome = ({ data1, data2, data3, data4 }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <div className="pr-4 pl-10 pb-4 mb-4 w-full bg-slate-800 rounded-2xl">
        <div className="flex justify-between ">
          <div className="text-3xl font-semibold text-zinc-200 font-mono mt-6">
            {data1}
          </div>
          <div className="text-zinc-200 font-semibold mt-7">{data2}</div>
          <div className="flex justify-end"></div>
        </div>
        <div className="text-zinc-200 font-semibold mt-1 mb-3">
          {formatDate(data3)}
        </div>
        <div className="text-zinc-200 font-semibold mt-1 mb-1">{data4}</div>
      </div>
    </>
  );
};

export default EventsCardHome;
