import { useDate } from "@/custom_hooks/useDate";
import style from "@/styles/components/Header.module.css";
import Image from "next/image";
import React from "react";

const Header = () => {
  const { dayAndTime, formattedDate } = useDate();
  return (
    <div className={style.header}>
      <div className={style.page_title}>Welcome to INDEX,</div>
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
