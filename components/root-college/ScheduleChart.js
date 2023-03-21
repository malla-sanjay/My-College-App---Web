import React from "react";
import tw from "tailwind-styled-components";

// Custom styled components using Tailwind CSS
const ChartContainer = tw.div`w-full max-w-screen-lg mx-auto flex flex-col items-center`;
const ChartTitle = tw.h1`text-3xl font-bold my-4`;
const ChartBarContainer = tw.div`w-full bg-gray-200 rounded-lg overflow-hidden`;
const ChartBar = tw.div`h-8 flex items-center px-2`;
const ChartBarLabel = tw.div`w-1/3`;
const ChartBarGraph = tw.div`w-2/3 h-full flex items-center bg-green-400`;

// React component that displays a bar chart for the number of scheduled classes for each day of the week
function ScheduleChart({ data }) {
  // Function to count the number of scheduled classes for each day of the week
  const scheduledClasses = [0, 0, 0, 0, 0, 0, 0];
  data.forEach((classData) => {
    const dayOfWeek = classData.dayOfWeek;
    switch (dayOfWeek) {
      case "Sunday":
        scheduledClasses[0]++;
        break;
      case "Monday":
        scheduledClasses[1]++;
        break;
      case "Tuesday":
        scheduledClasses[2]++;
        break;
      case "Wednesday":
        scheduledClasses[3]++;
        break;
      case "Thursday":
        scheduledClasses[4]++;
        break;
      case "Friday":
        scheduledClasses[5]++;
        break;
      case "Saturday":
        scheduledClasses[6]++;
        break;
      default:
        break;
    }
  });

  const maxClasses = Math.max(...scheduledClasses);

  return (
    <ChartContainer>
      <ChartTitle>Number of Classes Scheduled This Week</ChartTitle>
      <ChartBarContainer>
        {scheduledClasses.map((numClasses, index) => (
          <ChartBar key={index}>
            <ChartBarLabel>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index]}
            </ChartBarLabel>
            <ChartBarGraph
              style={{ width: `${(numClasses / maxClasses) * 100}%` }}
            />
            <div>{numClasses}</div>
          </ChartBar>
        ))}
      </ChartBarContainer>
    </ChartContainer>
  );
}

export default ScheduleChart;
