import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import Header from "@/components/global_components/Header";
import Sidebar from "@/components/global_components/Sidebar";
import { useEffect } from "react";
import EventsView from "@/components/root-college/EventsView";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Using this homepage for testing
const Home = () => {
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
      <Sidebar />
      <Header />
      <div className="page-content">
        <EventsView />
      </div>
    </>
  );
};

export default Home;
