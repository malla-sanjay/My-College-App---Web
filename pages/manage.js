import React, { useState, useEffect } from "react";
import styles from "@/styles/manage.module.css";
import Sidebar from "@/components/global_components/Sidebar";
import Header from "@/components/global_components/Header";
import Navigation from "@/components/manage-college/Navigation";
import ManageContent from "@/components/manage-college/ManageContent";

//importing all the possible management configurations
import ManageBlock from "@/components/manage-college/ManageBlock";

const manage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tab, setTab] = useState(1);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log(tab);
  }, [tab]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-content  bg-white rounded-lg">
        <Navigation setTab={setTab} />
        <ManageContent tab={tab} />
      </div>
    </>
  );
};

export default manage;
