// import React, { useState } from "react";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (input.trim()) {
//       setMessages([...messages, { user: true, text: input }]);
//       setInput("");

//       // Simulate bot response (You can integrate AI here)
//       setTimeout(() => {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { user: false, text: "How can I help you with your yoga practice?" },
//         ]);
//       }, 1000);
//     }
//   };

//   return (
//     <div className="fixed bottom-5 right-5 bg-gray-900 text-white w-80 p-4 rounded-lg shadow-lg">
//       <h3 className="text-lg font-bold mb-3">Yoga Assistant</h3>
//       <div className="chat-messages h-40 overflow-y-auto mb-3">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`mb-2 p-2 rounded-lg ${
//               msg.user ? "bg-green-600 text-right" : "bg-gray-700"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="flex">
//         <input
//           className="flex-grow p-2 rounded-l-lg bg-gray-800 text-white"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={handleSend}
//           className="bg-green-600 px-4 rounded-r-lg hover:bg-green-500 transition-all"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
import React, { useState } from "react";
import { FaRobot } from "react-icons/fa"; // Import an icon for the chatbot

const Chatbot = ({ apiKey }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Control the chatbot visibility

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { user: true, text: input }]);
      setInput("");

      // Simulate bot response (replace with actual API call using the apiKey)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: false, text: "How can I help you with your yoga practice?" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Small round button to open/close the chatbot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
      >
        <FaRobot className="text-white text-3xl" />
      </button>

      {/* Chatbot window */}
      {isOpen && (
        <div className="bg-gray-900 text-white w-80 p-4 rounded-lg shadow-lg mt-2">
          <h3 className="text-lg font-bold mb-3">Yoga Assistant</h3>
          <div className="chat-messages h-40 overflow-y-auto mb-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  msg.user ? "bg-green-600 text-right" : "bg-gray-700"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              className="flex-grow p-2 rounded-l-lg bg-gray-800 text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="bg-green-600 px-4 rounded-r-lg hover:bg-green-500 transition-all"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
