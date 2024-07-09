// components/AddUserForm.tsx
"use client"
import { useState, useEffect } from 'react';
import { User } from "../types/user"
import { addUser, updateUser } from '../utils/api';
import { BiPlus } from 'react-icons/bi';

interface AddUserFormProps {
  initialUser?: User; // Optional prop for initial user data if in update mode
  onAddUser: (user: User) => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ initialUser, onAddUser }) => {
  const [id, setId] = useState(initialUser ? initialUser.id : '');
  const [name, setName] = useState(initialUser ? initialUser.name : '');
  const [phone, setPhone] = useState(initialUser ? initialUser.phone : '');
  const [email, setEmail] = useState(initialUser ? initialUser.email : '');
  const [gender, setGender] = useState(initialUser ? initialUser.gender : '');

  useEffect(() => {
    if (initialUser) {
      setId(initialUser.id);
      setName(initialUser.name);
      setPhone(initialUser.phone);
      setEmail(initialUser.email);
      setGender(initialUser.gender);

    }
  }, [initialUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        let newUser: User;
      if (initialUser) {
        // Update existing user
        newUser = await updateUser({
          ...initialUser,
          id,
          name,
          phone,
          email,
          gender

        });
      } else {
        // Add new user
        newUser = await addUser({ id, name, phone, email,gender});
      }
      onAddUser(newUser);
      setName('');
      setPhone('');
      setEmail('');
      setGender('')
    } catch (error) {
      console.error('Error adding/updating user:', error);
    }
  }

  return (
    <div className="py-5">

    <h1 className=" text-xl md:text-4xl text-center font-bold py-10">
         Users Managment
    </h1>
    <form className="grid lg:grid-cols-2 w-4/6 gap-4 container mx-auto  justify-between py-5" onSubmit={handleSubmit}>
    <div className="input-type">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border w-full px-5 py-3 focus:outline-none rounded-lg" />
      
    </div>
    <div className="input-type">
    <input
        type="text"
        placeholder="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="border w-full px-5 py-3 focus:outline-none rounded-lg" />
     
      </div>
       <div className="input-type">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border w-full px-5 py-3 focus:outline-none rounded-lg" />
      
    </div>
    <div className="input-type">
      <input
        type="gender"
        placeholder="gender"
        value={gender}
        onChange={(e) =>setGender(e.target.value)}
        required
        className="border w-full px-5 py-3 focus:outline-none rounded-lg" />
      
    </div>
    <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"type="submit">
    {initialUser ? 'Update User' : 'Add User'} 
      <span className="px-1">
        <BiPlus size={24}></BiPlus>
      </span>
    </button>
  </form>
  </div>
  
  );
};

export default AddUserForm;
