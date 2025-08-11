import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { CircleUser } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if token is in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="text-xl font-semibold text-gray-800">
        <Link to="/">Getit: The Market bridging application</Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
        <Link to="/paid" className="hover:text-black">
          Paid Bills
        </Link>
        <Link to="/my" className="hover:text-black">
          Your Bills
        </Link>
        <Link to="/unpaid" className="hover:text-black">
          Unpaid Bills
        </Link>
        <Link to="/new-bill" className="hover:text-black">
          Create Bill
        </Link>
      </div>

      {/* Right Side Buttons */}
      <div className="hidden md:flex items-center space-x-2 text-sm font-bold">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="text-gray-800 hover:text-black">
              LOG IN
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-gray-900 text-white rounded-md shadow-md hover:bg-black"
            >
              SIGN IN
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={logout}
              className="px-4 py-2 bg-gray-900 text-white rounded-md shadow-md hover:bg-red-600"
            >
              LOG OUT
            </button>
            <Link to="/profile" className="text-gray-800 hover:text-black">
              <CircleUser size={33} />
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
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
            <Link to="/paid" onClick={() => setMenuOpen(false)}>
              Paid Bills
            </Link>
            <Link to="/my" onClick={() => setMenuOpen(false)}>
              Your Bills
            </Link>
            <Link to="/unpaid" onClick={() => setMenuOpen(false)}>
              Unaid Bills
            </Link>
            <Link to="/new-bill" onClick={() => setMenuOpen(false)}>
              Create Bill
            </Link>
            <hr />
            {!isAuthenticated ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  LOG IN
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gray-900 text-white rounded-md shadow-md hover:bg-black"
                  onClick={() => setMenuOpen(false)}
                >
                  SIGN IN
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-gray-900 text-white rounded-md shadow-md hover:bg-red-600"
                >
                  LOG OUT
                </button>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  <CircleUser size={33} />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
