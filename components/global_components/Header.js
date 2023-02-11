import { useDate } from "@/custom_hooks/useDate";
import style from "@/styles/components/Header.module.css";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Header = () => {
  const { dayAndTime, formattedDate } = useDate();
  const [college, setCollege] = useState("College Name");

  useEffect(() => {
    setCollege(localStorage.getItem("college"));
  }, []);

  return (
    <div className={style.header}>
      <div className={style.page_title}>Welcome to {college},</div>
      <div className={style.container}>
        <div className={style.seperation}>
          <div className={style.day_time}>{dayAndTime}</div>
          <div className={style.date}>{formattedDate}</div>
        </div>
        <Image src="/Logo.png" alt="App Logo" width={65} height={55} />
      </div>
    </div>
  );
};

export default Header;
