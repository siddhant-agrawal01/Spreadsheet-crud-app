// // /* eslint-disable no-case-declarations */
// // import { useState, useEffect, useReducer } from "react";
// // import axios from "axios";
// // import Navbar from "./components/Navbar";

// // const App = () => {
// //   const [users, setUsers] = useState([]);
// //   const [name, setName] = useState("");
// //   const [userName, setUserName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [editUserId, setEditUserId] = useState(null);
// //   const [editCell, setEditCell] = useState({ row: null, column: null });
// //   const [copiedData, setCopiedData] = useState(null);
// //   // const [selectedDate, setSelectedDate] = useState("");
// //   // const [availableDates, setAvailableDates] = useState([]);
// //   const [headers, setHeaders] = useState(["name", "userName", "email"]);

  


// //   const initialHistoryState = { past: [], present: [], future: [] };
// //   const historyReducer = (state, action) => {
// //     switch (action.type) {
// //       case "UNDO":
// //         if (state.past.length === 0) return state;
// //         // eslint-disable-next-line no-case-declarations
// //         const previous = state.past[state.past.length - 1];
// //         const newPast = state.past.slice(0, state.past.length - 1);
// //         return {
// //           past: newPast,
// //           present: previous,
// //           future: [state.present, ...state.future],
// //         };
// //       case "REDO":
// //         if (state.future.length === 0) return state;
// //         const next = state.future[0];
// //         const newFuture = state.future.slice(1);
// //         return {
// //           past: [...state.past, state.present],
// //           present: next,
// //           future: newFuture,
// //         };
// //       case "SET":
// //         return {
// //           past: [...state.past, state.present],
// //           present: action.newPresent,
// //           future: [],
// //         };
// //       default:
// //         return state;
// //     }
// //   };
// //   const [history, dispatch] = useReducer(historyReducer, initialHistoryState);

// //   useEffect(() => {
// //     fetchUsers();
// //     // fetchAvailableDates();
// //     document.addEventListener("keydown", handleKeyDown);
// //     return () => document.removeEventListener("keydown", handleKeyDown);
// //   }, []);

// //   useEffect(() => {
// //     setUsers(history.present);
// //   }, [history.present]);

// //   const fetchUsers = async () => {
// //     const response = await axios.get(
// //       "http://localhost:3000/users"
// //     );
// //     dispatch({ type: "SET", newPresent: response.data });
// //   };

// //   // const fetchAvailableDates = async () => {
// //   //   const response = await axios.get(
// //   //     "http://localhost:3000/availableDates"
// //   //   );
// //   //   setAvailableDates(response.data);
// //   // };

// //   const addUser = async () => {
// //     const response = await axios.post(
// //       "http://localhost:3000/users",
// //       {
// //         name,
// //         userName,
// //         email,
// //       }
// //     );
// //     dispatch({ type: "SET", newPresent: [...users, response.data] });
// //     setName("");
// //     setUserName("");
// //     setEmail("");
// //   };

// //   const updateUser = async () => {
// //     const response = await axios.put(
// //       `http://localhost:3000/users/${editUserId}`,
// //       { name, userName, email }
// //     );
// //     const updatedUsers = users.map((user) =>
// //       user.id === editUserId ? response.data : user
// //     );
// //     dispatch({ type: "SET", newPresent: updatedUsers });
// //     setName("");
// //     setUserName("");
// //     setEmail("");
// //     setIsEditing(false);
// //     setEditUserId(null);
// //   };

// //   const deleteUser = async (id) => {
// //     await axios.delete(`http://localhost:3000/users/${id}`);
// //     dispatch({
// //       type: "SET",
// //       newPresent: users.filter((user) => user.id !== id),
// //     });
// //   };

// //   const startEditing = (user) => {
// //     setIsEditing(true);
// //     setEditUserId(user.id);
// //     setName(user.name);
// //     setUserName(user.userName);
// //     setEmail(user.email);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (isEditing) {
// //       updateUser();
// //     } else {
// //       addUser();
// //     }
// //   };

// //   const handleCellClick = (rowIndex, column) => {
// //     setEditCell({ row: rowIndex, column });
// //   };

// //   const handleCellChange = (e, rowIndex, column) => {
// //     const updatedUsers = [...users];
// //     updatedUsers[rowIndex][column] = e.target.value;
// //     dispatch({ type: "SET", newPresent: updatedUsers });
// //   };

// //   const saveCellChange = async (rowIndex) => {
// //     const user = users[rowIndex];
// //     if (user.id) {
// //       await axios.put(
// //         `http://localhost:3000/users/${user.id}`,
// //         user
// //       );
// //     } else {
// //       const response = await axios.post(
// //         "http://localhost:3000/users",
// //         user
// //       );
// //       const updatedUsers = [...users];
// //       updatedUsers[rowIndex] = response.data;
// //       dispatch({ type: "SET", newPresent: updatedUsers });
// //     }
// //     setEditCell({ row: null, column: null });
// //   };

// //   const addRow = () => {
// //     dispatch({
// //       type: "SET",
// //       newPresent: [...users, { id: null, name: "", userName: "", email: "" }],
// //     });
// //   };

// //   const deleteRow = (rowIndex) => {
// //     if (window.confirm("Are you sure you want to delete this row?")) {
// //       const updatedUsers = [...users];
// //       const user = updatedUsers[rowIndex];
// //       if (user.id) {
// //         deleteUser(user.id);
// //       } else {
// //         updatedUsers.splice(rowIndex, 1);
// //         dispatch({ type: "SET", newPresent: updatedUsers });
// //       }
// //     }
// //   };

// //   const deleteColumn = (column) => {
// //     if (window.confirm("Are you sure you want to delete this column?")) {
// //       const updatedUsers = users.map((user) => {
// //         const updatedUser = { ...user };
// //         delete updatedUser[column];
// //         return updatedUser;
// //       });

// //       const updatedHeaders = headers.filter((header) => header !== column);

// //       setHeaders(updatedHeaders);
// //       dispatch({ type: "SET", newPresent: updatedUsers });
// //     }
// //   };

// //   const handleKeyDown = (e) => {
// //     if (e.ctrlKey && e.key === "z") {
// //       dispatch({ type: "UNDO" });
// //     } else if (e.ctrlKey && e.key === "y") {
// //       dispatch({ type: "REDO" });
// //     } else if (e.ctrlKey && e.key === "c") {
// //       handleCopy();
// //     } else if (e.ctrlKey && e.key === "v") {
// //       handlePaste();
// //     }
// //   };

// //   const handleCopy = () => {
// //     if (editCell.row !== null && editCell.column !== null) {
// //       setCopiedData(users[editCell.row][editCell.column]);
// //     }
// //   };

// //   const handlePaste = () => {
// //     if (
// //       editCell.row !== null &&
// //       editCell.column !== null &&
// //       copiedData !== null
// //     ) {
// //       const updatedUsers = [...users];
// //       updatedUsers[editCell.row][editCell.column] = copiedData;
// //       dispatch({ type: "SET", newPresent: updatedUsers });
// //     }
// //   };

// //   // const handleDateChange = async (e) => {
// //   //   setSelectedDate(e.target.value);
// //   //   const response = await axios.get(
// //   //     `http://localhost:3000/users?date=${e.target.value}`
// //   //   );
// //   //   dispatch({ type: "SET", newPresent: response.data });
// //   // };

// //   const handleKeyPress = (e, rowIndex) => {
// //     if (e.key === "Enter") {
// //       saveCellChange(rowIndex);
// //     }
// //   };

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="container mx-auto mt-10">
// //         <h1 className="text-2xl font-bold mb-8 ">Fill The Enteries</h1>

// //         <form
// //           onSubmit={handleSubmit}
// //           className="mb-4 flex items-center justify-space"
// //         >
// //           <input
// //             type="text"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             placeholder="Name"
// //             className="border p-2 mr-2"
// //           />
// //           <input
// //             type="text"
// //             value={userName}
// //             onChange={(e) => setUserName(e.target.value)}
// //             placeholder="Username"
// //             className="border p-2 mr-2"
// //           />
// //           <input
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             placeholder="Email"
// //             className="border p-2 mr-2"
// //           />
// //           <div className=" p-2 flex item-center justify-center ">
// //             <button
// //               type="submit"
// //               className="bg-blue-500 text-white p-2  mr-2 rounded"
// //             >
// //               {isEditing ? "Update User" : "Add User"}
// //             </button>
// //             <button
// //               onClick={() => dispatch({ type: "UNDO" })}
// //               className="bg-yellow-400 text-white p-2 mr-2 rounded"
// //             >
// //               Undo
// //             </button>
// //             <button
// //               onClick={() => dispatch({ type: "REDO" })}
// //               className="bg-green-500 text-white p-2 rounded"
// //             >
// //               Redo
// //             </button>
// //           </div>
// //         </form>
// //         {/* <div className="mb-4">
// //         <button
// //           onClick={() => dispatch({ type: "UNDO" })}
// //           className="bg-yellow-400 text-white p-2 mr-2"
// //         >
// //           Undo
// //         </button>
// //         <button
// //           onClick={() => dispatch({ type: "REDO" })}
// //           className="bg-green-500 text-white p-2"
// //         >
// //           Redo
// //         </button>
// //       </div> */}
// //         {/* <div className="mb-4">
// //           <label htmlFor="date">Select Date: </label>
// //           <select
// //             id="date"
// //             value={selectedDate}
// //             onChange={handleDateChange}
// //             className="border p-2"
// //           >
// //             <option value="">Select a date</option>
// //             {availableDates.map((date) => (
// //               <option key={date} value={date}>
// //                 {date}
// //               </option>
// //             ))}
// //           </select>
// //         </div> */}

// //         <table className="min-w-full bg-zinc-50">
// //           <thead>
// //             <tr>
// //               <th className="py-2">#</th>
// //               <th className="py-2">
// //                 Name
// //                 <button
// //                   onClick={() => deleteColumn("name")}
// //                   className="bg-red-500 text-white  ml-2 rounded-2xl  h-6 w-6 "
// //                 >
// //                   x
// //                 </button>
// //               </th>
// //               <th className="py-2">
// //                 Username
// //                 <button
// //                   onClick={() => deleteColumn("userName")}
// //                   className="bg-red-500 text-white p-2 ml-2 rounded-2xl  h-6 w-6 pt-0"
// //                 >
// //                   x
// //                 </button>
// //               </th>
// //               <th className="py-2 ">
// //                 Email
// //                 <button
// //                   onClick={() => deleteColumn("email")}
// //                   className="bg-red-500 text-white p-2 ml-2 rounded-2xl pt-0 h-6 w-6 "
// //                 >
// //                   x
// //                 </button>
// //               </th>
// //               <th className="py-2 flex justify-around">Actions</th>
// //               <th className="py-2">
// //                 <button
// //                   onClick={addRow}
// //                   className="bg-green-500 text-white rounded-2xl  h-6 w-6 pt-0"
// //                 >
// //                   +
// //                 </button>
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {users.map((user, index) => (
// //               <tr key={user.id || index}>
// //                 <td className="border px-4 py-2">{index + 1}</td>
// //                 <td
// //                   className="border px-4 py-2"
// //                   onDoubleClick={() => handleCellClick(index, "name")}
// //                 >
// //                   {editCell.row === index && editCell.column === "name" ? (
// //                     <input
// //                       type="text"
// //                       value={user.name}
// //                       onChange={(e) => handleCellChange(e, index, "name")}
// //                       onBlur={() => saveCellChange(index)}
// //                       onKeyPress={(e) => handleKeyPress(e, index)}
// //                       className="border p-2"
// //                       autoFocus
// //                     />
// //                   ) : (
// //                     user.name
// //                   )}
// //                 </td>
// //                 <td
// //                   className="border px-4 py-2"
// //                   onDoubleClick={() => handleCellClick(index, "userName")}
// //                 >
// //                   {editCell.row === index && editCell.column === "userName" ? (
// //                     <input
// //                       type="text"
// //                       value={user.userName}
// //                       onChange={(e) => handleCellChange(e, index, "userName")}
// //                       onBlur={() => saveCellChange(index)}
// //                       onKeyPress={(e) => handleKeyPress(e, index)}
// //                       className="border p-2"
// //                       autoFocus
// //                     />
// //                   ) : (
// //                     user.userName
// //                   )}
// //                 </td>
// //                 <td
// //                   className="border px-4 py-2"
// //                   onDoubleClick={() => handleCellClick(index, "email")}
// //                 >
// //                   {editCell.row === index && editCell.column === "email" ? (
// //                     <input
// //                       type="email"
// //                       value={user.email}
// //                       onChange={(e) => handleCellChange(e, index, "email")}
// //                       onBlur={() => saveCellChange(index)}
// //                       onKeyPress={(e) => handleKeyPress(e, index)}
// //                       className="border p-2"
// //                       autoFocus
// //                     />
// //                   ) : (
// //                     user.email
// //                   )}
// //                 </td>
// //                 <td className="border px-4 py-2">
// //                   <button
// //                     onClick={() => startEditing(user)}
// //                     className="bg-yellow-400 text-white p-2 mr-2 rounded"
// //                   >
// //                     Edit
// //                   </button>
// //                   <button
// //                     onClick={() => deleteRow(index)}
// //                     className="bg-red-500 text-white rounded p-2"
// //                   >
// //                     Delete
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </>
// //   );
// // };

// // export default App;



// /* eslint-disable no-case-declarations */
// import { useState, useEffect, useReducer } from "react";
// import axios from "axios";
// import Navbar from "./components/Navbar";

// const App = () => {
//   const [users, setUsers] = useState([]);
//   const [name, setName] = useState("");
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [editUserId, setEditUserId] = useState(null);
//   const [editCell, setEditCell] = useState({ row: null, column: null });
//   const [copiedData, setCopiedData] = useState(null);
//   const [headers, setHeaders] = useState(["name", "userName", "email"]);
//   const [newColumnName, setNewColumnName] = useState("");


//   const initialHistoryState = { past: [], present: [], future: [] };
//   const historyReducer = (state, action) => {
//     switch (action.type) {
//       case "UNDO":
//         if (state.past.length === 0) return state;
//         // eslint-disable-next-line no-case-declarations
//         const previous = state.past[state.past.length - 1];
//         const newPast = state.past.slice(0, state.past.length - 1);
//         return {
//           past: newPast,
//           present: previous,
//           future: [state.present, ...state.future],
//         };
//       case "REDO":
//         if (state.future.length === 0) return state;
//         const next = state.future[0];
//         const newFuture = state.future.slice(1);
//         return {
//           past: [...state.past, state.present],
//           present: next,
//           future: newFuture,
//         };
//       case "SET":
//         return {
//           past: [...state.past, state.present],
//           present: action.newPresent,
//           future: [],
//         };
//       default:
//         return state;
//     }
//   };
//   const [history, dispatch] = useReducer(historyReducer, initialHistoryState);
//   // const historyReducer = (state, action) => {
//   //   switch (action.type) {
//   //     // case "UNDO":
//   //     //   if (state.past.length === 0) return state;
//   //     //   const previous = state.past[state.past.length - 1];
//   //     //   const newPast = state.past.slice(0, state.past.length - 1);
//   //     //   return {
//   //     //     past: newPast,
//   //     //     present: previous,
//   //     //     future: [state.present, ...state.future],
//   //     //   };
//   //     // case "REDO":
//   //     //   if (state.future.length === 0) return state;
//   //     //   const next = state.future[0];
//   //     //   const newFuture = state.future.slice(1);
//   //     //   return {
//   //     //     past: [...state.past, state.present],
//   //     //     present: next,
//   //     //     future: newFuture,
//   //     //   };
//   //     case "UNDO":
//   //               if (state.past.length === 0) return state;
//   //               // eslint-disable-next-line no-case-declarations
//   //               const previous = state.past[state.past.length - 1];
//   //               const newPast = state.past.slice(0, state.past.length - 1);
//   //               return {
//   //                 past: newPast,
//   //                 present: previous,
//   //                 future: [state.present, ...state.future],
//   //               };
//   //             case "REDO":
//   //               if (state.future.length === 0) return state;
//   //               const next = state.future[0];
//   //               const newFuture = state.future.slice(1);
//   //               return {
//   //                 past: [...state.past, state.present],
//   //                 present: next,
//   //                 future: newFuture,
//   //               };
//   //     case "SET":
//   //       return {
//   //         past: [...state.past, state.present],
//   //         present: action.newPresent,
//   //         future: [],
//   //       };
//   //     default:
//   //       return state;
//   //   }
//   // };
//   // const [history, dispatch] = useReducer(historyReducer, initialHistoryState);

//   useEffect(() => {
//     fetchUsers();
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   useEffect(() => {
//     setUsers(history.present);
//   }, [history.present]);

//   const fetchUsers = async () => {
//     const response = await axios.get(
//       "http://localhost:3000/users"
//     );
//     dispatch({ type: "SET", newPresent: response.data });
//   };

//   const addUser = async () => {
//     const response = await axios.post(
//       "http://localhost:3000/users",
//       {
//         name,
//         userName,
//         email,
//       }
//     );
//     dispatch({ type: "SET", newPresent: [...users, response.data] });
//     setName("");
//     setUserName("");
//     setEmail("");
//   };

//   const updateUser = async () => {
//     const response = await axios.put(
//       `http://localhost:3000/users/${editUserId}`,
//       { name, userName, email }
//     );
//     const updatedUsers = users.map((user) =>
//       user.id === editUserId ? response.data : user
//     );
//     dispatch({ type: "SET", newPresent: updatedUsers });
//     setName("");
//     setUserName("");
//     setEmail("");
//     setIsEditing(false);
//     setEditUserId(null);
//   };

//   const deleteUser = async (id) => {
//     await axios.delete(`http://localhost:3000/users/${id}`);
//     dispatch({
//       type: "SET",
//       newPresent: users.filter((user) => user.id !== id),
//     });
//   };

//   const startEditing = (user) => {
//     setIsEditing(true);
//     setEditUserId(user.id);
//     setName(user.name);
//     setUserName(user.userName);
//     setEmail(user.email);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       updateUser();
//     } else {
//       addUser();
//     }
//   };

//   const handleCellClick = (rowIndex, column) => {
//     setEditCell({ row: rowIndex, column });
//   };

//   const handleCellChange = (e, rowIndex, column) => {
//     const updatedUsers = [...users];
//     updatedUsers[rowIndex][column] = e.target.value;
//     dispatch({ type: "SET", newPresent: updatedUsers });
//   };

//   const saveCellChange = async (rowIndex) => {
//     const user = users[rowIndex];
//     if (user.id) {
//       await axios.put(
//         `http://localhost:3000/users/${user.id}`,
//         user
//       );
//     } else {
//       const response = await axios.post(
//         "http://localhost:3000/users",
//         user
//       );
//       const updatedUsers = [...users];
//       updatedUsers[rowIndex] = response.data;
//       dispatch({ type: "SET", newPresent: updatedUsers });
//     }
//     setEditCell({ row: null, column: null });
//   };

//   const addRow = () => {
//     dispatch({
//       type: "SET",
//       newPresent: [...users, { id: null, name: "", userName: "", email: "" }],
//     });
//   };

//   const deleteRow = (rowIndex) => {
//     if (window.confirm("Are you sure you want to delete this row?")) {
//       const updatedUsers = [...users];
//       const user = updatedUsers[rowIndex];
//       if (user.id) {
//         deleteUser(user.id);
//       } else {
//         updatedUsers.splice(rowIndex, 1);
//         dispatch({ type: "SET", newPresent: updatedUsers });
//       }
//     }
//   };
  

//   const addColumn = () => {
//     if (newColumnName.trim() !== "") {
//       const updatedHeaders = [...headers, newColumnName];
//       setHeaders(updatedHeaders);

//       const updatedUsers = users.map(user => ({ ...user, [newColumnName]: "" }));
//       dispatch({ type: "SET", newPresent: updatedUsers });

//       axios.post("http://localhost:3000/users/updateStructure", {
//         headers: updatedHeaders,
//         users: updatedUsers
//       });

//       setNewColumnName("");
//     }
//   };

//   const deleteColumn = (column) => {
//     if (window.confirm("Are you sure you want to delete this column?")) {
//       const updatedUsers = users.map((user) => {
//         const updatedUser = { ...user };
//         delete updatedUser[column];
//         return updatedUser;
//       });

//       const updatedHeaders = headers.filter((header) => header !== column);

//       setHeaders(updatedHeaders);
//       dispatch({ type: "SET", newPresent: updatedUsers });
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.ctrlKey && e.key === "z") {
//       dispatch({ type: "UNDO" });
//     } else if (e.ctrlKey && e.key === "y") {
//       dispatch({ type: "REDO" });
//     } else if (e.ctrlKey && e.key === "c") {
//       handleCopy();
//     } else if (e.ctrlKey && e.key === "v") {
//       handlePaste();
//     }
//   };

//   const handleCopy = () => {
//     if (editCell.row !== null && editCell.column !== null) {
//       setCopiedData(users[editCell.row][editCell.column]);
//     }
//   };

//   const handlePaste = () => {
//     if (
//       editCell.row !== null &&
//       editCell.column !== null &&
//       copiedData !== null
//     ) {
//       const updatedUsers = [...users];
//       updatedUsers[editCell.row][editCell.column] = copiedData;
//       dispatch({ type: "SET", newPresent: updatedUsers });
//     }
//   };

//   const handleKeyPress = (e, rowIndex) => {
//     if (e.key === "Enter") {
//       saveCellChange(rowIndex);
//     }
//   };

//   // return (
//   //   <>
//   //     <Navbar />
//   //     <div className="container mx-auto mt-10">
//   //       <h1 className="text-2xl font-bold mb-8 ">Fill The Enteries</h1>

//   //       <form
//   //         onSubmit={handleSubmit}
//   //         className="mb-4 flex items-center justify-space"
//   //       >
//   //         <input
//   //           type="text"
//   //           value={name}
//   //           onChange={(e) => setName(e.target.value)}
//   //           placeholder="Name"
//   //           className="border p-2 mr-2"
//   //         />
//   //         <input
//   //           type="text"
//   //           value={userName}
//   //           onChange={(e) => setUserName(e.target.value)}
//   //           placeholder="Username"
//   //           className="border p-2 mr-2"
//   //         />
//   //         <input
//   //           type="email"
//   //           value={email}
//   //           onChange={(e) => setEmail(e.target.value)}
//   //           placeholder="Email"
//   //           className="border p-2 mr-2"
//   //         />
//   //         <div className=" p-2 flex item-center justify-center ">
//   //           <button
//   //             type="submit"
//   //             className="bg-blue-500 text-white p-2  mr-2 rounded"
//   //           >
//   //             {isEditing ? "Update User" : "Add User"}
//   //           </button>
//   //           <button
//   //             onClick={() => dispatch({ type: "UNDO" })}
//   //             className="bg-yellow-400 text-white p-2 mr-2 rounded"
//   //           >
//   //             Undo
//   //           </button>
//   //           <button
//   //             onClick={() => dispatch({ type: "REDO" })}
//   //             className="bg-green-500 text-white p-2 rounded"
//   //           >
//   //             Redo
//   //           </button>
//   //         </div>
//   //       </form>

//   //       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//   //         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//   //           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//   //             <tr>
//   //               <th scope="col" className="px-6 py-3">
//   //                 #
//   //               </th>
//   //               {headers.map((header) => (
//   //                 <th key={header} scope="col" className="px-6 py-3">
//   //                   {header}
//   //                   <button
//   //                     onClick={() => deleteColumn(header)}
//   //                     className="text-red-500 ml-2"
//   //                   >
//   //                     &#10060;
//   //                   </button>
//   //                 </th>
//   //               ))}
//   //               <th scope="col" className="px-6 py-3">
//   //                 Actions
//   //               </th>
//   //             </tr>
//   //           </thead>
//   //           <tbody>
//   //             {users.map((user, rowIndex) => (
//   //               <tr
//   //                 key={user.id}
//   //                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//   //               >
//   //                 <td className="px-6 py-4">{rowIndex + 1}</td>
//   //                 {headers.map((header) => (
//   //                   <td
//   //                     key={header}
//   //                     className="px-6 py-4"
//   //                     onClick={() => handleCellClick(rowIndex, header)}
//   //                   >
//   //                     {editCell.row === rowIndex &&
//   //                     editCell.column === header ? (
//   //                       <input
//   //                         type="text"
//   //                         value={user[header]}
//   //                         onChange={(e) =>
//   //                           handleCellChange(e, rowIndex, header)
//   //                         }
//   //                         onBlur={() => saveCellChange(rowIndex)}
//   //                         onKeyDown={(e) => handleKeyPress(e, rowIndex)}
//   //                         className="border p-1"
//   //                       />
//   //                     ) : (
//   //                       user[header]
//   //                     )}
//   //                   </td>
//   //                 ))}
//   //                 <td className="px-6 py-4 space-x-2">
//   //                   <button
//   //                     onClick={() => startEditing(user)}
//   //                     className="text-blue-500"
//   //                   >
//   //                     Edit
//   //                   </button>
//   //                   <button
//   //                     onClick={() => deleteUser(user.id)}
//   //                     className="text-red-500"
//   //                   >
//   //                     Delete
//   //                   </button>
//   //                   <button
//   //                     onClick={() => deleteRow(rowIndex)}
//   //                     className="text-red-500"
//   //                   >
//   //                     Delete Row
//   //                   </button>
//   //                 </td>
//   //               </tr>
//   //             ))}
//   //           </tbody>
//   //         </table>
//   //         <button
//   //           onClick={addRow}
//   //           className="bg-green-500 text-white p-2 m-4 rounded"
//   //         >
//   //           Add Row
//   //         </button>
//   //       </div>
//   //     </div>
//   //   </>

//   // );
//   // return (
//   //   <>
//   //     <Navbar />
//   //     <div className="container  bg-slate-900 p-6  shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50 overflow-hidden">
//   //       <h1 className="text-2xl font-bold mb-8 text-white">Fill The Enteries</h1>
  
//   //       <form
//   //         onSubmit={handleSubmit}
//   //         className="mb-4 flex items-center justify-space"
//   //       >
//   //         <input
//   //           type="text"
//   //           value={name}
//   //           onChange={(e) => setName(e.target.value)}
//   //           placeholder="Name"
//   //           className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400"
//   //         />
//   //         <input
//   //           type="text"
//   //           value={userName}
//   //           onChange={(e) => setUserName(e.target.value)}
//   //           placeholder="Username"
//   //           className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400"
//   //         />
//   //         <input
//   //           type="email"
//   //           value={email}
//   //           onChange={(e) => setEmail(e.target.value)}
//   //           placeholder="Email"
//   //           className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400"
//   //         />
//   //         <div className="p-2 flex item-center justify-center">
//   //           <button
//   //             type="submit"
//   //             className="bg-blue-500 text-white p-2 mr-2 rounded"
//   //           >
//   //             {isEditing ? "Update User" : "Add User"}
//   //           </button>
//   //           <button
//   //             onClick={() => dispatch({ type: "UNDO" })}
//   //             className="bg-yellow-400 text-white p-2 mr-2 rounded"
//   //           >
//   //             Undo
//   //           </button>
//   //           <button
//   //             onClick={() => dispatch({ type: "REDO" })}
//   //             className="bg-green-500 text-white p-2 rounded"
//   //           >
//   //             Redo
//   //           </button>
//   //         </div>
//   //       </form>
  
//   //       <table className="min-w-full bg-slate-950 text-gray-500 dark:text-gray-400">
//   //         <thead className="text-xs text-gray-400 uppercase bg-gray-800">
//   //           <tr>
//   //             <th scope="col" className="px-6 py-3">
//   //               #
//   //             </th>
//   //             {headers.map((header) => (
//   //               <th key={header} scope="col" className="px-6 py-3">
//   //                 {header}
//   //                 <button
//   //                   onClick={() => deleteColumn(header)}
//   //                   className="text-red-500 ml-2"
//   //                 >
//   //                   &#10060;
//   //                 </button>
//   //               </th>
//   //             ))}
//   //             <th scope="col" className="px-6 py-3">
//   //               Actions
//   //             </th>
//   //           </tr>
//   //         </thead>
//   //         <tbody>
//   //           {users.map((user, rowIndex) => (
//   //             <tr
//   //               key={user.id}
//   //               className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700"
//   //             >
//   //               <td className="px-6 py-4">{rowIndex + 1}</td>
//   //               {headers.map((header) => (
//   //                 <td
//   //                   key={header}
//   //                   className="px-6 py-4"
//   //                   onClick={() => handleCellClick(rowIndex, header)}
//   //                 >
//   //                   {editCell.row === rowIndex &&
//   //                   editCell.column === header ? (
//   //                     <input
//   //                       type="text"
//   //                       value={user[header]}
//   //                       onChange={(e) =>
//   //                         handleCellChange(e, rowIndex, header)
//   //                       }
//   //                       onBlur={() => saveCellChange(rowIndex)}
//   //                       onKeyDown={(e) => handleKeyPress(e, rowIndex)}
//   //                       className="border p-1 bg-gray-800 text-white"
//   //                     />
//   //                   ) : (
//   //                     user[header]
//   //                   )}
//   //                 </td>
//   //               ))}
//   //               <td className="px-6 py-4 space-x-2">
//   //                 <button
//   //                   onClick={() => startEditing(user)}
//   //                   className="text-blue-500"
//   //                 >
//   //                   Edit
//   //                 </button>
//   //                 <button
//   //                   onClick={() => deleteUser(user.id)}
//   //                   className="text-red-500"
//   //                 >
//   //                   Delete
//   //                 </button>
//   //                 <button
//   //                   onClick={() => deleteRow(rowIndex)}
//   //                   className="text-red-500"
//   //                 >
//   //                   Delete Row
//   //                 </button>
//   //               </td>
//   //             </tr>
//   //           ))}
//   //         </tbody>
//   //       </table>
//   //       <button
//   //         onClick={addRow}
//   //         className="bg-green-500 text-white p-2 m-4 rounded"
//   //       >
//   //         Add Row
//   //       </button>
//   //     </div>
//   //   </>
//   // );
//   // return (
//   //   <>
//   //     <Navbar />
//   //     <div className="min-h-screen flex items-center justify-center bg-slate-950 ">
//   //       <div className="container mx-auto mt-10 bg-slate-950 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
//   //         <h1 className="text-2xl font-bold mb-8 text-white">Fill The Enteries</h1>
  
//   //         <form
//   //           onSubmit={handleSubmit}
//   //           className="mb-4 flex items-center justify-space"
//   //         >
//   //           <input
//   //             type="text"
//   //             value={name}
//   //             onChange={(e) => setName(e.target.value)}
//   //             placeholder="Name"
//   //             className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400"
//   //           />
//   //           <input
//   //             type="text"
//   //             value={userName}
//   //             onChange={(e) => setUserName(e.target.value)}
//   //             placeholder="Username"
//   //             className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400"
//   //           />
//   //           <input
//   //             type="email"
//   //             value={email}
//   //             onChange={(e) => setEmail(e.target.value)}
//   //             placeholder="Email"
//   //             className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400"
//   //           />
//   //           <div className="p-2 flex item-center justify-center">
//   //             <button
//   //               type="submit"
//   //               className="bg-blue-500 text-white p-2 mr-2 rounded"
//   //             >
//   //               {isEditing ? "Update User" : "Add User"}
//   //             </button>
//   //             <button
//   //               onClick={() => dispatch({ type: "UNDO" })}
//   //               className="bg-blue-500 text-white p-2 mr-2 rounded"
//   //             >
//   //               Undo
//   //             </button>
//   //             <button
//   //               onClick={() => dispatch({ type: "REDO" })}
//   //               className="bg-blue-500 text-white p-2 rounded"
//   //             >
//   //               Redo
//   //             </button>
//   //           </div>
//   //         </form>
  
//   //         <table className="min-w-full bg-slate-950 text-gray-500 dark:text-gray-400">
//   //           <thead className="text-xs text-gray-400 uppercase bg-gray-800">
//   //             <tr>
//   //               <th scope="col" className="px-6 py-3">
//   //                 #
//   //               </th>
//   //               {headers.map((header) => (
//   //                 <th key={header} scope="col" className="px-6 py-3">
//   //                   {header}
//   //                   <button
//   //                     onClick={() => deleteColumn(header)}
//   //                     className="text-red-500 ml-2"
//   //                   >
//   //                     &#10060;
//   //                   </button>
//   //                 </th>
//   //               ))}
//   //               <th scope="col" className="px-6 py-3">
//   //                 Actions
//   //               </th>
//   //             </tr>
//   //           </thead>
//   //           <tbody>
//   //             {users.map((user, rowIndex) => (
//   //               <tr
//   //                 key={user.id}
//   //                 className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700"
//   //               >
//   //                 <td className="px-6 py-4">{rowIndex + 1}</td>
//   //                 {headers.map((header) => (
//   //                   <td
//   //                     key={header}
//   //                     className="px-6 py-4"
//   //                     onClick={() => handleCellClick(rowIndex, header)}
//   //                   >
//   //                     {editCell.row === rowIndex &&
//   //                     editCell.column === header ? (
//   //                       <input
//   //                         type="text"
//   //                         value={user[header]}
//   //                         onChange={(e) =>
//   //                           handleCellChange(e, rowIndex, header)
//   //                         }
//   //                         onBlur={() => saveCellChange(rowIndex)}
//   //                         onKeyDown={(e) => handleKeyPress(e, rowIndex)}
//   //                         className="border p-1 bg-gray-800 text-white"
//   //                       />
//   //                     ) : (
//   //                       user[header]
//   //                     )}
//   //                   </td>
//   //                 ))}
//   //                 <td className="px-6 py-4 space-x-2">
//   //                   <button
//   //                     onClick={() => startEditing(user)}
//   //                     className="text-blue-500"
//   //                   >
//   //                     Edit
//   //                   </button>
//   //                   <button
//   //                     onClick={() => deleteUser(user.id)}
//   //                     className="text-red-500"
//   //                   >
//   //                     Delete
//   //                   </button>
//   //                   <button
//   //                     onClick={() => deleteRow(rowIndex)}
//   //                     className="text-red-500"
//   //                   >
//   //                     Delete Row
//   //                   </button>
//   //                 </td>
//   //               </tr>
//   //             ))}
//   //           </tbody>
//   //         </table>
//   //         <button
//   //           onClick={addRow}
//   //           className="bg-green-500 text-white p-2 m-4 rounded"
//   //         >
//   //           Add Row
//   //         </button>
//   //       </div>
//   //     </div>
//   //   </>
//   // );
  

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center bg-slate-950 ">
//         <div className="container mx-auto mt-10 bg-slate-950 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
//           <h1 className="text-2xl font-bold mb-8 text-white">Fill The Enteries</h1>

//           <form onSubmit={handleSubmit} className="mb-4 flex items-center justify-space">
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400" />
//             <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400" />
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400" />
//             <div className="p-2 flex item-center justify-center">
//               <button type="submit" className="bg-blue-500 text-white p-2 mr-2 rounded">{isEditing ? "Update User" : "Add User"}</button>
//               <button onClick={() => dispatch({ type: "UNDO" })} className="bg-blue-500 text-white p-2 mr-2 rounded">Undo</button>
//               <button onClick={() => dispatch({ type: "REDO" })} className="bg-blue-500 text-white p-2 rounded">Redo</button>
              
//             </div>
//           </form>

//           <div className="mb-4">
//             <input type="text" value={newColumnName} onChange={(e) => setNewColumnName(e.target.value)} placeholder="New Column Name" className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400" />
//             <button onClick={addColumn} className="bg-green-500 text-white p-2 rounded">Add Column</button>
//           </div>

//           <table className="min-w-full bg-slate-950 text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-400 uppercase bg-gray-800">
//               <tr>
//                 <th scope="col" className="px-6 py-3">#</th>
//                 {headers.map(header => (
//                   <th key={header} scope="col" className="px-6 py-3">
//                     {header}
//                     <button onClick={() => deleteColumn(header)} className="text-red-500 ml-2">&#10060;</button>
//                   </th>
//                 ))}
//                 <th scope="col" className="px-6 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, rowIndex) => (
//                 <tr key={user.id} className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700">
//                   <td className="px-6 py-4">{rowIndex + 1}</td>
//                   {headers.map(header => (
//                     <td key={header} className="px-6 py-4" onClick={() => handleCellClick(rowIndex, header)}>
//                       {editCell.row === rowIndex && editCell.column === header ? (
//                         <input type="text" value={user[header]} onChange={(e) => handleCellChange(e, rowIndex, header)} onBlur={() => saveCellChange(rowIndex)} onKeyDown={(e) => handleKeyPress(e, rowIndex)} className="border p-1 bg-gray-800 text-white" />
//                       ) : (
//                         user[header]
//                       )}
//                     </td>
//                   ))}
//                   <td className="px-6 py-4 space-x-2">
//                     <button onClick={() => startEditing(user)} className="text-blue-500">Edit</button>
//                     <button onClick={() => deleteUser(user.id)} className="text-red-500">Delete</button>
//                     <button onClick={() => deleteRow(rowIndex)} className="text-red-500">Delete Row</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={addRow} className="bg-green-500 text-white p-2 m-4 rounded">Add Row</button>
//         </div>
//       </div>
//     </>
//   );
// };




// export default App;


