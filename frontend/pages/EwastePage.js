
// import React from "react";
// import { Link } from "react-router-dom";
// import { FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col">
//       {/* Navbar */}
//       {/* Add Navbar here if needed */}

//       {/* Hero Section */}
//       <header className="flex-grow flex flex-col items-center justify-center text-center px-8 py-24 bg-gray-800">
//         <h2 className="text-5xl md:text-6xl font-bold mb-10 leading-tight">
//           Personalized Yoga Guidance
//         </h2>
//         <p className="text-xl md:text-2xl mb-14 max-w-4xl mx-auto">
//           Improve your yoga practice with real-time feedback and video
//           tutorials.
//         </p>
//         <Link to="/">
//           <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-md text-lg transition-all">
//             Start Practicing
//           </button>
//         </Link>
//       </header>

//       {/* About Us Section */}
//       <section id="aboutUs" className="py-28 bg-gray-900 text-center">
//         <div className="container mx-auto px-8">
//           <h3 className="text-4xl font-semibold mb-10">About Us</h3>
//           <p className="text-xl mb-12 max-w-3xl mx-auto">
//             We are dedicated to enhancing your yoga practice with
//             state-of-the-art technology and personalized guidance. Our smart
//             yoga mat offers real-time feedback to help you achieve your fitness
//             goals effectively.
//           </p>
//           <FaInfoCircle className="text-8xl mx-auto text-green-600 mb-10" />
//         </div>
//       </section>

//       {/* Contact Us Section */}
//       <section id="contactUs" className="py-28 bg-gray-800 text-center">
//         <div className="container mx-auto px-8">
//           <h3 className="text-4xl font-semibold mb-10">Contact Us</h3>
//           <div className="flex flex-col md:flex-row justify-center items-center gap-16">
//             <div className="flex items-center space-x-6 mb-8 md:mb-0">
//               <FaPhoneAlt className="text-4xl text-green-600" />
//               <p className="text-xl">+1 234 567 890</p>
//             </div>
//             <div className="flex items-center space-x-6">
//               <FaMapMarkerAlt className="text-4xl text-green-600" />
//               <p className="text-xl">123 Yoga St, Fitness City, XY 12345</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-center py-8 mt-auto">
//         <p className="text-base">
//           &copy; 2024 Smart Yoga Mat. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
import React from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Chatbot from "./Chatbot"; // Import the Chatbot component

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      {/* Add Navbar here if needed */}
      {/* Hero Section */}
      <header className="flex-grow flex flex-col items-center justify-center text-center px-8 py-24 bg-gray-800">
        <h2 className="text-5xl md:text-6xl font-bold mb-10 leading-tight">
          Personalized Yoga Guidance
        </h2>
        <p className="text-xl md:text-2xl mb-14 max-w-4xl mx-auto">
          Improve your yoga practice with real-time feedback and video
          tutorials.
        </p>
        <Link to="/">
          <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-md text-lg transition-all">
            Start Practicing
          </button>
        </Link>
      </header>
      {/* About Us Section */}
      <section id="aboutUs" className="py-28 bg-gray-900 text-center">
        <div className="container mx-auto px-8">
          <h3 className="text-4xl font-semibold mb-10">About Us</h3>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            We are dedicated to enhancing your yoga practice with
            state-of-the-art technology and personalized guidance. Our smart
            yoga mat offers real-time feedback to help you achieve your fitness
            goals effectively.
          </p>
          <FaInfoCircle className="text-8xl mx-auto text-green-600 mb-10" />
        </div>
      </section>
      {/* Contact Us Section */}
      <section id="contactUs" className="py-28 bg-gray-800 text-center">
        <div className="container mx-auto px-8">
          <h3 className="text-4xl font-semibold mb-10">Contact Us</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-16">
            <div className="flex items-center space-x-6 mb-8 md:mb-0">
              <FaPhoneAlt className="text-4xl text-green-600" />
              <p className="text-xl">+1 234 567 890</p>
            </div>
            <div className="flex items-center space-x-6">
              <FaMapMarkerAlt className="text-4xl text-green-600" />
              <p className="text-xl">123 Yoga St, Fitness City, XY 12345</p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-center py-8 mt-auto">
        <p className="text-base">
          &copy; 2024 Smart Yoga Mat. All rights reserved.
        </p>
      </footer>
      {/* Include Chatbot Component */}
      <Chatbot /> {/* Chatbot component */}
    </div>
  );
};

export default LandingPage;


