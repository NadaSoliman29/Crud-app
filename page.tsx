// pages/index.tsx
"use client"
import { useState, useEffect } from 'react';
import { User } from "../types/user"
import { fetchUsers,addUser,updateUser,deleteUser } from '../utils/api';
import AddUserForm from "../components/adduser";
import { BiTrashAlt, BiEdit } from 'react-icons/bi';
import { userInfo } from 'os';

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialUsers = await fetchUsers();
        setUsers(initialUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddUser = async (newUser: User) => {
    try {
      const addedUser = await addUser(newUser);
      setUsers([...users, addedUser]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const updatedUserResponse = await updateUser(updatedUser);
      const updatedUsers = users.map((user) =>
        user.id === updatedUserResponse.id ? updatedUserResponse : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // const handleDeleteUser = async (userId: number) => {
  //   try {
  //     await deleteUser(userId);
  //     const updatedUsers = users.filter((user) => user.id !== userId);
  //     setUsers(updatedUsers);
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // };

 

  return (
    <div>
      <AddUserForm  onAddUser={handleAddUser} />
      <div className="container mx-auto">
      <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Email</th>
          <th className="px-6 py-3">Phone</th>
          <th className="px-6 py-3">Gender</th>
          <th className="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
      {users.map((User) => (
              <tr key={User.id} className="text-center">
            <td className="border px-6 py-4">{User.name}</td>
            <td className="border px-6 py-4">{User.email}</td>
            <td className="border px-6 py-4">{User.phone}</td>
            <td className="border px-6 py-4">{User.gender}</td>
            <td className="border px-6 py-4 flex justify-center">
              <button className="mr-2"onClick={() => handleEditUser(User)} >
                <BiEdit size={20} color="rgb(244, 197, 94)" />
              </button>
              {/* <button onClick={() => handleDeleteUser(User.id)}>
                <BiTrashAlt size={20} color="rgb(244, 63, 94)" />
              </button> */}
            </td>
          </tr>
        ))}
      </tbody>
      </table> 
      </div>
    </div>
  );
};

export default Home;
