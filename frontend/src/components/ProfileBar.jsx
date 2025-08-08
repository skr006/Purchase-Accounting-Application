import React from "react";
import { User, Settings, UserRoundPen, SquareUserRound } from "lucide-react";

const Sidebar = ({ setCategory }) => {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-6">
        <UserRoundPen size={51} />
        Profile
      </div>
      <ul className="space-y-4">
        <li
          className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"
          onClick={() => setCategory(1)}
        >
          <SquareUserRound size={20} />
          <span>Personal Info</span>
        </li>
        <li
          className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"
          onClick={() => setCategory(2)}
        >
          <User size={20} />
          <span>Profile</span>
        </li>
        <li
          className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"
          onClick={() => setCategory(3)}
        >
          <Settings size={20} />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
