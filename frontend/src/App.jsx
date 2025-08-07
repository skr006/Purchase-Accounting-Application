import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

const Dummy = ({ title }) => <div className="p-10 text-2xl">{title} Page</div>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages" element={<Dummy title="Pages" />} />
        <Route path="/account" element={<Dummy title="Account" />} />
        <Route path="/blocks" element={<Dummy title="Blocks" />} />
        <Route path="/docs" element={<Dummy title="Docs" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
