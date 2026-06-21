import { useState } from "react";
import { apiFetch } from "../lib/api";

const Password = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!currentPassword.trim() || !newPassword.trim()) {
      setError("Current password and new password are required.");
      return;
    }

    if (newPassword.trim().length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch("/api/v1/users/profile-update/password", {
        method: "PUT",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setCurrentPassword("");
      setNewPassword("");
      setMessage("Password updated successfully.");
    } catch (err) {
      setError(err.message || "Password update failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-md shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Change Password
        </h2>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {message && <p className="mb-4 text-sm text-green-700">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              autoComplete="current-password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 mt-2 bg-black text-white font-semibold rounded-md shadow hover:bg-gray-900 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Password;
