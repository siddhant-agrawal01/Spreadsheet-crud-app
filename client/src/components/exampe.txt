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

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       updateUser();
//     } else {
//       addUser();
//     }
//   };
  
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


  
//   useEffect(() => {
//     fetchUsers();
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   useEffect(() => {
//     setUsers(history.present);
//   }, [history.present]);

//   const fetchUsers = async () => {
//     const response = await axios.get("https://crud-app-server-3xf5.onrender.com/users");
//     dispatch({ type: "SET", newPresent: response.data });
//   };

//   const addUser = async () => {
//     const response = await axios.post("https://crud-app-server-3xf5.onrender.com/users", {
//       name,
//       userName,
//       email,
//     });
//     dispatch({ type: "SET", newPresent: [...users, response.data] });
//     setName("");
//     setUserName("");
//     setEmail("");
//   };

//   const updateUser = async () => {
//     const response = await axios.put(
//       `https://crud-app-server-3xf5.onrender.com/users/${editUserId}`,
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
//     await axios.delete(`https://crud-app-server-3xf5.onrender.com/users/${id}`);
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

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   if (isEditing) {
//   //     updateUser();
//   //   } else {
//   //     addUser();
//   //   }
//   // };

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
//       await axios.put(`https://crud-app-server-3xf5.onrender.com/users/${user.id}`, user);
//     } else {
//       const response = await axios.post("https://crud-app-server-3xf5.onrender.com/users", user);
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

//       const updatedUsers = users.map((user) => ({
//         ...user,
//         [newColumnName]: "",
//       }));
//       dispatch({ type: "SET", newPresent: updatedUsers });

//       axios.post("https://crud-app-server-3xf5.onrender.com/users/updateStructure", {
//         headers: updatedHeaders,
//         users: updatedUsers,
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

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center bg-slate-950 ">
//         <div className="container mx-auto mt-10 bg-slate-950 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
//           <h1 className="text-2xl font-bold mb-8 text-white">
//             Fill The Enteries
//           </h1>

//           <form
//             onSubmit={handleSubmit}
//             className="mb-4 flex items-center justify-space"
//           >
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Name"
//               className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400"
//             />
//             <input
//               type="text"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               placeholder="Username"
//               className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400"
//             />
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400"
//             />
//             <div className="p-2 flex item-center justify-center">
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white p-2 mr-2 rounded"
//               >
//                 {isEditing ? "Update User" : "Add User"}
//               </button>
//               <button
//                 onClick={() => dispatch({ type: "UNDO" })}
//                 className="bg-blue-500 text-white p-2 mr-2 rounded"
//               >
//                 Undo
//               </button>
//               <button
//                 onClick={() => dispatch({ type: "REDO" })}
//                 className="bg-blue-500 text-white p-2 rounded"
//               >
//                 Redo
//               </button>
//             </div>
//           </form>

//           <div className="mb-4">
//             <input
//               type="text"
//               value={newColumnName}
//               onChange={(e) => setNewColumnName(e.target.value)}
//               placeholder="New Column Name"
//               className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400"
//             />
//             <button
//               onClick={addColumn}
//               className="bg-green-500 text-white p-2 rounded"
//             >
//               Add Column
//             </button>
//           </div>

//           <table className="min-w-full bg-slate-950 text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-400 uppercase bg-gray-800">
//               <tr>
//                 <th scope="col" className="px-6 py-3">
//                   #
//                 </th>
//                 {headers.map((header) => (
//                   <th key={header} scope="col" className="px-6 py-3">
//                     {header}
//                     <button
//                       onClick={() => deleteColumn(header)}
//                       className="text-red-500 ml-2"
//                     >
//                       &#10060;
//                     </button>
//                   </th>
//                 ))}
//                 <th scope="col" className="px-6 py-3">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, rowIndex) => (
//                 <tr
//                   key={user.id}
//                   className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700"
//                 >
//                   <td className="px-6 py-4">{rowIndex + 1}</td>
//                   {headers.map((header) => (
//                     <td
//                       key={header}
//                       className="px-6 py-4"
//                       onClick={() => handleCellClick(rowIndex, header)}
//                     >
//                       {editCell.row === rowIndex &&
//                       editCell.column === header ? (
//                         <input
//                           type="text"
//                           value={user[header]}
//                           onChange={(e) =>
//                             handleCellChange(e, rowIndex, header)
//                           }
//                           onBlur={() => saveCellChange(rowIndex)}
//                           onKeyDown={(e) => handleKeyPress(e, rowIndex)}
//                           className="border p-1 bg-gray-800 text-white"
//                         />
//                       ) : (
//                         user[header]
//                       )}
//                     </td>
//                   ))}
//                   <td className="px-6 py-4 space-x-2">
//                     <button
//                       onClick={() => startEditing(user)}
//                       className="text-blue-500"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => deleteUser(user.id)}
//                       className="text-red-500"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => deleteRow(rowIndex)}
//                       className="text-red-500"
//                     >
//                       Delete Row
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button
//             onClick={addRow}
//             className="bg-green-500 text-white p-2 m-4 rounded"
//           >
//             Add Row
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;

/* eslint-disable no-case-declarations */
import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editCell, setEditCell] = useState({ row: null, column: null });
  const [copiedData, setCopiedData] = useState(null);
  const [headers, setHeaders] = useState(["name", "userName", "email"]);
  const [newColumnName, setNewColumnName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateUser();
    } else {
      addUser();
    }
  };

  const initialHistoryState = { past: [], present: [], future: [] };

  const historyReducer = (state, action) => {
    switch (action.type) {
      case "UNDO":
        if (state.past.length === 0) return state;
        const previous = state.past[state.past.length - 1];
        const newPast = state.past.slice(0, state.past.length - 1);
        return {
          past: newPast,
          present: previous,
          future: [state.present, ...state.future],
        };
      case "REDO":
        if (state.future.length === 0) return state;
        const next = state.future[0];
        const newFuture = state.future.slice(1);
        return {
          past: [...state.past, state.present],
          present: next,
          future: newFuture,
        };
      case "SET":
        return {
          past: [...state.past, state.present],
          present: action.newPresent,
          future: [],
        };
      default:
        return state;
    }
  };
  const [history, dispatch] = useReducer(historyReducer, initialHistoryState);

  useEffect(() => {
    fetchUsers();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setUsers(history.present);
  }, [history.present]);

  const fetchUsers = async () => {
    const response = await axios.get("https://crud-app-server-3xf5.onrender.com/users");
    dispatch({ type: "SET", newPresent: response.data });
  };

  const addUser = async () => {
    const response = await axios.post("https://crud-app-server-3xf5.onrender.com/users", {
      name,
      userName,
      email,
    });
    dispatch({ type: "SET", newPresent: [...users, response.data] });
    setName("");
    setUserName("");
    setEmail("");
  };

  const updateUser = async () => {
    const response = await axios.put(
      `https://crud-app-server-3xf5.onrender.com/users/${editUserId}`,
      { name, userName, email }
    );
    const updatedUsers = users.map((user) =>
      user.id === editUserId ? response.data : user
    );
    dispatch({ type: "SET", newPresent: updatedUsers });
    setName("");
    setUserName("");
    setEmail("");
    setIsEditing(false);
    setEditUserId(null);
  };

  const deleteUser = async (id) => {
    await axios.delete(`https://crud-app-server-3xf5.onrender.com/users/${id}`);
    dispatch({
      type: "SET",
      newPresent: users.filter((user) => user.id !== id),
    });
  };

  const startEditing = (user) => {
    setIsEditing(true);
    setEditUserId(user.id);
    setName(user.name);
    setUserName(user.userName);
    setEmail(user.email);
  };

  const handleCellClick = (rowIndex, column) => {
    setEditCell({ row: rowIndex, column });
  };

  const handleCellChange = (e, rowIndex, column) => {
    const updatedUsers = [...users];
    updatedUsers[rowIndex][column] = e.target.value;
    dispatch({ type: "SET", newPresent: updatedUsers });
  };

  const saveCellChange = async (rowIndex) => {
    const user = users[rowIndex];
    if (user.id) {
      await axios.put(`https://crud-app-server-3xf5.onrender.com/users/${user.id}`, user);
    } else {
      const response = await axios.post("https://crud-app-server-3xf5.onrender.com/users", user);
      const updatedUsers = [...users];
      updatedUsers[rowIndex] = response.data;
      dispatch({ type: "SET", newPresent: updatedUsers });
    }
    setEditCell({ row: null, column: null });
  };

  const addRow = () => {
    const updatedUsers = [
      ...users,
      { id: null, name: "", userName: "", email: "" },
    ];
    dispatch({ type: "SET", newPresent: updatedUsers });
  };

  const deleteRow = (rowIndex) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      const updatedUsers = [...users];
      const user = updatedUsers[rowIndex];
      if (user.id) {
        deleteUser(user.id);
      } else {
        updatedUsers.splice(rowIndex, 1);
        dispatch({ type: "SET", newPresent: updatedUsers });
      }
    }
  };

  const addColumn = () => {
    if (newColumnName.trim() !== "") {
      const updatedHeaders = [...headers, newColumnName];
      setHeaders(updatedHeaders);

      const updatedUsers = users.map((user) => ({
        ...user,
        [newColumnName]: "",
      }));
      dispatch({ type: "SET", newPresent: updatedUsers });

      axios.post("https://crud-app-server-3xf5.onrender.com/users/updateStructure", {
        headers: updatedHeaders,
        users: updatedUsers,
      });

      setNewColumnName("");
    }
  };

  const deleteColumn = (column) => {
    if (window.confirm("Are you sure you want to delete this column?")) {
      const updatedUsers = users.map((user) => {
        const updatedUser = { ...user };
        delete updatedUser[column];
        return updatedUser;
      });

      const updatedHeaders = headers.filter((header) => header !== column);

      setHeaders(updatedHeaders);
      dispatch({ type: "SET", newPresent: updatedUsers });
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "z")
    {
      dispatch({ type: "UNDO" });
    } else if (e.ctrlKey && e.key === "y") {
      dispatch({ type: "REDO" });
    } else if (e.ctrlKey && e.key === "c") {
      handleCopy();
    } else if (e.ctrlKey && e.key === "v") {
      handlePaste();
    }
  };

  const handleCopy = () => {
    if (editCell.row !== null && editCell.column !== null) {
      setCopiedData(users[editCell.row][editCell.column]);
    }
  };

  const handlePaste = () => {
    if (
      editCell.row !== null &&
      editCell.column !== null &&
      copiedData !== null
    ) {
      const updatedUsers = [...users];
      updatedUsers[editCell.row][editCell.column] = copiedData;
      dispatch({ type: "SET", newPresent: updatedUsers });
    }
  };

  const handleKeyPress = (e, rowIndex) => {
    if (e.key === "Enter") {
      saveCellChange(rowIndex);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-slate-950 ">
        <div className="container mx-auto mt-10 bg-slate-950 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50">
          <h1 className="text-2xl font-bold mb-8 text-white">
            Fill The Entries
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mb-4 flex items-center justify-space"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400"
            />
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400"
            />
            <div className="p-2 flex item-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 mr-2 rounded"
              >
                {isEditing ? "Update User" : "Add User"}
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: "UNDO" })}
                className="bg-blue-500 text-white p-2 mr-2 rounded"
              >
                Undo
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: "REDO" })}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Redo
              </button>
            </div>
          </form>

          <div className="mb-4">
            <input
              type="text"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="New Column Name"
              className="border p-2 mr-2 bg-gray-800 text-white placeholder-gray-400"
            />
            <button
              onClick={addColumn}
              className="bg-green-500 text-white p-2 rounded"
            >
              Add Column
            </button>
          </div>

          <table className="min-w-full bg-slate-950 text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                {headers.map((header) => (
                  <th key={header} scope="col" className="px-6 py-3">
                    {header}
                    <button
                      onClick={() => deleteColumn(header)}
                      className="text-red-500 ml-2"
                    >
                      &#10060;
                    </button>
                  </th>
                ))}
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{rowIndex + 1}</td>
                  {headers.map((header) => (
                    <td
                      key={header}
                      className="px-6 py-4"
                      onClick={() => handleCellClick(rowIndex, header)}
                    >
                      {editCell.row === rowIndex &&
                      editCell.column === header ? (
                        <input
                          type="text"
                          value={user[header]}
                          onChange={(e) =>
                            handleCellChange(e, rowIndex, header)
                          }
                          onBlur={() => saveCellChange(rowIndex)}
                          onKeyDown={(e) => handleKeyPress(e, rowIndex)}
                          className="border p-1 bg-gray-800 text-white"
                        />
                      ) : (
                        user[header]
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => startEditing(user)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => deleteRow(rowIndex)}
                      className="text-red-500"
                    >
                      Delete Row
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={addRow}
            className="bg-green-500 text-white p-2 m-4 rounded"
          >
            Add Row
          </button>
        </div>
      </div>
    </>
  );
};

export default App;



      