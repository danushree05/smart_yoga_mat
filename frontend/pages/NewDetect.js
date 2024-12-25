// import React, { useRef, useState } from "react";

// const App = () => {
//   const [ws, setWs] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);

//   const startVideo = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//     videoRef.current.srcObject = stream;

//     const canvas = canvasRef.current;
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     contextRef.current = canvas.getContext("2d");

//     const webSocket = new WebSocket("ws://localhost:8000/ws/video/");
//     webSocket.onopen = () => {
//       console.log("WebSocket connection opened");
//     };

//     webSocket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("Pose landmarks received:", data.landmarks);
//     };

//     webSocket.onclose = () => {
//       console.log("WebSocket connection closed");
//     };

//     setWs(webSocket);

//     const sendFrame = () => {
//       contextRef.current.drawImage(
//         videoRef.current,
//         0,
//         0,
//         canvas.width,
//         canvas.height
//       );
//       canvas.toBlob((blob) => {
//         if (webSocket.readyState === WebSocket.OPEN) {
//           blob.arrayBuffer().then((buffer) => {
//             webSocket.send(buffer);
//           });
//         }
//       }, "image/jpeg");
//       requestAnimationFrame(sendFrame);
//     };

//     videoRef.current.addEventListener("play", sendFrame);
//   };

//   return (
//     <div>
//       <h1>Yoga Pose Detection</h1>
//       <button onClick={startVideo}>Start Video</button>
//       <video
//         ref={videoRef}
//         autoPlay
//         style={{ width: "640px", height: "480px", border: "1px solid black" }}
//       />
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </div>
//   );
// };

// export default App;
// src/PoseDetection.js

// import React, { useEffect, useRef, useState } from "react";
// import {
//   PoseLandmarker,
//   FilesetResolver,
//   DrawingUtils,
// } from "@mediapipe/tasks-vision";

// const PoseDetection = () => {
//   const [poseLandmarker, setPoseLandmarker] = useState(null);
//   const [runningMode, setRunningMode] = useState("IMAGE");
//   const [webcamRunning, setWebcamRunning] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const imageContainersRef = useRef([]);
//   const videoHeight = "360px";
//   const videoWidth = "480px";

//   useEffect(() => {
//     const createPoseLandmarker = async () => {
//       const vision = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
//       );
//       const landmarker = await PoseLandmarker.createFromOptions(vision, {
//         baseOptions: {
//           modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
//           delegate: "GPU",
//         },
//         runningMode,
//         numPoses: 2,
//       });
//       setPoseLandmarker(landmarker);
//       document.getElementById("demos").classList.remove("invisible");
//     };
//     createPoseLandmarker();
//   }, [runningMode]);

//   useEffect(() => {
//     if (poseLandmarker && imageContainersRef.current) {
//       imageContainersRef.current.forEach((container) => {
//         const img = container.querySelector("img");
//         if (img) {
//           img.addEventListener("click", handleClick);
//         }
//       });
//     }
//   }, [poseLandmarker]);

//   const handleClick = async (event) => {
//     if (!poseLandmarker) {
//       console.log("Wait for poseLandmarker to load before clicking!");
//       return;
//     }

//     if (runningMode === "VIDEO") {
//       setRunningMode("IMAGE");
//       await poseLandmarker.setOptions({ runningMode: "IMAGE" });
//     }

//     const allCanvas = event.target.parentNode.getElementsByClassName("canvas");
//     for (let i = allCanvas.length - 1; i >= 0; i--) {
//       allCanvas[i].parentNode.removeChild(allCanvas[i]);
//     }

//     poseLandmarker.detect(event.target, (result) => {
//       const canvas = document.createElement("canvas");
//       canvas.setAttribute("class", "canvas");
//       canvas.setAttribute("width", `${event.target.naturalWidth}px`);
//       canvas.setAttribute("height", `${event.target.naturalHeight}px`);
//       canvas.style = `left: 0px; top: 0px; width: ${event.target.width}px; height: ${event.target.height}px;`;

//       event.target.parentNode.appendChild(canvas);
//       const canvasCtx = canvas.getContext("2d");
//       const drawingUtils = new DrawingUtils(canvasCtx);
//       result.landmarks.forEach((landmark) => {
//         drawingUtils.drawLandmarks(landmark, {
//           radius: (data) =>
//             DrawingUtils.lerp(data.from?.z ?? 0, -0.15, 0.1, 5, 1),
//         });
//         drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
//       });
//     });
//   };

//   const enableCam = () => {
//     if (!poseLandmarker) {
//       console.log("Wait! poseLandmaker not loaded yet.");
//       return;
//     }

//     if (webcamRunning) {
//       setWebcamRunning(false);
//       document.getElementById("webcamButton").innerText = "ENABLE PREDICTIONS";
//     } else {
//       setWebcamRunning(true);
//       document.getElementById("webcamButton").innerText = "DISABLE PREDICTIONS";
//     }

//     const constraints = {
//       video: true,
//     };

//     navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
//       videoRef.current.srcObject = stream;
//       videoRef.current.addEventListener("loadeddata", predictWebcam);
//     });
//   };

//   const predictWebcam = async () => {
//     if (runningMode === "IMAGE") {
//       setRunningMode("VIDEO");
//       await poseLandmarker.setOptions({ runningMode: "VIDEO" });
//     }

//     const startTimeMs = performance.now();
//     poseLandmarker.detectForVideo(videoRef.current, startTimeMs, (result) => {
//       const canvasCtx = canvasRef.current.getContext("2d");
//       canvasCtx.save();
//       canvasCtx.clearRect(
//         0,
//         0,
//         canvasRef.current.width,
//         canvasRef.current.height
//       );
//       result.landmarks.forEach((landmark) => {
//         const drawingUtils = new DrawingUtils(canvasCtx);
//         drawingUtils.drawLandmarks(landmark, {
//           radius: (data) =>
//             DrawingUtils.lerp(data.from?.z ?? 0, -0.15, 0.1, 5, 1),
//         });
//         drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
//       });
//       canvasCtx.restore();
//     });

//     if (webcamRunning) {
//       window.requestAnimationFrame(predictWebcam);
//     }
//   };

//   return (
//     <div>
//       <h1>Pose detection using the MediaPipe PoseLandmarker task</h1>
//       <section id="demos" className="invisible">
//         <h2>Demo: Detecting Images</h2>
//         <p>
//           <b>Click on an image below</b> to see the key landmarks of the body.
//         </p>

//         <div
//           className="detectOnClick"
//           ref={(el) => (imageContainersRef.current[0] = el)}
//         >
//           <img
//             src="https://assets.codepen.io/9177687/woman-ge0f199f92_640.jpg"
//             width="100%"
//             alt="Click to get detection!"
//           />
//         </div>
//         <div
//           className="detectOnClick"
//           ref={(el) => (imageContainersRef.current[1] = el)}
//         >
//           <img
//             src="https://assets.codepen.io/9177687/woman-g1af8d3deb_640.jpg"
//             width="100%"
//             alt="Click to get detection!"
//           />
//         </div>

//         <h2>Demo: Webcam continuous pose landmarks detection</h2>
//         <p>
//           Stand in front of your webcam to get real-time pose landmarker
//           detection.
//           <br />
//           Click <b>enable webcam</b> below and grant access to the webcam if
//           prompted.
//         </p>

//         <div id="liveView" className="videoView">
//           <button
//             id="webcamButton"
//             className="mdc-button mdc-button--raised"
//             onClick={enableCam}
//           >
//             <span className="mdc-button__ripple"></span>
//             <span className="mdc-button__label">ENABLE WEBCAM</span>
//           </button>
//           <div style={{ position: "relative" }}>
//             <video
//               ref={videoRef}
//               style={{ width: "1280px", height: "720px", position: "absolute" }}
//               autoPlay
//               playsInline
//             />
//             <canvas
//               className="output_canvas"
//               ref={canvasRef}
//               width="1280"
//               height="720"
//               style={{ position: "absolute", left: "0px", top: "0px" }}
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PoseDetection;
// import React, { useEffect, useRef, useState } from "react";
// import {
//   PoseLandmarker,
//   FilesetResolver,
//   DrawingUtils,
// } from "@mediapipe/tasks-vision";

// const PoseDetection = () => {
//   const [poseLandmarker, setPoseLandmarker] = useState(null);
//   const [runningMode, setRunningMode] = useState("IMAGE");
//   const [webcamRunning, setWebcamRunning] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [poseLabel, setPoseLabel] = useState("Unknown Pose");


//   const calculateAngle = (p1, p2, p3) => {
//     const radians =
//       Math.atan2(p3.y - p2.y, p3.x - p2.x) -
//       Math.atan2(p1.y - p2.y, p1.x - p2.x);
//     return Math.abs(radians * (180 / Math.PI));
//   };

//   const classifyPose = (landmarks) => {
//     let label = "Unknown Pose";
//     const color = (0, 0, 255); // Red

//     if (landmarks.length < 33) return { label, color };

//     // Example landmarks positions
//     const leftShoulder = landmarks[11];
//     const leftElbow = landmarks[12];
//     const leftWrist = landmarks[13];
//     const rightShoulder = landmarks[14];
//     const rightElbow = landmarks[15];
//     const rightWrist = landmarks[16];
//     const leftHip = landmarks[23];
//     const rightHip = landmarks[24];
//     const leftKnee = landmarks[25];
//     const rightKnee = landmarks[26];
//     const leftAnkle = landmarks[27];
//     const rightAnkle = landmarks[28];

//     // Calculate angles
//     const leftElbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
//     const rightElbowAngle = calculateAngle(
//       rightShoulder,
//       rightElbow,
//       rightWrist
//     );
//     const leftShoulderAngle = calculateAngle(leftElbow, leftShoulder, leftHip);
//     const rightShoulderAngle = calculateAngle(
//       rightHip,
//       rightShoulder,
//       rightElbow
//     );
//     const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
//     const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);

//     // Pose classification
//     if (
//       leftElbowAngle > 165 &&
//       leftElbowAngle < 195 &&
//       rightElbowAngle > 165 &&
//       rightElbowAngle < 195
//     ) {
//       if (
//         leftShoulderAngle > 80 &&
//         leftShoulderAngle < 110 &&
//         rightShoulderAngle > 80 &&
//         rightShoulderAngle < 110
//       ) {
//         if (
//           (leftKneeAngle > 165 && leftKneeAngle < 195) ||
//           (rightKneeAngle > 165 && rightKneeAngle < 195)
//         ) {
//           if (
//             (leftKneeAngle > 90 && leftKneeAngle < 120) ||
//             (rightKneeAngle > 90 && rightKneeAngle < 120)
//           ) {
//             label = "Warrior II Pose";
//           } else if (
//             leftKneeAngle > 160 &&
//             leftKneeAngle < 195 &&
//             rightKneeAngle > 160 &&
//             rightKneeAngle < 195
//           ) {
//             label = "T Pose";
//           }
//         }
//       }
//     }

//     if (
//       (leftKneeAngle > 165 && leftKneeAngle < 195) ||
//       (rightKneeAngle > 165 && rightKneeAngle < 195)
//     ) {
//       if (
//         (leftKneeAngle > 315 && leftKneeAngle < 335) ||
//         (rightKneeAngle > 25 && rightKneeAngle < 45)
//       ) {
//         label = "Tree Pose";
//       }
//     }

//     if (label !== "Unknown Pose") {
//       color = (0, 255, 0); // Green
//     }

//     return { label, color };
//   };

//   useEffect(() => {
//     const createPoseLandmarker = async () => {
//       const vision = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
//       );
//       const landmarker = await PoseLandmarker.createFromOptions(vision, {
//         baseOptions: {
//           modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task`,
//           delegate: "GPU",
//         },
//         runningMode,
//         numPoses: 2,
//       });
//       setPoseLandmarker(landmarker);
//       document.getElementById("demos").classList.remove("invisible");
//     };
//     createPoseLandmarker();
//   }, [runningMode]);

//   useEffect(() => {
//     if (poseLandmarker) {
//       // Load the classification model here if needed
//       // For example:
//       // const classificationModel = await loadClassificationModel();
//     }
//   }, [poseLandmarker]);

// //   const handlePoseClassification = (landmarks) => {
// //     // Implement your pose classification logic here
// //     // For demonstration, we'll use a dummy function
// //     const classifyPose = (landmarks) => {
// //       // Example classification logic
// //       if (landmarks.length > 0) {
// //         // Replace with actual classification logic
// //         return "Pose A"; // Dummy classification
// //       }
// //       return "Unknown Pose";
// //     };

// //     const poseLabel = classifyPose(landmarks);
// //     setPoseLabel(poseLabel);
// //   };
// const handlePoseClassification = (landmarks) => {
//   const { label, color } = classifyPose(landmarks);
//   setPoseLabel(label);

//   // Draw label on the canvas
//   const canvas = canvasRef.current;
//   const ctx = canvas.getContext("2d");
//   ctx.font = "20px Arial";
//   ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
//   ctx.fillText(label, 10, 30);
// };

//   const handleClick = async (event) => {
//     if (!poseLandmarker) {
//       console.log("Wait for poseLandmarker to load before clicking!");
//       return;
//     }

//     if (runningMode === "VIDEO") {
//       setRunningMode("IMAGE");
//       await poseLandmarker.setOptions({ runningMode: "IMAGE" });
//     }

//     const allCanvas = event.target.parentNode.getElementsByClassName("canvas");
//     for (let i = allCanvas.length - 1; i >= 0; i--) {
//       allCanvas[i].parentNode.removeChild(allCanvas[i]);
//     }

//     poseLandmarker.detect(event.target, (result) => {
//       const canvas = document.createElement("canvas");
//       canvas.setAttribute("class", "canvas");
//       canvas.setAttribute("width", `${event.target.naturalWidth}px`);
//       canvas.setAttribute("height", `${event.target.naturalHeight}px`);
//       canvas.style = `left: 0px; top: 0px; width: ${event.target.width}px; height: ${event.target.height}px;`;

//       event.target.parentNode.appendChild(canvas);
//       const canvasCtx = canvas.getContext("2d");
//       const drawingUtils = new DrawingUtils(canvasCtx);
//       result.landmarks.forEach((landmark) => {
//         drawingUtils.drawLandmarks(landmark, {
//           radius: (data) =>
//             DrawingUtils.lerp(data.from?.z ?? 0, -0.15, 0.1, 5, 1),
//         });
//         drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
//       });

//       handlePoseClassification(result.landmarks);
//     });
//   };

//   const enableCam = () => {
//     if (!poseLandmarker) {
//       console.log("Wait! poseLandmarker not loaded yet.");
//       return;
//     }

//     if (webcamRunning) {
//       setWebcamRunning(false);
//       document.getElementById("webcamButton").innerText = "ENABLE PREDICTIONS";
//     } else {
//       setWebcamRunning(true);
//       document.getElementById("webcamButton").innerText = "DISABLE PREDICTIONS";
//     }

//     const constraints = {
//       video: true,
//     };

//     navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
//       videoRef.current.srcObject = stream;
//       videoRef.current.addEventListener("loadeddata", predictWebcam);
//     });
//   };

//   const predictWebcam = async () => {
//     if (runningMode === "IMAGE") {
//       setRunningMode("VIDEO");
//       await poseLandmarker.setOptions({ runningMode: "VIDEO" });
//     }

//     const startTimeMs = performance.now();
//     poseLandmarker.detectForVideo(videoRef.current, startTimeMs, (result) => {
//       const canvasCtx = canvasRef.current.getContext("2d");
//       canvasCtx.save();
//       canvasCtx.clearRect(
//         0,
//         0,
//         canvasRef.current.width,
//         canvasRef.current.height
//       );
//       result.landmarks.forEach((landmark) => {
//         const drawingUtils = new DrawingUtils(canvasCtx);
//         drawingUtils.drawLandmarks(landmark, {
//           radius: (data) =>
//             DrawingUtils.lerp(data.from?.z ?? 0, -0.15, 0.1, 5, 1),
//         });
//         drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
//       });
//       canvasCtx.restore();

//       handlePoseClassification(result.landmarks);
//     });

//     if (webcamRunning) {
//       window.requestAnimationFrame(predictWebcam);
//     }
//   };

//   return (
//     <div>
//       <h1>Pose detection using the MediaPipe PoseLandmarker task</h1>
//       <section id="demos" className="invisible">
//         <h2>Demo: Detecting Images</h2>
//         {/* <p>
//           <b>Click on an image below</b> to see the key landmarks of the body.
//         </p>

//         <div className="detectOnClick" onClick={handleClick}>
//           <img
//             src="https://assets.codepen.io/9177687/woman-ge0f199f92_640.jpg"
//             width="100%"
//             alt="Click to get detection!"
//           />
//         </div>
//         <div className="detectOnClick" onClick={handleClick}>
//           <img
//             src="https://assets.codepen.io/9177687/woman-g1af8d3deb_640.jpg"
//             width="100%"
//             alt="Click to get detection!"
//           />
//         </div> */}

//         <h2>Demo: Webcam continuous pose landmarks detection</h2>
//         <p>
//           Stand in front of your webcam to get real-time pose landmarker
//           detection.
//           <br />
//           Click <b>enable webcam</b> below and grant access to the webcam if
//           requested.
//         </p>
//         <video ref={videoRef} autoPlay muted width="480px" height="360px" />
//         <canvas ref={canvasRef} width="480px" height="360px" />
//         <div>
//           <button id="webcamButton" onClick={enableCam}>
//             ENABLE PREDICTIONS
//           </button>
//         </div>
//         <div>
//           <p>Pose Label: {poseLabel}</p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PoseDetection;
//latest proper
// import React, { useEffect, useRef, useState } from "react";
// import {
//   PoseLandmarker,
//   FilesetResolver,
//   DrawingUtils,
// } from "@mediapipe/tasks-vision";

// const PoseDetection = () => {
//   const [poseLandmarker, setPoseLandmarker] = useState(null);
//   const [runningMode, setRunningMode] = useState("IMAGE");
//   const [webcamRunning, setWebcamRunning] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [poseLabel, setPoseLabel] = useState("Unknown Pose");

//   const calculateAngle = (p1, p2, p3) => {
//     const radians =
//       Math.atan2(p3.y - p2.y, p3.x - p2.x) -
//       Math.atan2(p1.y - p2.y, p1.x - p2.x);
//     return Math.abs(radians * (180 / Math.PI));
//   };

// //   const classifyPose = (landmarks) => {
// //     console.log("Landmarks:", landmarks);
// //     let label = "";
// //     const color = [0, 0, 255]; // Red

// //     if (landmarks.length < 33) return { label, color };

// //     // Example landmarks positions
// //     const leftShoulder = landmarks[11];
// //     const leftElbow = landmarks[12];
// //     const leftWrist = landmarks[13];
// //     const rightShoulder = landmarks[14];
// //     const rightElbow = landmarks[15];
// //     const rightWrist = landmarks[16];
// //     const leftHip = landmarks[23];
// //     const rightHip = landmarks[24];
// //     const leftKnee = landmarks[25];
// //     const rightKnee = landmarks[26];
// //     const leftAnkle = landmarks[27];
// //     const rightAnkle = landmarks[28];

// //     // Calculate angles
// //     const leftElbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
// //     const rightElbowAngle = calculateAngle(
// //       rightShoulder,
// //       rightElbow,
// //       rightWrist
// //     );
// //     const leftShoulderAngle = calculateAngle(leftElbow, leftShoulder, leftHip);
// //     const rightShoulderAngle = calculateAngle(
// //       rightHip,
// //       rightShoulder,
// //       rightElbow
// //     );
// //     const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
// //     const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);

// //     // Pose classification
// //     if (
// //       leftElbowAngle > 165 &&
// //       leftElbowAngle < 195 &&
// //       rightElbowAngle > 165 &&
// //       rightElbowAngle < 195
// //     ) {
// //       if (
// //         leftShoulderAngle > 80 &&
// //         leftShoulderAngle < 110 &&
// //         rightShoulderAngle > 80 &&
// //         rightShoulderAngle < 110
// //       ) {
// //         // T Pose: Arms extended horizontally
// //         if (
// //           Math.abs(leftWrist.y - rightWrist.y) < 0.1 && // Hands are roughly at the same height
// //           Math.abs(leftWrist.x - leftShoulder.x) > 0.3 && // Hands are far from shoulders
// //           Math.abs(rightWrist.x - rightShoulder.x) > 0.3
// //         ) {
// //           label = "T Pose";
// //         }
// //       }
// //     }

// //     // Additional poses can be detected similarly
// //     if (label !== "Unknown Pose") {
// //       color[0] = 0; // Green
// //       color[1] = 255;
// //       color[2] = 0;
// //     }

// //     return { label, color };
// //   };
// const classifyPose = (landmarks) => {
//   console.log("Landmarks:", landmarks);
//   let label = "Unknown Pose"; // Default label
//   const color = [255, 0, 0]; // Default color (red for unknown)

//   if (landmarks.length < 33) return { label, color }; // Make sure there are enough landmarks

//   // Extracting key landmarks
//   const leftShoulder = landmarks[11];
//   const leftElbow = landmarks[13];
//   const leftWrist = landmarks[15];
//   const rightShoulder = landmarks[12];
//   const rightElbow = landmarks[14];
//   const rightWrist = landmarks[16];

//   // Calculating angles
//   const leftElbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
//   const rightElbowAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);

//   // Check for T-Pose (arms extended horizontally, wrists roughly at shoulder height)
//   if (
//     leftElbowAngle > 160 &&
//     leftElbowAngle < 200 && // Elbows straight (~180 degrees)
//     rightElbowAngle > 160 &&
//     rightElbowAngle < 200 &&
//     Math.abs(leftWrist.y - leftShoulder.y) < 0.1 && // Wrists at shoulder height
//     Math.abs(rightWrist.y - rightShoulder.y) < 0.1 &&
//     Math.abs(leftWrist.x - rightWrist.x) > 0.5 // Arms extended
//   ) {
//     label = "T Pose";
//     color[0] = 0; // Set color to green for detected pose
//     color[1] = 255;
//     color[2] = 0;
//   }

//   return { label, color };
// };

//   useEffect(() => {
//     const createPoseLandmarker = async () => {
//       const vision = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
//       );
//       const landmarker = await PoseLandmarker.createFromOptions(vision, {
//         baseOptions: {
//           modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task`,
//           delegate: "GPU",
//         },
//         runningMode,
//         numPoses: 2,
//       });
//       setPoseLandmarker(landmarker);
//       document.getElementById("demos").classList.remove("invisible");
//     };
//     createPoseLandmarker();
//   }, [runningMode]);

//   const handlePoseClassification = (landmarks) => {
//     const { label, color } = classifyPose(landmarks);
//     setPoseLabel(label);

//     // Draw label on the canvas
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.font = "20px Arial";
//     ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
//     ctx.fillText(label, 10, 30);
//   };

//   const handleClick = async (event) => {
//     if (!poseLandmarker) {
//       console.log("Wait for poseLandmarker to load before clicking!");
//       return;
//     }

//     if (runningMode === "VIDEO") {
//       setRunningMode("IMAGE");
//       await poseLandmarker.setOptions({ runningMode: "IMAGE" });
//     }

//     const allCanvas = event.target.parentNode.getElementsByClassName("canvas");
//     for (let i = allCanvas.length - 1; i >= 0; i--) {
//       allCanvas[i].parentNode.removeChild(allCanvas[i]);
//     }

//     poseLandmarker.detect(event.target, (result) => {
//       const canvas = document.createElement("canvas");
//       canvas.setAttribute("class", "canvas");
//       canvas.setAttribute("width", `${event.target.naturalWidth}px`);
//       canvas.setAttribute("height", `${event.target.naturalHeight}px`);
//       canvas.style = `left: 0px; top: 0px; width: ${event.target.width}px; height: ${event.target.height}px;`;

//       event.target.parentNode.appendChild(canvas);
//       const canvasCtx = canvas.getContext("2d");
//       const drawingUtils = new DrawingUtils(canvasCtx);
//       result.landmarks.forEach((landmark) => {
//         drawingUtils.drawLandmarks(landmark, {
//           radius: (data) =>
//             DrawingUtils.lerp(data.from?.z ?? 0, -0.15, 0.1, 5, 1),
//         });
//         drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
//       });

//       handlePoseClassification(result.landmarks);
//     });
//   };

//   const enableCam = () => {
//     if (!poseLandmarker) {
//       console.log("Wait! poseLandmarker not loaded yet.");
//       return;
//     }

//     if (webcamRunning) {
//       setWebcamRunning(false);
//       document.getElementById("webcamButton").innerText = "ENABLE PREDICTIONS";
//     } else {
//       setWebcamRunning(true);
//       document.getElementById("webcamButton").innerText = "DISABLE PREDICTIONS";
//     }

//     const constraints = {
//       video: true,
//     };

//     navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
//       videoRef.current.srcObject = stream;
//       videoRef.current.addEventListener("loadeddata", predictWebcam);
//     });
//   };

//   const predictWebcam = async () => {
//     if (runningMode === "IMAGE") {
//       setRunningMode("VIDEO");
//       await poseLandmarker.setOptions({ runningMode: "VIDEO" });
//     }

//     const startTimeMs = performance.now();
//     poseLandmarker.detectForVideo(videoRef.current, startTimeMs, (result) => {
//       const canvasCtx = canvasRef.current.getContext("2d");
//       canvasCtx.save();
//       canvasCtx.clearRect(
//         0,
//         0,
//         canvasRef.current.width,
//         canvasRef.current.height
//       );
//       result.landmarks.forEach((landmark) => {
//         const drawingUtils = new DrawingUtils(canvasCtx);
//         drawingUtils.drawLandmarks(landmark, {
//           radius: (data) =>
//             DrawingUtils.lerp(data.from?.z ?? 0, -0.15, 0.1, 5, 1),
//         });
//         drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
//       });
//       canvasCtx.restore();

//       handlePoseClassification(result.landmarks);
//     });

//     if (webcamRunning) {
//       window.requestAnimationFrame(predictWebcam);
//     }
//   };

//   return (
//     <div>
//       <h1>Pose detection using the MediaPipe PoseLandmarker task</h1>
//       <section id="demos" className="demos invisible">
//         <button id="webcamButton" onClick={enableCam}>
//           ENABLE PREDICTIONS
//         </button>
//         <br />
//         <br />
//         <video
//           ref={videoRef}
//           className="input_video"
//           autoPlay
//           muted
//           playsInline
//           width="640"
//           height="480"
//         />
//         <canvas
//           ref={canvasRef}
//           className="output_canvas"
//           width="640"
//           height="480"
//         />
//         <div className="pose-label">{poseLabel}</div>
//       </section>
//     </div>
//   );
// };
// export default PoseDetection;
import React from "react";

function App() {
  const startDetection = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/start-detection", {
        method: "POST",
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        alert("Detection started!");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error starting detection:", error);
    }
  };

  return (
    <div>
      <h1>Pose Detection</h1>
      <button onClick={startDetection}>Start Detection</button>
    </div>
  );
}

export default App;
