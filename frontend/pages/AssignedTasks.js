import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common"; // Adjust the import path as necessary
import { jwtDecode } from "jwt-decode"; // Named import from jwt-decode

const AssignedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [traderId, setTraderId] = useState(null);

  // Function to decode the token and extract the trader ID
//   const getTraderIdFromToken = () => {
//     const token = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("token="))
//       .split("=")[1];
//     const decodedToken = jwtDecode(token); // Correct usage of jwtDecode
//     return decodedToken._id; // Assuming the trader ID is stored in the _id field of the token payload
//   };

const getTraderIdFromToken = () => {
  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  if (!tokenCookie) {
    console.error("Token not found in cookies.");
    return null; // Return null or handle as per your logic
  }

  const token = tokenCookie.split("=")[1];

  if (!token) {
    console.error("Token is undefined or empty.");
    return null; // Return null or handle as per your logic
  }

  const decodedToken = jwtDecode(token);
  return decodedToken._id; // Assuming the trader ID is stored in the _id field of the token payload
};


  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `${SummaryApi.allTasks.url}?traderId=${traderId}`,
        {
          method: SummaryApi.allTasks.method,
          credentials: "include",
        }
      );

      const dataResponse = await response.json();

      if (dataResponse.success) {
        setTasks(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch tasks.");
      console.error(error);
    }
  };

  useEffect(() => {
    const id = getTraderIdFromToken();
    setTraderId(id);

    if (id) {
      fetchTasks();
    }
  }, []);

  return (
    <div>
      <h2>Assigned Tasks</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id}>
            <p>Status: {task.status}</p>
            <p>Remarks: {task.remarks}</p>
            {/* Add more task details as needed */}
          </div>
        ))
      ) : (
        <p>No tasks assigned.</p>
      )}
    </div>
  );
};

export default AssignedTasks;
