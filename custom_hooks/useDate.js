import React from "react";

export const useDate = () => {
  const [today, setDate] = React.useState(new Date()); // Save the current date to be able to trigger an update

  React.useEffect(() => {
    const timer = setInterval(() => {
      // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 5 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    };
  }, []);

  //days of week
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  //day of the week and time
  const dayAndTime = `${
    weekday[today.getDay()]
  } ${today.getHours()}:${today.getMinutes()}`;

  const formattedDate = `${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`;

  return {
    dayAndTime,
    formattedDate,
  };
};
