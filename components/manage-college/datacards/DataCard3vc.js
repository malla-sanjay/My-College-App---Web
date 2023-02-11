import React from "react";
import Image from "next/image";

const DataCard3vc = ({ removeEntry, id, data1, data2, data3 }) => {
  return (
    <>
      <div className="pr-4 pl-10 pb-4 mb-4 bg-indigo-900 rounded-2xl">
        <div className="flex justify-between ">
          <div className="text-3xl font-semibold text-zinc-200 font-mono mt-6">
            {data1}
          </div>
          <div className="flex justify-end">
            <button onClick={() => removeEntry(id)}>
              <Image src="/cancel.png" alt="admin" height={25} width={25} />
            </button>
          </div>
        </div>
        <div className="text-zinc-200 font-semibold text-xl pl-72 justify-center mt-1 mb-1">
          Credits: {data2}
        </div>
        <div className="text-zinc-200 font-semibold mt-1 mb-1">{data3}</div>
      </div>
    </>
  );
};

export default DataCard3vc;
