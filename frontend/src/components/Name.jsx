import { useState } from "react";

const Name = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trim whitespace from both ends
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();

    // Validation: prevent only spaces or empty input
    if (!trimmedFirst || !trimmedLast) {
      alert("First name and last name cannot be empty or just spaces.");
      return;
    }

    fetch("http://localhost:5001/api/v1/users/profile-update/name", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ firstName, lastName }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Name updated successfully!");
        } else {
          alert(data.message || "Failed to update name.");
        }
      })
      .catch((err) => {
        console.error("Error updating name:", err);
        alert("An error occurred while updating the name.");
      });

    // Reset fields
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 w-screen">
      <div className="max-w-md bg-white p-8 rounded-md shadow-md w-full">
        <h2 className="text-2xl font-bold text-gray-800">Change Your Name</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter your new first and last name below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-black text-white font-semibold rounded-md shadow hover:bg-gray-900"
          >
            CHANGE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Name;
