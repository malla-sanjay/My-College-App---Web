import React from "react";
import styles from "@/styles/manage.module.css";
import ManageOptions from "@/components/manage-college/ManageOptions";

const manage = () => {
  return (
    <>
      <div className="page">
        <div className={styles.left_container}>
          <div className={styles.database_card}></div>
        </div>
        <div className={styles.right_container}>
          <ManageOptions />
          <div className={styles.inputform}></div>
        </div>
      </div>
    </>
  );
};

export default manage;
