import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { apiFetch } from "../lib/api";

const fields = [
  ["street", "Door Number & Street"],
  ["area", "Area"],
  ["city", "City"],
  ["state", "State"],
  ["country", "Country"],
  ["zipCode", "Zip Code"],
];

const Address = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    street: user?.address?.street || "",
    area: user?.address?.area || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    country: user?.address?.country || "",
    zipCode: user?.address?.zipCode || "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const payload = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );

    if (Object.values(payload).some((value) => !value)) {
      setError("All address fields are required.");
      return;
    }

    setSubmitting(true);
    try {
      const data = await apiFetch("/api/v1/users/profile-update/address", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      updateUser(data.data);
      setMessage("Address updated successfully.");
    } catch (err) {
      setError(err.message || "Failed to update address.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-md shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Update Address</h2>
        <p className="text-sm text-gray-600 mb-6">Enter your complete address.</p>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {message && <p className="mb-4 text-sm text-green-700">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 mt-2 bg-black text-white font-semibold rounded-md shadow hover:bg-gray-900 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;
