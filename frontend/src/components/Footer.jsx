const Footer = () => {
  return (
    <footer className="w-full p-6 bg-gray-900 text-white text-center text-base shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center">
        <span>
          &copy; {new Date().getFullYear()} Purchase Accounting Application
        </span>
      </div>
    </footer>
  );
};

export default Footer;
