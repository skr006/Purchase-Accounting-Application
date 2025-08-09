import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full p-6 bg-gray-900 text-white text-center fixed left-0 bottom-0 text-base shadow-[0_-2px_8px_rgba(0,0,0,0.1)] z-[100]">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center">
        <span>
          &copy; {new Date().getFullYear()} Purchase Accounting Application
        </span>
        <nav className="mt-2 flex gap-4 flex-wrap justify-center">
          <Link to="/" className="text-white no-underline hover:underline">
            Home
          </Link>
          <Link to="/about" className="text-white no-underline hover:underline">
            About
          </Link>
          <Link
            to="/contact"
            className="text-white no-underline hover:underline"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
