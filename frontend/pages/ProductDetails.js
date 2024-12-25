
// import React, { useState, useRef, useEffect, useContext } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import SummaryApi from "../common";
// import { FaStar, FaStarHalf } from "react-icons/fa";
// import displayINRCurrency from "../helpers/displayCurrency";
// import addToCart from "../helpers/addToCart";
// import Context from "../context";

// const ProductDetails = () => {
//   const [data, setData] = useState({
//     productName: "",
//     brandName: "",
//     category: "",
//     productVideo: [],
//     description: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [activeVideo, setActiveVideo] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [videoStream, setVideoStream] = useState(null);
//   const [detectionResults, setDetectionResults] = useState(null);
//   const videoRef = useRef(null);
//   const imageCaptureRef = useRef(null);

//   const { fetchUserAddToCart } = useContext(Context);
//   const navigate = useNavigate();
//   const params = useParams();




//    const handleAddToCart = async (e, id) => {
//      await addToCart(e, id);
//      fetchUserAddToCart();
//    };

//    const handleBuyProduct = async (e, id) => {
//      await addToCart(e, id);
//      fetchUserAddToCart();
//      navigate("/cart");
//    };


//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       setLoading(true);
//       const response = await fetch(SummaryApi.productDetails.url, {
//         method: SummaryApi.productDetails.method,
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify({
//           productId: params?.id,
//         }),
//       });
//       setLoading(false);
//       const dataResponse = await response.json();
//       setData(dataResponse?.data);
//       if (dataResponse?.data?.productVideo[0]) {
//         setActiveVideo(dataResponse?.data?.productVideo[0]);
//       }
//     };
//     fetchProductDetails();
//   }, [params]);

//   useEffect(() => {
//     if (!videoStream) return;

//     // const ws = new WebSocket("ws://0.0.0.0:8000/ws/video/");
//     const ws = new WebSocket("ws://127.0.0.1:8000/ws/video/");


//     ws.onopen = () => {
//       console.log("WebSocket connection established");
//     };

//     ws.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         setDetectionResults(data); // Update state with detection results
//         console.log("Pose landmarks:", data.landmarks);
//       } catch (error) {
//         console.error("Error parsing WebSocket message:", error);
//       }
//     };

//     ws.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     ws.onclose = (event) => {
//       console.log("WebSocket connection closed", event);
//     };

//     setSocket(ws);

//     return () => {
//       ws.close();
//     };
//   }, [videoStream]);

//   const handleStartVideo = async () => {
//     if (!videoRef.current) return;

//     // Access video stream
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//     videoRef.current.srcObject = stream;
//     setVideoStream(stream);

//     const videoTracks = stream.getVideoTracks();
//     const imageCapture = new ImageCapture(videoTracks[0]);
//     imageCaptureRef.current = imageCapture;

//     const sendFrame = async () => {
//       if (!socket || !imageCaptureRef.current) return;

//       try {
//         const frame = await imageCaptureRef.current.grabFrame();
//         const canvas = document.createElement("canvas");
//         canvas.width = frame.width;
//         canvas.height = frame.height;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(frame, 0, 0);
//         const imageData = canvas.toBlob((blob) => {
//           const reader = new FileReader();
//           reader.onloadend = () => {
//             if (socket.readyState === WebSocket.OPEN) {
//               socket.send(reader.result);
//             }
//           };
//           reader.readAsArrayBuffer(blob);
//         }, "image/jpeg");
//       } catch (error) {
//         console.error("Error capturing frame:", error);
//       }
//       requestAnimationFrame(sendFrame); // Continue sending frames
//     };

//     sendFrame();
//   };

//   const handleMouseEnterProduct = (videoURL) => {
//     console.log("Mouse entered video:", videoURL);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
//         <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
//           <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
//             {activeVideo && (
//               <video
//                 controls
//                 className="h-full w-full object-scale-down mix-blend-multiply"
//                 src={activeVideo}
//               />
//             )}
//           </div>

//           <div className="h-full">
//             {loading ? (
//               <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
//                 {/* Loading Skeleton */}
//               </div>
//             ) : (
//               <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
//                 {data?.productVideo?.map((videoURL, index) => (
//                   <div
//                     className="h-20 w-20 bg-slate-200 rounded p-1"
//                     key={videoURL}
//                   >
//                     <video
//                       src={videoURL}
//                       className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
//                       onMouseEnter={() => handleMouseEnterProduct(videoURL)}
//                       onClick={() => setActiveVideo(videoURL)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Product details */}
//         {loading ? (
//           <div className="grid gap-1 w-full">{/* Loading Skeleton */}</div>
//         ) : (
//           <div className="flex flex-col gap-1">
//             <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
//               {data?.brandName}
//             </p>
//             <h2 className="text-2xl lg:text-4xl font-medium">
//               {data?.productName}
//             </h2>
//             <p className="capitalize text-slate-400">{data?.category}</p>

//             <div className="text-red-600 flex items-center gap-1">
//               <p>{data?.rating}</p>
//               {Array.from({ length: Math.floor(data?.rating) }).map(
//                 (_, index) => (
//                   <FaStar key={index} />
//                 )
//               )}
//               {data?.rating % 1 ? <FaStarHalf /> : null}
//             </div>

//             <div className="my-3">{data?.description}</div>

//             <div className="my-3">
//               <div className="flex items-center gap-3 my-2">
//                 {/* <button
//                   className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
//                   onClick={(e) => handleBuyProduct(e, data?._id)}
//                 >
//                   Buy
//                 </button> */}
//                 <button
//                   className="border-2 border-green-700 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-green-700 hover:text-green-900 hover:bg-white"
//                   onClick={(e) => handleAddToCart(e, data?._id)}
//                 >
//                   complete
//                 </button>
//               </div>
//               <button
//                 onClick={handleStartVideo}
//                 className="py-2 px-4 bg-green-700 text-white rounded-md"
//               >
//                 Start Video
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Live Video Section */}
//       <div className="mt-4">
//         <h2 className="text-2xl font-medium mb-2">Live Video Feed</h2>
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           className="w-full h-96 object-cover"
//         />
//       </div>

//       {/* Detection Results */}
//       {detectionResults && (
//         <div className="mt-4">
//           <h2 className="text-2xl font-medium mb-2">Detection Results</h2>
//           <pre>{JSON.stringify(detectionResults, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;

//latest proper
import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import Context from "../context";
import addToCart from "../helpers/addToCart";
const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productVideo: [],
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [socket, setSocket] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [detectionResults, setDetectionResults] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();

     const handleAddToCart = async (e, id) => {
       await addToCart(e, id);
       fetchUserAddToCart();
     };
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

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productId: params?.id,
        }),
      });
      setLoading(false);
      const dataResponse = await response.json();
      setData(dataResponse?.data);
      if (dataResponse?.data?.productVideo[0]) {
        setActiveVideo(dataResponse?.data?.productVideo[0]);
      }
    };
    fetchProductDetails();
  }, [params]);

  useEffect(() => {
    if (!videoStream) return;

    const ws = new WebSocket("ws://127.0.0.1:8000/ws/video/");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setDetectionResults(data); // Update state with detection results
        console.log("Pose landmarks:", data.landmarks);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed", event);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [videoStream]);

  const handleStartVideo = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    // Access video stream
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    setVideoStream(stream);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const sendFrame = async () => {
      if (!socket || socket.readyState !== WebSocket.OPEN) return;

      // Draw the video frame to the canvas
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Convert the canvas to a Blob and send it over WebSocket
      canvas.toBlob((blob) => {
        if (blob) {
          blob.arrayBuffer().then((buffer) => {
            socket.send(buffer);
          });
        }
      }, "image/jpeg");

      requestAnimationFrame(sendFrame); // Continue sending frames
    };

    sendFrame();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Video and product details */}
        <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
          {activeVideo && (
            <video
              controls
              className="h-full w-full object-scale-down mix-blend-multiply"
              src={activeVideo}
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl lg:text-4xl font-medium">
            {data?.productName}
          </h2>
          <br></br>
          {/* More product details */}
          <button
            onClick={startDetection}
            className="py-2 px-4 bg-green-700 text-white rounded-md"
          >
            Start Video
          </button>
          <br></br>
          <button
            className="border-2 border-green-700 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-green-700 hover:text-green-900 hover:bg-white"
            onClick={(e) => handleAddToCart(e, data?._id)}
          >
            complete
          </button>
        </div>
      </div>

      {/* Live Video Section */}
      <div className="mt-4">
        <h2 className="text-2xl font-medium mb-2">Live Video Feed</h2>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-96 object-cover"
        />
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width="640"
          height="480"
        ></canvas>
      </div>

      {/* Detection Results */}
      {detectionResults && (
        <div className="mt-4">
          <h2 className="text-2xl font-medium mb-2">Detection Results</h2>
          <pre>{JSON.stringify(detectionResults, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
