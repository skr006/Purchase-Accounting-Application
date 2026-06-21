import React from "react";
import {
  UserRoundCogIcon,
  Settings,
  UserRoundPen,
  SquareUserRound,
} from "lucide-react";

const Sidebar = ({ setCategory }) => {
  return (
    <aside className="w-full sm:w-64 bg-gray-900 text-white flex sm:min-h-[70vh] flex-col p-4">
      <div
        className="text-2xl font-bold mb-6 flex items-center gap-2 cursor-pointer"
        onClick={() => setCategory(0)}
      >
        <UserRoundCogIcon size={40} />
        <span>Profile</span>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2">
        <li
          className="flex items-center gap-2 hover:text-blue-400 cursor-pointer py-2 px-2 rounded transition-colors"
          onClick={() => setCategory(1)}
        >
          <SquareUserRound size={20} />
          <span>Personal Info</span>
        </li>
        <li
          className="flex items-center gap-2 hover:text-blue-400 cursor-pointer py-2 px-2 rounded transition-colors"
          onClick={() => setCategory(2)}
        >
          <UserRoundPen size={20} />
          <span>Change Name</span>
        </li>
        <li
          className="flex items-center gap-2 hover:text-blue-400 cursor-pointer py-2 px-2 rounded transition-colors"
          onClick={() => setCategory(3)}
        >
          <UserRoundPen size={20} />
          <span>Change Address</span>
        </li>
        <li
          className="flex items-center gap-2 hover:text-blue-400 cursor-pointer py-2 px-2 rounded transition-colors"
          onClick={() => setCategory(4)}
        >
          <UserRoundPen size={20} />
          <span>Change Username</span>
        </li>
        <li
          className="flex items-center gap-2 hover:text-blue-400 cursor-pointer py-2 px-2 rounded transition-colors"
          onClick={() => setCategory(5)}
        >
          <UserRoundPen size={20} />
          <span>Change Phone</span>
        </li>
        <li
          className="flex items-center gap-2 hover:text-blue-400 cursor-pointer py-2 px-2 rounded transition-colors"
          onClick={() => setCategory(6)}
        >
          <UserRoundPen size={20} />
          <span>Change Password</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
