import { useState } from "react";
import host from "../../host";
const NewBill = () => {
  const [formData, setFormData] = useState({
    to: "",
    description: "",
    amount: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Trim and validate
    const to = formData.to.trim();
    const description = formData.description.trim();
    const amountValue = formData.amount.trim();

    if (!to || !description || !amountValue) {
      setError("All fields are required and cannot be empty.");
      return;
    }

    if (isNaN(amountValue) || Number(amountValue) <= 0) {
      setError("Amount must be a valid positive number.");
      return;
    }

    try {
      const res = await fetch(host + "/api/v1/bills/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if authentication is needed
        },
        body: JSON.stringify({ to, description, amount: Number(amountValue) }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess("Bill created successfully!");
        setFormData({ to: "", description: "", amount: "" });
      } else {
        setError(data.message || "Failed to create bill.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the bill.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 sm:py-16 md:py-20 pt-15">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white p-4 sm:p-8 rounded-md shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Create New Bill
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
          Fill in the bill details below.
        </p>

        {error && <p className="mb-4 text-red-600">{error}</p>}
        {success && <p className="mb-4 text-green-600">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          {/* To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bill To
            </label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
              min="0.01"
              step="0.01"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-black text-white font-semibold rounded-md shadow hover:bg-gray-900"
          >
            CREATE BILL
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBill;
