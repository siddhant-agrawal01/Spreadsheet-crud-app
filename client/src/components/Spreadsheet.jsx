// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Spreadsheet = () => {
//   const [users, setUsers] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [viewing, setViewing] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     const response = await axios.get('http://localhost:3000/users');
//     setUsers(response.data);
//   };

//   const handleEdit = (id) => {
//     setEditing(id);
//   };

//   const handleView = (id) => {
//     setViewing(id);
//   };

//   const handleUpdate = async (id, name, userName, email) => {
//     await axios.put(`http://localhost:3000/users/${id}`, { name, userName, email });
//     setEditing(null);
//     fetchUsers();
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:3000/users/${id}`);
//     fetchUsers();
//   };

//   const renderViewModal = () => {
//     if (viewing !== null) {
//       const user = users.find((user) => user.id === viewing);
//       return (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-4 rounded">
//             <h2 className="text-xl mb-4">User Details</h2>
//             <p><strong>Name:</strong> {user.name}</p>
//             <p><strong>Username:</strong> {user.userName}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <button
//               className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               onClick={() => setViewing(null)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   const renderEditModal = () => {
//     if (editing !== null) {
//       const user = users.find((user) => user.id === editing);
//       return (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-4 rounded">
//             <h2 className="text-xl mb-4">Edit User</h2>
//             <input
//               type="text"
//               defaultValue={user.name}
//               onBlur={(e) => handleUpdate(user.id, e.target.value, user.userName, user.email)}
//               className="border p-2 mb-2 w-full"
//             />
//             <input
//               type="text"
//               defaultValue={user.userName}
//               onBlur={(e) => handleUpdate(user.id, user.name, e.target.value, user.email)}
//               className="border p-2 mb-2 w-full"
//             />
//             <input
//               type="text"
//               defaultValue={user.email}
//               onBlur={(e) => handleUpdate(user.id, user.name, user.userName, e.target.value)}
//               className="border p-2 mb-2 w-full"
//             />
//             <button
//               className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               onClick={() => setEditing(null)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   // return (
//   //   <div className="overflow-x-auto">
//   //     <table className="min-w-full bg-white border border-gray-200">
//   //       <thead className="bg-gray-100">
//   //         <tr>
//   //           <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">#</th>
//   //           <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
//   //           <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Username</th>
//   //           <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
//   //           <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Action</th>
//   //         </tr>
//   //       </thead>
//   //       <tbody className="bg-white">
//   //         {users.map((user, index) => (
//   //           <tr key={user.id}>
//   //             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{index + 1}</td>
//   //             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{user.name}</td>
//   //             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{user.userName}</td>
//   //             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{user.email}</td>
//   //             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//   //               <button
//   //                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"
//   //                 onClick={() => handleView(user.id)}
//   //               >
//   //                 View
//   //               </button>
//   //               <button
//   //                 className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-1"
//   //                 onClick={() => handleEdit(user.id)}
//   //               >
//   //                 Edit
//   //               </button>
//   //               <button
//   //                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-1"
//   //                 onClick={() => handleDelete(user.id)}
//   //               >
//   //                 Delete
//   //               </button>
//   //             </td>
//   //           </tr>
//   //         ))}
//   //       </tbody>
//   //     </table>
//   //     {renderViewModal()}
//   //     {renderEditModal()}
//   //   </div>
//   // );
// };

// export default Spreadsheet;
