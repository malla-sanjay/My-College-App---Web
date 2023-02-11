import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import Header from "@/components/global_components/Header";
import Sidebar from "@/components/global_components/Sidebar";
import { useEffect } from "react";

//Using this homepage for testing
export default function Home({ user, token, auth }) {
  const router = useRouter();

  return (
    <>
      <Sidebar />
      <Header />
    </>
  );
}
