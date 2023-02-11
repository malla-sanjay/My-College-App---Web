import React from "react";
import { useState, useEffect } from "react";
import DataCard2 from "./datacards/DataCard2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageBlock = () => {
  //Blocks data get stored here
  const [blocks, setBlocks] = useState([]);

  //Refresh usestate to trigger useeffect
  const [refresh, setRefresh] = useState(true);

  //refresh data function after crud operations
  const refreshData = () => {
    console.log("the page was refreshed");
    setRefresh(!refresh);
    console.log(refresh);
  };

  //Usestates for block obj
  const [blockDetails, setBlockDetails] = useState({
    block_id: "",
    block_name: "",
  });

  //Onchange function to interract with form
  const onChange = (e) => {
    setBlockDetails({ ...blockDetails, [e.target.name]: e.target.value });
  };

  //add block functoin
  const addBlock = async (e) => {
    e.preventDefault();
    try {
      const body = {
        block_id: blockDetails.block_id,
        block_name: blockDetails.block_name,
        college_id: localStorage.getItem("id"),
      };
      const response = await fetch("http://localhost:5000/block/addBlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      });

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
    console.log("func triggered");
    const response = await fetch("http://localhost:5000/block/deleteBlock", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ block_id: id }),
    });

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
    //function to get all block and set it to blocks
    console.log("useeffect was triggerd");
    const getAllBlocks = async () => {
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

      setBlocks(blocksData.data);
    };
    getAllBlocks();
  }, [refresh]);

  const cards = () => {
    return blocks.map((block) => {
      return (
        <DataCard2
          key={block.block_id}
          removeEntry={removeEntry}
          id={block.block_id}
          data1={block.block_name}
          data2={block.block_id}
        />
      );
    });
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
            <h1 className=" text-2xl font-semibold mb-6">Add Block</h1>
            <label htmlFor="block_id" className="text-xl font-normal mb-3">
              Block ID
            </label>
            <input
              className="text-xl p-2 bg-purple-100"
              type="text"
              name="block_id"
              id="block_id"
              value={blockDetails.block_id}
              placeholder="ID for Block"
              onChange={(e) => {
                onChange(e);
              }}
            />
            <label htmlFor="block_name" className="text-xl font-normal mb-3">
              Block Name
            </label>
            <input
              className="text-xl p-2 bg-purple-100"
              type="text"
              name="block_name"
              id="block_name"
              value={blockDetails.block_name}
              placeholder="Name of Block"
              onChange={(e) => {
                onChange(e);
              }}
            />
            <button
              type="button"
              onClick={addBlock}
              className="w-full px-3 py-4 mt-6 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
            >
              Add New Block
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManageBlock;
