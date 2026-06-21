import { useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../lib/api";

const initialForm = {
  to: "",
  description: "",
  amount: "",
};

const NewBill = () => {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      to: formData.to.trim(),
      description: formData.description.trim(),
      amount: Number(formData.amount),
    };

    if (!payload.to || !payload.description || !Number.isFinite(payload.amount) || payload.amount <= 0) {
      setError("Recipient username, description, and a positive amount are required.");
      return;
    }

    setSubmitting(true);

    try {
      await apiFetch("/api/v1/bills", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setSuccess("Bill created successfully.");
      setFormData(initialForm);
    } catch (err) {
      setError(err.message || "Failed to create bill.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-md shadow-md border border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Create Bill
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
          Send a bill to another user by username.
        </p>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {success && (
          <div className="mb-4 text-sm text-green-700">
            {success}{" "}
            <Link to="/my" className="font-semibold underline">
              View created bills
            </Link>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Receiver Username
            </label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
              min="0.01"
              step="0.01"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 mt-2 bg-black text-white font-semibold rounded-md shadow hover:bg-gray-900 disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create Bill"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBill;
