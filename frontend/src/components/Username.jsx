import { useState } from "react";

const Username = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5001/api/v1/users/profile-update/username", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ username }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Username updated successfully!");
        } else {
          alert(data.message || "Failed to update username.");
        }
      })
      .catch((err) => {
        console.error("Error updating username:", err);
        alert("An error occurred while updating the username.");
      });
    setUsername("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 w-screen">
      <div className="max-w-51 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">
          Change your Username
        </h2>
        <p className="text-sm text-gray-600 mb-6">Enter below</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Username
            </label>
            <input
              type="text"
              name="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

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

export default Username;
