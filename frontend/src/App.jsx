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
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute, PublicOnlyRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />

          <main className="flex-1 pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/unpaid" element={<ProtectedRoute><UnpaidBills /></ProtectedRoute>} />
              <Route path="/my" element={<ProtectedRoute><MyBills /></ProtectedRoute>} />
              <Route path="/paid" element={<ProtectedRoute><PaidBills /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
              <Route path="/signup" element={<PublicOnlyRoute><SignUp /></PublicOnlyRoute>} />
              <Route path="/new-bill" element={<ProtectedRoute><NewBill /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
