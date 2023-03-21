import React from "react";
import ManageBlock from "./ManageBlock";
import ManageCapacity from "./ManageCapacity";
import ManageClassroom from "./ManageClassroom";
import ManageFaculty from "./ManageFaculty";
import ManageModule from "./ManageModule";
import ManageStudentGroup from "./ManageStudentGroup";
import ManageTeachers from "./ManageTeachers";

const ManageContent = ({ tab }) => {
  switch (tab) {
    case 1:
      return (
        <div className="h-full">
          <ManageBlock />
        </div>
      );
    case 2:
      return (
        <div className="h-full">
          <ManageModule />
        </div>
      );
    case 3:
      return (
        <div className="h-full">
          <ManageFaculty />
        </div>
      );
    case 4:
      return (
        <div className="h-full">
          <ManageTeachers />
        </div>
      );
    case 5:
      return (
        <div className="h-full">
          <ManageClassroom />
        </div>
      );
    case 6:
      return (
        <div className="h-full">
          <ManageCapacity />
        </div>
      );
    case 7:
      return (
        <div className="h-full">
          <ManageStudentGroup />
        </div>
      );
    default:
      console.log("Value is not between 1 and 7, defaulting to 1");
      return <h1>value is default 1</h1>;
  }
};
export default ManageContent;
