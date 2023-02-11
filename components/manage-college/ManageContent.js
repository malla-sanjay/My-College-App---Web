import React from "react";
import ManageBlock from "./ManageBlock";
import ManageClassroom from "./ManageClassroom";
import ManageModule from "./ManageModule";

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
      return <h1>value is 3</h1>;
    case 4:
      return <h1>value is 4</h1>;
    case 5:
      return (
        <div className="h-full">
          <ManageClassroom />
        </div>
      );
    case 6:
      return <h1>value is 6</h1>;
    case 7:
      return <h1>value is 7</h1>;
    default:
      console.log("Value is not between 1 and 7, defaulting to 1");
      return <h1>value is default 1</h1>;
  }
};
export default ManageContent;
