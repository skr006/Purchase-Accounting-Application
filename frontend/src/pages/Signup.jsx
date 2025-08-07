import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: {
      firstName: "",
      lastName: "",
    },
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "firstName" || name === "lastName") {
      setFormData((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          [name]: value,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!formData.agree) {
      alert("You must agree to the Terms and Conditions");
      return;
    }

    // Optional: submit to API or console
    console.log("Form Submitted:", formData);

    // Example reset:
    setFormData({
      name: {
        firstName: "",
        lastName: "",
      },
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 sm:py-16 md:py-20">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white p-4 sm:p-8 rounded-md shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Sign Up
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
          Register yourself.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.name.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.name.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              checked={formData.agree}
              onChange={handleChange}
              className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
              required
            />
            <label htmlFor="agree" className="ml-2 text-sm text-gray-600">
              I agree the{" "}
              <span className="font-medium">Terms and Conditions</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-black text-white font-semibold rounded-md shadow hover:bg-gray-900"
          >
            SIGN UP
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-black hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
