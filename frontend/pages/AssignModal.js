// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "./AssignModal.css"; // Import the CSS file

// const AssignModal = ({ users, traderId, onClose, onSubmit }) => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [status, setStatus] = useState("");
//   const [remarks, setRemarks] = useState("");

//   const handleUserChange = (e) => {
//     const userId = e.target.value;
//     setSelectedUser(users.find((user) => user._id === userId));
//   };

//   const handleSubmit = () => {
//     if (!selectedUser || !status || !remarks) {
//       toast.error("Please fill all fields.");
//       return;
//     }

//     onSubmit(traderId, selectedUser._id, status, remarks);
//     onClose();
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>
//           &times;
//         </span>
//         <h2>Assign User</h2>
//         <div className="form-group">
//           <label>User:</label>
//           <select onChange={handleUserChange} className="form-control">
//             <option value="">Select a user</option>
//             {users.map((user) => (
//               <option key={user._id} value={user._id}>
//                 {user.username}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Status:</label>
//           <input
//             type="text"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="form-control"
//           />
//         </div>
//         <div className="form-group">
//           <label>Remarks:</label>
//           <input
//             type="text"
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//             className="form-control"
//           />
//         </div>
//         <button onClick={handleSubmit} className="submit-button">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AssignModal;
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "./AssignModal.css"; // Import the CSS file

// const AssignModal = ({ users, traderId, onClose, onSubmit }) => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [status, setStatus] = useState("");
//   const [remarks, setRemarks] = useState("");

//   const handleUserChange = (e) => {
//     const userId = e.target.value;
//     const user = users.find((user) => user._id === userId);
//     setSelectedUser(user);
//     setStatus(user.status || "");
//     setRemarks(user.remarks || "");
//   };

//   const handleSubmit = () => {
//     if (!selectedUser || !status || !remarks) {
//       toast.error("Please fill all fields.");
//       return;
//     }

//     onSubmit(traderId, selectedUser._id, status, remarks);
//     onClose();
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>
//           &times;
//         </span>
//         <h2>Assign User</h2>
//         <div className="form-group">
//           <label>User:</label>
//           <select onChange={handleUserChange} className="form-control">
//             <option value="">Select a user</option>
//             {users.map((user) => (
//               <option key={user._id} value={user._id}>
//                 {user.username}
//               </option>
//             ))}
//           </select>
//         </div>

//         {selectedUser && (
//           <>
//             <div className="form-group">
//               <label>Phone Number:</label>
//               <input
//                 type="text"
//                 value={selectedUser.phoneNumber || ""}
//                 readOnly
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label>Location:</label>
//               <input
//                 type="text"
//                 value={selectedUser.location || ""}
//                 readOnly
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label>Product Name:</label>
//               <input
//                 type="text"
//                 value={selectedUser.productName || ""}
//                 readOnly
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label>Category:</label>
//               <input
//                 type="text"
//                 value={selectedUser.category || ""}
//                 readOnly
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label>Due Date:</label>
//               <input
//                 type="date"
//                 value={selectedUser.dueDate || ""}
//                 onChange={(e) =>
//                   setSelectedUser({
//                     ...selectedUser,
//                     dueDate: e.target.value,
//                   })
//                 }
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label>Status:</label>
//               <input
//                 type="text"
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label>Remarks:</label>
//               <input
//                 type="text"
//                 value={remarks}
//                 onChange={(e) => setRemarks(e.target.value)}
//                 className="form-control"
//               />
//             </div>
//           </>
//         )}
//         <button onClick={handleSubmit} className="submit-button">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AssignModal;
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./AssignModal.css"; // Import the CSS file
import SummaryApi from "../common";
const AssignModal = ({ users, traderId, onClose, onSubmit }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleUserChange = (e) => {
    const userId = e.target.value;
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user);
    setStatus(user.status || "");
    setRemarks(user.remarks || "");
    setDueDate(user.dueDate || "");
  };

  const handleSubmit = async () => {
    if (!selectedUser || !status || !remarks || !dueDate) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch(SummaryApi.assignTasks.url, {
        method: SummaryApi.assignTasks.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          traderId,
          userId: selectedUser._id,
          status,
          remarks,
          dueDate,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Assignment successful.");
        onSubmit(traderId, selectedUser._id, status, remarks);
        onClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error assigning user.");
      console.error("Error submitting assignment:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Assign User</h2>
        <div className="form-group">
          <label>User:</label>
          <select onChange={handleUserChange} className="form-control">
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        {selectedUser && (
          <>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                value={selectedUser.phoneNumber || ""}
                readOnly
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                value={selectedUser.location || ""}
                readOnly
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Product Name:</label>
              <input
                type="text"
                value={selectedUser.productName || ""}
                readOnly
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                value={selectedUser.category || ""}
                readOnly
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Due Date:</label>
              <input
                type="date"
                value={dueDate || ""}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Remarks:</label>
              <input
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="form-control"
              />
            </div>
          </>
        )}
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AssignModal;

