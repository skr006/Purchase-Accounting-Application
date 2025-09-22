import { useState } from "react";
import host from "../../host";

const Phonenumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: must be exactly 10 digits
    if (!/^\d{10}$/.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    fetch(host + "/api/v1/users/profile-update/phone", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ phoneNumber }), // send lowercase key
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Phone number updated successfully!");
        } else {
          alert(data.message || "Failed to update phone number.");
        }
      })
      .catch((err) => {
        console.error("Error updating phone number:", err);
        alert("An error occurred while updating the phone number.");
      });

    setPhoneNumber("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 w-screen">
      <div className="max-w-51 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">
          Change your Phone Number
        </h2>
        <p className="text-sm text-gray-600 mb-6">Enter below</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Phone Number
            </label>
            <input
              type="tel" // Prevent number steppers
              inputMode="numeric" // Mobile numeric keypad
              pattern="\d{10}" // HTML5 validation for 10 digits
              maxLength="10"
              value={phoneNumber}
              onChange={(e) => {
                // Only allow numbers
                const value = e.target.value.replace(/\D/g, "");
                setPhoneNumber(value);
              }}
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

export default Phonenumber;
