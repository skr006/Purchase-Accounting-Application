import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { apiFetch } from "../lib/api";

const PhoneNumber = () => {
  const { user, updateUser } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setSubmitting(true);
    try {
      const data = await apiFetch("/api/v1/users/profile-update/phone", {
        method: "PUT",
        body: JSON.stringify({ phoneNumber }),
      });
      updateUser(data.data);
      setMessage("Phone number updated successfully.");
    } catch (err) {
      setError(err.message || "Failed to update phone number.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-md shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Change Phone Number</h2>
        <p className="text-sm text-gray-600 mb-6">Enter a 10-digit phone number.</p>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {message && <p className="mb-4 text-sm text-green-700">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Phone Number
            </label>
            <input
              type="tel"
              inputMode="numeric"
              pattern="\d{10}"
              maxLength="10"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 mt-2 bg-black text-white font-semibold rounded-md shadow hover:bg-gray-900 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Phone Number"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhoneNumber;
