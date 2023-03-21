import React from "react";
import Image from "next/image";

const NoDataCard = () => {
  return (
    <>
      <div className="pr-4 pl-10 pb-4 mb-4 bg-gray-800 rounded-2xl">
        <div className="flex justify-between ">
          <div className="text-3xl font-semibold text-zinc-200 font-mono mt-6 mb-2 pl-4 pr-40">
            No data entries found. Try entering new data
          </div>
        </div>
      </div>
    </>
  );
};

export default NoDataCard;
