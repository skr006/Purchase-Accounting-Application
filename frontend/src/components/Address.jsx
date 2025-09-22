import { useState } from "react";
import host from "../../host";

const Address = () => {
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setStateValue] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim values
    const trimmedStreet = street.trim();
    const trimmedArea = area.trim();
    const trimmedCity = city.trim();
    const trimmedState = state.trim();
    const trimmedCountry = country.trim();
    const trimmedZip = zipCode.trim();

    // Validation: No empty/space-only values
    if (
      !trimmedStreet ||
      !trimmedArea ||
      !trimmedCity ||
      !trimmedState ||
      !trimmedCountry ||
      !trimmedZip
    ) {
      alert("All address fields are required and cannot be just spaces.");
      return;
    }

    fetch(host + "/api/v1/users/profile-update/address", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        street: trimmedStreet,
        area: trimmedArea,
        city: trimmedCity,
        state: trimmedState,
        country: trimmedCountry,
        zipCode: trimmedZip,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Address updated successfully!");
          window.location.reload(); // optional: reload the page
        } else {
          alert(data.message || "Failed to update address.");
        }
      })
      .catch((err) => {
        console.error("Error updating address:", err);
        alert("An error occurred while updating the address.");
      });

    // Reset fields
    setStreet("");
    setArea("");
    setCity("");
    setStateValue("");
    setCountry("");
    setZipCode("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 w-screen">
      <div className="max-w-md bg-white p-8 rounded-md shadow-md w-full">
        <h2 className="text-2xl font-bold text-gray-800">
          Update Your Address
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter your complete address details below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Street */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Door Number & Street
            </label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area
            </label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setStateValue(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Zip Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code
            </label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-black text-white font-semibold rounded-md shadow hover:bg-gray-900"
          >
            UPDATE ADDRESS
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;
