import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { apiFetch } from "../lib/api";

const Name = () => {
  const { user, updateUser } = useAuth();
  const [firstName, setFirstName] = useState(user?.name?.firstName || "");
  const [lastName, setLastName] = useState(user?.name?.lastName || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    };

    if (!payload.firstName || !payload.lastName) {
      setError("First name and last name are required.");
      return;
    }

    setSubmitting(true);
    try {
      const data = await apiFetch("/api/v1/users/profile-update/name", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      updateUser(data.data);
      setMessage("Name updated successfully.");
    } catch (err) {
      setError(err.message || "Failed to update name.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-md shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Change Name</h2>
        <p className="text-sm text-gray-600 mb-6">Enter your new first and last name.</p>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {message && <p className="mb-4 text-sm text-green-700">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 mt-2 bg-black text-white font-semibold rounded-md shadow hover:bg-gray-900 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Name"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Name;
