import React, { useState } from "react";

function Table({ data, onDelete }) {
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  const sortedData = data.sort((a, b) => {
    if (sortColumn) {
      const sortValue = (row) => {
        if (sortColumn === "dayOfWeek") return row.dayOfWeekIndex;
        if (sortColumn === "startingTime")
          return parseInt(row.startingTime.replace(":", ""));
        if (sortColumn === "duration") return row.duration;
        if (sortColumn === "group") return row.group;
      };

      const aValue = sortValue(a);
      const bValue = sortValue(b);

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    } else {
      return 0;
    }
  });

  const filteredData = sortedData.filter((row) =>
    row.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-auto p-2 h-[600px] bg-purple-200 rounded-lg">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center mt-3">
          <span className="mr-2 text-lg font-semibold ml-2">
            Search by group:
          </span>
          <input
            className="border border-gray-400 text-lg rounded px-2 py-1"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className=" pr-2 text-sm">{filteredData.length} rows</span>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-xs font-bold tracking-wider text-left uppercase cursor-pointer"
              onClick={() => handleSort("dayOfWeek")}
            >
              Day of week&#8597;
            </th>
            <th
              className="px-6 py-3 text-xs font-bold tracking-wider text-left uppercase cursor-pointer"
              onClick={() => handleSort("startingTime")}
            >
              Starting time&#8597;
            </th>
            <th
              className="px-6 py-3 text-xs font-bold tracking-wider text-left uppercase cursor-pointer"
              onClick={() => handleSort("duration")}
            >
              Duration&#8597;
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
              Block
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
              Classroom
            </th>
            <th
              className="px-6 py-3 text-xs font-bold tracking-wider text-left uppercase cursor-pointer"
              onClick={() => handleSort("group")}
            >
              Group&#8597;
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
              Module
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking -wider text-left uppercase">
              Teacher
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
              Faculty
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map((row) => (
            <tr key={row.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.dayOfWeek}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.startingTime}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.duration}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.block}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.classroom}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.group}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.module}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.teacher}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.faculty}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
