import React from "react";
import { Link } from "react-router-dom";
// import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { CircleUser } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white shadow-md ">
      <div className="text-xl font-semibold text-gray-800">
        <Link to="/">Getit: The Market bridging application</Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
        <Link to="/pages" className="hover:text-black">
          Pages
        </Link>
        <Link to="/account" className="hover:text-black">
          Account
        </Link>
        <Link to="/blocks" className="hover:text-black">
          Blocks
        </Link>
        <Link to="/docs" className="hover:text-black">
          Docs
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-2 text-sm font-bold">
        <Link to="/login" className="text-gray-800 hover:text-black">
          LOG IN
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 bg-gray-900 text-white rounded-md shadow-md hover:bg-black"
        >
          SIGN IN
        </Link>
        <Link to="/profile" className="text-gray-800 hover:text-black">
          <CircleUser size={33} />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl text-gray-800 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex flex-col items-end md:hidden">
          <div className="w-2/3 bg-white h-full shadow-lg p-6 flex flex-col space-y-6">
            <button
              className="self-end text-2xl text-gray-800 mb-4"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <HiX />
            </button>
            <Link
              to="/pages"
              className="hover:text-black"
              onClick={() => setMenuOpen(false)}
            >
              Pages
            </Link>
            <Link
              to="/account"
              className="hover:text-black"
              onClick={() => setMenuOpen(false)}
            >
              Account
            </Link>
            <Link
              to="/blocks"
              className="hover:text-black"
              onClick={() => setMenuOpen(false)}
            >
              Blocks
            </Link>
            <Link
              to="/docs"
              className="hover:text-black"
              onClick={() => setMenuOpen(false)}
            >
              Docs
            </Link>
            <hr />
            <Link
              to="/login"
              className="text-gray-800 hover:text-black"
              onClick={() => setMenuOpen(false)}
            >
              LOG IN
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-gray-900 text-white rounded-md shadow-md hover:bg-black"
              onClick={() => setMenuOpen(false)}
            >
              SIGN IN
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
