"use client";

import Head from "next/head";
import { useRef, useState, useEffect, ChangeEvent } from "react";
import { nanoid } from "nanoid";
import { supabase } from "../../../../../utils/supabase/client";

interface User {
  id: string;
  name: string;
  email: string;
  role: string; // Added role field
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>(""); // State for user role
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch users from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.error("Error fetching users:", error.message);
      } else {
        setUsers(data as any);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!name || !email || !role) {
      alert("Please fill in the name, email, and select a role.");
      return;
    }

    const { data: user, error } = await supabase.from("users").insert({
      name,
      email,
      role
    });

    if (error) {
      console.error("Error adding user:", error.message);
    } else {
      alert("User added successfully!");
      setUsers((prev) => [...prev, ...(user as any)]);
      setName("");
      setEmail("");
      setRole(""); // Reset role selection
    }
  };

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async (userId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      const { data, error } = await supabase
        .from("users")
        .delete()
        .eq("id", userId);

      if (error) {
        console.error("Error deleting user:", error.message);
      } else {
        setUsers((prev) => prev.filter((user) => user.id !== userId));
        alert("User deleted successfully.");
      }
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 bg-gray-100">
        {/* Add User Form */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Add User</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="User name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="User email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none">
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Editor">Editor</option>
              </select>
            </div>
          </div>
          <button
            className="mt-5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2 duration-200 w-full font-medium"
            type="button"
            onClick={handleAddUser}>
            Add User
          </button>
        </div>

        {/* Users Table */}
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Users</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Email
                </th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(user)}>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.role}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        handleDelete(user.id);
                      }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for selected user */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
            <h3 className="text-xl font-semibold mb-4">{selectedUser.name}</h3>
            <p>Email: {selectedUser.email}</p>
            <p>Role: {selectedUser.role}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
              onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
