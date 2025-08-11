import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import PaidBills from "./pages/PaidBills";
import MyBills from "./pages/MyBills";
import UnpaidBills from "./pages/UnpaidBills";
import NewBill from "./pages/NewBill";

// const Dummy = ({ title }) => <div className="p- text-2xl">{title} Page</div>;

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 pt-20 pb-28">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/unpaid" element={<UnpaidBills />} />
            <Route path="/my" element={<MyBills />} />
            <Route path="/paid" element={<PaidBills />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/new-bill" element={<NewBill />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
