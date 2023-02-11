import React from "react";
import Image from "next/image";
import style from "@/styles/components/Sidebar.module.css";
import Link from "next/link";
import { FaBook } from "react-icons/fa";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useState, useEffect } from "react";

const Sidebar = () => {
  //Logout function to clear local storage
  const [admin, setAdmin] = useState("Admin");

  useEffect(() => {
    setAdmin(localStorage.getItem("admin"));
  });

  return (
    <div className={style.sidebar}>
      <div className={style.admin}>
        <Image src="/Admin.png" alt="admin" height={51} width={51} />
        <div className={style.admin_label}>
          <Link href="/settings">{admin}</Link>
        </div>
      </div>

      <div className={style.pages}>
        <div className={style.overview}>
          <Image src="/overview.png" alt="logout" height={25} width={25} />
          <Link href="/" className={style.label}>
            Overview
          </Link>
        </div>
        <div className={style.manage}>
          <Image src="/manage.png" alt="manage" height={30} width={32} />
          <Link href="/manage" className={style.label}>
            Manage
          </Link>
        </div>
        <div className={style.classes}>
          <IconContext.Provider value={{ size: "25px" }}>
            <div>
              <FaBook />
            </div>
          </IconContext.Provider>
          <Link href="/schedules/classes" className={style.label}>
            Classes
          </Link>
        </div>
        <div className={style.events}>
          <IconContext.Provider value={{ size: "25px" }}>
            <div>
              <BsFillCalendarEventFill />
            </div>
          </IconContext.Provider>
          <Link href="/schedules/events" className={style.label}>
            Events
          </Link>
        </div>
        <div className={style.settings}>
          <Image src="/settings.png" alt="settings" height={24} width={24} />
          <Link href="/settings" className={style.label}>
            Settings
          </Link>
        </div>
      </div>

      <div className={style.logout}>
        <Image src="/logout.png" alt="logout" height={16} width={18} />
        <Link
          onClick={() => localStorage.clear()}
          href="/login"
          className={style.label}
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
