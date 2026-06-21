import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { apiFetch } from "../lib/api";

const initialForm = {
  name: {
    firstName: "",
    lastName: "",
  },
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agree: false,
};

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.trim().length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!formData.agree) {
      setError("You must agree to the Terms and Conditions");
      return;
    }

    setSubmitting(true);

    try {
      const data = await apiFetch("/api/v1/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({
          name: {
            firstName: formData.name.firstName.trim(),
            lastName: formData.name.lastName.trim(),
          },
          email: formData.email.trim(),
          password: formData.password,
          username: formData.username.trim(),
        }),
      });

      login(data.data);
      setFormData(initialForm);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-md shadow-md border border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Sign Up
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
          Create your account.
        </p>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.name.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                autoComplete="given-name"
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
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                autoComplete="family-name"
                required
              />
            </div>
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
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              autoComplete="email"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                autoComplete="new-password"
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
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <div className="flex items-start">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              checked={formData.agree}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
              required
            />
            <label htmlFor="agree" className="ml-2 text-sm text-gray-600">
              I agree to the <span className="font-medium">Terms and Conditions</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 mt-2 bg-black text-white font-semibold rounded-md shadow hover:bg-gray-900 disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-black hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
