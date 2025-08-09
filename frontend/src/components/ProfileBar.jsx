import React from "react";
import {
  UserRoundCogIcon,
  Settings,
  UserRoundPen,
  SquareUserRound,
} from "lucide-react";

const Sidebar = ({ setCategory }) => {
  return (
    <div className="w-full max-w-xs sm:w-78 bg-gray-900 text-white flex flex-col p-4">
      <div
        className="text-2xl font-bold mb-6 flex items-center space-x-2 cursor-pointer"
        onClick={() => setCategory(0)}
      >
        <UserRoundCogIcon size={40} />
        <span className="hidden sm:inline">Profile</span>
      </div>
      <ul className="space-y-2">
        <li
          className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer py-2 px-2 rounded transition-colors"
          onClick={() => setCategory(1)}
        >
          <SquareUserRound size={20} />
          <span className="hidden sm:inline">Personal Info</span>
        </li>
        <li
          className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer py-2 px-2 rounded transition-colors"
          onClick={() => setCategory(2)}
        >
          <UserRoundPen size={20} />
          <span className="hidden sm:inline">Change Name</span>
        </li>
        <li
          className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer py-2 px-2 rounded transition-colors"
          onClick={() => setCategory(3)}
        >
          <UserRoundPen size={20} />
          <span className="hidden sm:inline">Change Address</span>
        </li>
        <li
          className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer py-2 px-2 rounded transition-colors"
          onClick={() => setCategory(4)}
        >
          <UserRoundPen size={20} />
          <span className="hidden sm:inline">Change Username</span>
        </li>
        <li
          className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer py-2 px-2 rounded transition-colors"
          onClick={() => setCategory(5)}
        >
          <UserRoundPen size={20} />
          <span className="hidden sm:inline">Change Phone Number</span>
        </li>
        <li
          className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer py-2 px-2 rounded transition-colors"
          onClick={() => setCategory(6)}
        >
          <UserRoundPen size={20} />
          <span className="hidden sm:inline">Change Password</span>
        </li>
        <li
          className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer py-2 px-2 rounded transition-colors"
          onClick={() => setCategory(7)}
        ></li>
      </ul>
    </div>
  );
};

export default Sidebar;
