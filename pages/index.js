import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/global_components/Header";
import Sidebar from "@/components/global_components/Sidebar";

//Using this homepage for testing
export default function Home() {
  return (
    <>
      <Sidebar />
      <Header />
    </>
  );
}
