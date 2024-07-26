"use client";
import React, { useState, ChangeEvent } from "react";
import { TextField, TextArea, Button } from "@radix-ui/themes";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "A software engineer passionate about coding.",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Here you can add code to save the details, e.g., API call
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400">Name</label>
              <TextField.Root
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">Email</label>
              <TextField.Root
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">Bio</label>
              <TextArea
                name="bio"
                value={userDetails.bio}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <Button
              onClick={handleSaveClick}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition duration-150"
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Name</p>
              <p>{userDetails.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p>{userDetails.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Bio</p>
              <p>{userDetails.bio}</p>
            </div>
            <Button
              onClick={handleEditClick}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-150"
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
