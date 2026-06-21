import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { CircleUser } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const authLinks = [
  { to: "/unpaid", label: "Received Bills" },
  { to: "/paid", label: "Paid Bills" },
  { to: "/my", label: "Created Bills" },
  { to: "/new-bill", label: "Create Bill" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="text-base sm:text-xl font-semibold text-gray-800 truncate">
          Purchase Accounting
        </Link>

        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            {authLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-black">
                {link.label}
              </Link>
            ))}
          </div>
        )}

        <div className="hidden md:flex items-center gap-3 text-sm font-bold">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-gray-800 hover:text-black">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gray-900 text-white rounded-md shadow-md hover:bg-black"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="max-w-32 truncate text-gray-600 font-medium">
                {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-900 text-white rounded-md shadow-md hover:bg-red-600"
              >
                Log Out
              </button>
              <Link to="/profile" className="text-gray-800 hover:text-black" aria-label="Profile">
                <CircleUser size={32} />
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-2xl text-gray-800 focus:outline-none"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex flex-col items-end md:hidden">
          <div className="w-72 max-w-[85vw] bg-white h-full shadow-lg p-6 flex flex-col gap-5">
            <button
              className="self-end text-2xl text-gray-800"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <HiX />
            </button>

            {isAuthenticated ? (
              <>
                <p className="text-sm text-gray-500">
                  Signed in as <span className="font-semibold text-gray-800">{user?.username}</span>
                </p>
                {authLinks.map((link) => (
                  <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="mt-2 px-4 py-2 bg-gray-900 text-white rounded-md shadow-md hover:bg-red-600 text-left"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gray-900 text-white rounded-md shadow-md hover:bg-black text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
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
