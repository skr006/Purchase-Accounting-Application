import { useState } from "react";

const Password = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Helper: Check for empty or whitespace passwords
  const isInvalidPassword = (pw) => !pw || !pw.trim();

  const validate = () => {
    let errs = {};
    if (isInvalidPassword(currentPassword)) {
      errs.currentPassword = "Current password cannot be empty or just spaces";
    }
    if (isInvalidPassword(newPassword)) {
      errs.newPassword = "New password cannot be empty or just spaces";
    }
    // Optionally, add more password complexity requirements here!
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    let errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length !== 0) return;

    try {
      const res = await fetch(
        "http://localhost:5001/api/v1/users/profile-update/password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );
      const data = await res.json();

      if (data.success) {
        setSuccessMessage("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setErrors({});
      } else {
        // Backend returns message on all errors
        setErrors({ api: data.message || "Password update failed" });
      }
    } catch (error) {
      setErrors({ api: "An error occurred while updating the password" });
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 w-screen">
      <div className="max-w-md bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Change Your Password
        </h2>
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
              required
            />
            {errors.currentPassword && (
              <p className="text-xs text-red-500">{errors.currentPassword}</p>
            )}
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
              required
            />
            {errors.newPassword && (
              <p className="text-xs text-red-500">{errors.newPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-black text-white font-semibold rounded-md shadow hover:bg-gray-900"
          >
            CHANGE PASSWORD
          </button>
          {errors.api && (
            <p className="text-xs text-red-500 mt-2">{errors.api}</p>
          )}
          {successMessage && (
            <p className="text-xs text-green-600 mt-2">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Password;
