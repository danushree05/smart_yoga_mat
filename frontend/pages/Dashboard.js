// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register the required components for Chart.js
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Dashboard() {
//   // Sample data for calories burned per day
//   const data = {
//     labels: [
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday",
//     ],
//     datasets: [
//       {
//         label: "Calories Burned",
//         data: [400, 500, 300, 600, 700, 500, 800], // Replace with real data
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderWidth: 2,
//         fill: true,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Calories Burned Per Day",
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//           Your Fitness Dashboard
//         </h1>

//         {/* Row with Graph and Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           {/* Calories Burned Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <Line data={data} options={options} />
//           </div>

//           {/* Daily Stats */}
//           <div className="bg-white p-6 rounded-lg shadow-md">


//             <h2>
//               heart rate:
//             </h2>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//               Daily Stats
//             </h2>
//             <ul className="space-y-4">
//               <li className="flex justify-between items-center">
//                 <span className="text-gray-600">Calories Burned Today:</span>
//                 <span className="text-xl font-bold text-gray-900">
//                   500 kcal
//                 </span>
//               </li>
//               <li className="flex justify-between items-center">
//                 <span className="text-gray-600">Workout Time:</span>
//                 <span className="text-xl font-bold text-gray-900">1 hour</span>
//               </li>
//               <li className="flex justify-between items-center">
//                 <span className="text-gray-600">Steps Taken:</span>
//                 <span className="text-xl font-bold text-gray-900">
//                   8,000 steps
//                 </span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Streak & Rewards */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Your Streak & Rewards
//           </h2>
//           <p className="text-gray-600 mb-4">
//             You’ve maintained a streak of <strong>5 days</strong>! Keep it up to
//             earn rewards.
//           </p>
//           <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
//             View Rewards
//           </button>
//         </div>

//         {/* Activity Overview */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Activity Overview
//           </h2>
//           <ul className="space-y-4">
//             <li className="flex justify-between items-center">
//               <span className="text-gray-600">Yoga Sessions Completed:</span>
//               <span className="text-xl font-bold text-gray-900">
//                 3 sessions
//               </span>
//             </li>
//             <li className="flex justify-between items-center">
//               <span className="text-gray-600">Average Heart Rate:</span>
//               <span className="text-xl font-bold text-gray-900">75 bpm</span>
//             </li>
//             <li className="flex justify-between items-center">
//               <span className="text-gray-600">Calories Burned This Week:</span>
//               <span className="text-xl font-bold text-gray-900">
//                 4,100 kcal
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
// import React, { useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register the required components for Chart.js
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Dashboard() {
//   const [heartRate, setHeartRate] = useState(null);

//   const connectToBluetooth = async () => {
//     try {
//       const device = await navigator.bluetooth.requestDevice({
//         filters: [{ services: ["heart_rate"] }],
//       });

//       const server = await device.gatt.connect();
//       const service = await server.getPrimaryService("heart_rate");
//       const characteristic = await service.getCharacteristic(
//         "heart_rate_measurement"
//       );

//       characteristic.startNotifications();

//       characteristic.addEventListener(
//         "characteristicvaluechanged",
//         handleHeartRateChanged
//       );
//     } catch (error) {
//       console.error("Bluetooth connection failed", error);
//     }
//   };

//   const handleHeartRateChanged = (event) => {
//     const value = event.target.value;
//     const heartRate = value.getUint8(1); // Heart rate is in the second byte
//     setHeartRate(heartRate);
//   };

//   // Sample data for calories burned per day
//   const data = {
//     labels: [
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday",
//     ],
//     datasets: [
//       {
//         label: "Calories Burned",
//         data: [400, 500, 300, 600, 700, 500, 800], // Replace with real data
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderWidth: 2,
//         fill: true,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Calories Burned Per Day",
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//           Your Fitness Dashboard
//         </h1>

//         {/* Row with Graph and Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           {/* Calories Burned Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <Line data={data} options={options} />
//           </div>

//           {/* Daily Stats */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//               Daily Stats
//             </h2>
//             <ul className="space-y-4">
//               <li className="flex justify-between items-center">
//                 <span className="text-gray-600">Calories Burned Today:</span>
//                 <span className="text-xl font-bold text-gray-900">
//                   500 kcal
//                 </span>
//               </li>
//               <li className="flex justify-between items-center">
//                 <span className="text-gray-600">Workout Time:</span>
//                 <span className="text-xl font-bold text-gray-900">1 hour</span>
//               </li>
//               <li className="flex justify-between items-center">
//                 <span className="text-gray-600">Steps Taken:</span>
//                 <span className="text-xl font-bold text-gray-900">
//                   8,000 steps
//                 </span>
//               </li>
//               <li className="flex justify-between items-center">
//                 <span className="text-gray-600">Heart Rate:</span>
//                 <span className="text-xl font-bold text-gray-900">
//                   {heartRate ? `${heartRate} bpm` : "N/A"}
//                 </span>
//               </li>
//             </ul>
//             <button
//               onClick={connectToBluetooth}
//               className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
//             >
//               Connect Heart Rate Monitor
//             </button>
//           </div>
//         </div>

//         {/* Streak & Rewards */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Your Streak & Rewards
//           </h2>
//           <p className="text-gray-600 mb-4">
//             You’ve maintained a streak of <strong>5 days</strong>! Keep it up to
//             earn rewards.
//           </p>
//           <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
//             View Rewards
//           </button>
//         </div>

//         {/* Activity Overview */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Activity Overview
//           </h2>
//           <ul className="space-y-4">
//             <li className="flex justify-between items-center">
//               <span className="text-gray-600">Yoga Sessions Completed:</span>
//               <span className="text-xl font-bold text-gray-900">
//                 3 sessions
//               </span>
//             </li>
//             <li className="flex justify-between items-center">
//               <span className="text-gray-600">Average Heart Rate:</span>
//               <span className="text-xl font-bold text-gray-900">75 bpm</span>
//             </li>
//             <li className="flex justify-between items-center">
//               <span className="text-gray-600">Calories Burned This Week:</span>
//               <span className="text-xl font-bold text-gray-900">
//                 4,100 kcal
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
// import React, { useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register the required components for Chart.js
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Dashboard() {
//   const [heartRate, setHeartRate] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//   const connectToBluetooth = async () => {
//     try {
//       const device = await navigator.bluetooth.requestDevice({
//         filters: [{ services: ["heart_rate"] }],
//       });

//       const server = await device.gatt.connect();
//       const service = await server.getPrimaryService("heart_rate");
//       const characteristic = await service.getCharacteristic(
//         "heart_rate_measurement"
//       );

//       characteristic.startNotifications();

//       characteristic.addEventListener(
//         "characteristicvaluechanged",
//         handleHeartRateChanged
//       );

//       setIsConnected(true);
//     } catch (error) {
//       console.error("Bluetooth connection failed", error);
//       setIsConnected(false);
//     }
//   };

//   const handleHeartRateChanged = (event) => {
//     const value = event.target.value;
//     const heartRate = value.getUint8(1); // Heart rate is in the second byte
//     setHeartRate(heartRate);
//   };

//   // Sample data for calories burned per day
//   const data = {
//     labels: [
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday",
//     ],
//     datasets: [
//       {
//         label: "Calories Burned",
//         data: [400, 500, 300, 600, 700, 500, 800], // Replace with real data
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderWidth: 2,
//         fill: true,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Calories Burned Per Day",
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//           Your Fitness Dashboard
//         </h1>

//         {/* Row with Graph and Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           {/* Calories Burned Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <Line data={data} options={options} />
//           </div>

//           {/* Daily Stats */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//               Daily Stats
//             </h2>
//             <ul className="space-y-4">
//               <li className="flex justify-between items-center">
//                 <span className="text-gray-600">Calories Burned Today:</span>
//                 <span className="text-xl font-bold text-gray-900">
//                   500 kcal
//                 </span>
//               </li>
//               <li className="flex justify-between items-center">
//                 <span className="text-gray-600">Workout Time:</span>
//                 <span className="text-xl font-bold text-gray-900">1 hour</span>
//               </li>
//               <li className="flex justify-between items-center">
//                 <span className="text-gray-600">Steps Taken:</span>
//                 <span className="text-xl font-bold text-gray-900">
//                   8,000 steps
//                 </span>
//               </li>
//               <li className="flex justify-between items-center">
//                 <span className="text-gray-600">Heart Rate:</span>
//                 <span className="text-xl font-bold text-gray-900">
//                   {heartRate ? `${heartRate} bpm` : "N/A"}
//                 </span>
//               </li>
//             </ul>
//             <button
            
//               onClick={connectToBluetooth}
//               className={`mt-4 py-2 px-4 rounded-lg transition ${
//                 isConnected
//                   ? "bg-green-500 hover:bg-green-600"
//                   : "bg-blue-500 hover:bg-blue-600"
//               } text-white`}
//             >
//               {isConnected ? "Connected" : "Connect Heart Rate Monitor"}
//             </button>
//           </div>
//         </div>

//         {/* Streak & Rewards */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Your Streak & Rewards
//           </h2>
//           <p className="text-gray-600 mb-4">
//             You’ve maintained a streak of <strong>5 days</strong>! Keep it up to
//             earn rewards.
//           </p>
//           <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
//             View Rewards
//           </button>
//         </div>

//         {/* Activity Overview */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Activity Overview
//           </h2>
//           <ul className="space-y-4">
//             <li className="flex justify-between items-center">
//               <span className="text-gray-600">Yoga Sessions Completed:</span>
//               <span className="text-xl font-bold text-gray-900">
//                 3 sessions
//               </span>
//             </li>
//             <li className="flex justify-between items-center">
//               <span className="text-gray-600">Average Heart Rate:</span>
//               <span className="text-xl font-bold text-gray-900">
//                 {heartRate ? `${heartRate} bpm` : "N/A"}
//               </span>
//             </li>
//             <li className="flex justify-between items-center">
//               <span className="text-gray-600">Calories Burned This Week:</span>
//               <span className="text-xl font-bold text-gray-900">
//                 4,100 kcal
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
//latest proper
// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register the required components for Chart.js
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Dashboard() {
//   const [heartRate, setHeartRate] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [device, setDevice] = useState(null);
//   const [heartRateCharacteristic, setHeartRateCharacteristic] = useState(null);

//   useEffect(() => {
//     if (device) {
//       device.addEventListener("gattserverdisconnected", handleDisconnect);
//     }
//     return () => {
//       if (device) {
//         device.removeEventListener("gattserverdisconnected", handleDisconnect);
//       }
//     };
//   }, [device]);

//   const parseHeartRate = (value) => {
//     let is16Bits = value.getUint8(0) & 0x1;
//     if (is16Bits) return value.getUint16(1, true);
//     return value.getUint8(1);
//   };

//   const handleHeartRateChanged = (event) => {
//     const value = event.target.value;
//     setHeartRate(parseHeartRate(value));
//   };

//   const connectToBluetooth = async () => {
//     try {
//       const options = {
//         acceptAllDevices: true,
//         optionalServices: ["heart_rate"], // Adjust this to match your device's services
//       };
//       const device = await navigator.bluetooth.requestDevice(options);
//       setDevice(device);
//       await connectDevice(device);
//     } catch (error) {
//       console.error("Bluetooth connection failed", error);
//       setIsConnected(false);
//     }
//   };

//   const connectDevice = async (device) => {
//     try {
//       if (device.gatt.connected) return;

//       const server = await device.gatt.connect();
//       const services = await server.getPrimaryServices();
//       console.log("Available services:", services);

//       const heartRateService = services.find(
//         (service) => service.uuid === "heart_rate"
//       );
//       if (heartRateService) {
//         const heartRateCharacteristic =
//           await heartRateService.getCharacteristic("heart_rate_measurement");
//         setHeartRateCharacteristic(heartRateCharacteristic);
//         heartRateCharacteristic.addEventListener(
//           "characteristicvaluechanged",
//           handleHeartRateChanged
//         );
//         setIsConnected(true);
//       } else {
//         console.log("Heart rate service not found");
//         setIsConnected(false);
//       }
//     } catch (error) {
//       console.error("Error connecting to device:", error);
//       setIsConnected(false);
//     }
//   };

//   const startMonitoring = async () => {
//     if (heartRateCharacteristic) {
//       await heartRateCharacteristic.startNotifications();
//     }
//   };

//   const stopMonitoring = async () => {
//     if (heartRateCharacteristic) {
//       await heartRateCharacteristic.stopNotifications();
//     }
//   };

//   const handleDisconnect = () => {
//     setIsConnected(false);
//     setHeartRate(null);
//   };

//   const data = {
//     labels: [
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday",
//     ],
//     datasets: [
//       {
//         label: "Calories Burned",
//         data: [400, 500, 300, 600, 700, 500, 800], // Replace with real data
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderWidth: 2,
//         fill: true,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Calories Burned Per Day",
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//           Your Fitness Dashboard
//         </h1>

//         {/* Row with Graph and Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           {/* Calories Burned Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <Line data={data} options={options} />
//           </div>

//           {/* Daily Stats */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//               Daily Stats
//             </h2>
//             <ul className="space-y-4">
//               <li className="flex justify-between items-center">
//                 <span className="text-gray-600">Calories Burned Today:</span>
//                 <span className="text-xl font-bold text-gray-900">
//                   500 kcal
//                 </span>
//               </li>
//               <li className="flex justify-between items-center">
//                 <span className="text-gray-600">Workout Time:</span>
//                 <span className="text-xl font-bold text-gray-900">1 hour</span>
//               </li>
//               <li className="flex justify-between items-center">
//                 <span className="text-gray-600">Steps Taken:</span>
//                 <span className="text-xl font-bold text-gray-900">
//                   8,000 steps
//                 </span>
//               </li>
//               <li className="flex justify-between items-center">
//                 <span className="text-gray-600">Heart Rate:</span>
//                 <span className="text-xl font-bold text-gray-900">
//                   {heartRate ? `${heartRate} bpm` : "N/A"}
//                 </span>
//               </li>
//             </ul>
//             <button
//               onClick={isConnected ? stopMonitoring : connectToBluetooth}
//               className={`mt-4 py-2 px-4 rounded-lg transition ${
//                 isConnected
//                   ? "bg-red-500 hover:bg-red-600"
//                   : "bg-blue-500 hover:bg-blue-600"
//               } text-white`}
//             >
//               {isConnected ? "Disconnect" : "Connect Heart Rate Monitor"}
//             </button>
//           </div>
//         </div>

//         {/* Streak & Rewards */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Your Streak & Rewards
//           </h2>
//           <p className="text-gray-600 mb-4">
//             You’ve maintained a streak of <strong>5 days</strong>! Keep it up to
//             earn rewards.
//           </p>
//           <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
//             View Rewards
//           </button>
//         </div>

//         {/* Activity Overview */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Activity Overview
//           </h2>
//           <ul className="space-y-4">
//             <li className="flex justify-between items-center">
//               <span className="text-gray-600">Yoga Sessions Completed:</span>
//               <span className="text-xl font-bold text-gray-900">
//                 3 sessions
//               </span>
//             </li>
//             <li className="flex justify-between items-center">
//               <span className="text-gray-600">Average Heart Rate:</span>
//               <span className="text-xl font-bold text-gray-900">
//                 {heartRate ? `${heartRate} bpm` : "N/A"}
//               </span>
//             </li>
//             <li className="flex justify-between items-center">
//               <span className="text-gray-600">Calories Burned This Week:</span>
//               <span className="text-xl font-bold text-gray-900">
//                 4,100 kcal
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../components/firebaseConfig"; // Assuming Firebase is initialized in firebase.js

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [heartRate, setHeartRate] = useState(null);
  const [caloriesBurned, setCaloriesBurned] = useState(null);

  useEffect(() => {
    // Initialize Firebase Database
    const db = getDatabase(app);

    // Reference to Heart Rate data in Firebase
    const heartRateRef = ref(db, "HeartRate/HEART_RATE");

    // Reference to Calories Burned data in Firebase
    const caloriesBurnedRef = ref(db, "HeartRate/CALORIES_BURNED");

    // Fetch Heart Rate data
    onValue(heartRateRef, (snapshot) => {
      const data = snapshot.val();
      setHeartRate(data);
    });

    // Fetch Calories Burned data
    onValue(caloriesBurnedRef, (snapshot) => {
      const data = snapshot.val();
      setCaloriesBurned(data);
    });
  }, []);

  // Dummy chart data for demonstration (replace with real data if needed)
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Calories Burned",
        data: [400, 500, 300, 600, 700, 500, 800], // Example data
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Calories Burned Per Day",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Your Fitness Dashboard
        </h1>

        {/* Row with Graph and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Calories Burned Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Line data={data} options={options} />
          </div>

          {/* Daily Stats */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Daily Stats
            </h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="text-gray-600">Calories Burned Today:</span>
                <span className="text-xl font-bold text-gray-900">
                  {caloriesBurned ? `${caloriesBurned} kcal` : "N/A"}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">Workout Time:</span>
                <span className="text-xl font-bold text-gray-900">1 hour</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">Steps Taken:</span>
                <span className="text-xl font-bold text-gray-900">
                  8,000 steps
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">Heart Rate:</span>
                <span className="text-xl font-bold text-gray-900">
                  {heartRate ? `${heartRate} bpm` : "N/A"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Streak & Rewards */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Streak & Rewards
          </h2>
          <p className="text-gray-600 mb-4">
            You’ve maintained a streak of <strong>5 days</strong>! Keep it up to
            earn rewards.
          </p>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
            View Rewards
          </button>
        </div>

        {/* Activity Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Activity Overview
          </h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Yoga Sessions Completed:</span>
              <span className="text-xl font-bold text-gray-900">
                3 sessions
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Average Heart Rate:</span>
              <span className="text-xl font-bold text-gray-900">
                {heartRate ? `${heartRate} bpm` : "N/A"}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Calories Burned This Week:</span>
              <span className="text-xl font-bold text-gray-900">
                4,100 kcal
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
