import React from "react";
import { PieChart } from "react-minimal-pie-chart";

function PieChartSchedule({ scheduleData }) {
  function countClasses(scheduleData) {
    // Get the current day of the week and time
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const currentTime = currentDate.getTime();

    // Initialize counters for scheduled and completed classes
    let scheduledCount = 0;
    let completedCount = 0;

    // Loop through each class session in the schedule data
    scheduleData.forEach(function (session) {
      // Check if the session is scheduled for the current day
      if (session.dayOfWeek === currentDay) {
        scheduledCount++;

        // Parse the starting time into hours and minutes
        const [time, meridian] = session.startingTime.split(" ");
        const [hours, minutes] = time.split(":").map(Number);
        const militaryHours =
          hours + (meridian === "PM" && hours !== 12 ? 12 : 0);

        // Calculate the end time of the session
        const endTime = new Date(currentDate);
        endTime.setHours(militaryHours);
        endTime.setMinutes(minutes + parseInt(session.duration));
        endTime.setSeconds(0);
        endTime.setMilliseconds(0);

        // Check if the session has already ended
        if (currentTime >= endTime.getTime()) {
          completedCount++;
        }
      }
    });

    return { scheduledCount, completedCount };
  }

  const { scheduledCount, completedCount } = countClasses(scheduleData);
  const remainingCount = scheduledCount - completedCount;
  const data = [
    { value: completedCount, color: "#2ecc71" },
    { value: remainingCount, color: "#ecf0f1" },
  ];

  return (
    <div style={{ height: "250px", width: "400px", marginLeft: "16px" }}>
      <h1 className="font-bold text-3xl mt-4 mb-5"> Classes for Today:</h1>
      <PieChart
        data={data}
        lineWidth={25}
        startAngle={270}
        totalValue={scheduledCount}
        label={({ dataEntry }) => `${dataEntry.value}`}
        labelStyle={{ fontSize: "16px", fontWeight: "bold" }}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <div style={{ marginRight: "20px" }}>
          <div
            style={{
              backgroundColor: "#2ecc71",
              width: "20px",
              height: "20px",
              borderRadius: "10px",
              display: "inline-block",
              marginRight: "5px",
            }}
          ></div>
          Completed classes: {completedCount}
        </div>
        <div>
          <div
            style={{
              backgroundColor: "#ecf0f1",
              width: "20px",
              height: "20px",
              borderRadius: "10px",
              display: "inline-block",
              marginRight: "5px",
            }}
          ></div>
          Remaining classes: {remainingCount}
        </div>
      </div>
    </div>
  );
}

export default PieChartSchedule;
