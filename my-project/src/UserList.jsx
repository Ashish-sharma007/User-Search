import React, { useEffect, useState } from "react";


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://reqres.in/api/users?page=2");
      const resData = await response.json()
      setUsers(resData.data);
      console.log(resData.data)
    };

    fetchData();
  }, []);

  // Filter the users based on the search term
  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          className="flex items-center space-x-4 p-4 border border-gray-300 rounded-md mb-4"
        >
          <img
            src={user.avatar}
            alt={user.first_name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-lg font-bold">{user.first_name}</p>
            <p>ID: {user.id}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
