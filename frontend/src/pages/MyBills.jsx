import { useEffect, useState } from "react";

const MyBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  // Fetch bills from API
  const fetchBills = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/v1/bills/my", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBills(data.bills || []);
        setError("");
      } else {
        setError(data.message || "Failed to load bills.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("An error occurred while fetching bills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // Close bill API call
  const handleCloseBill = async (billId) => {
    setActionError("");
    try {
      const res = await fetch(
        `http://localhost:5001/api/v1/bills/${billId}/close`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok && data.success) {
        // Update the bill in the UI without refetching everything
        setBills((prev) =>
          prev.map((bill) =>
            bill._id === billId
              ? { ...bill, status: "Paid", completed: true }
              : bill
          )
        );
      } else {
        setActionError(data.message || "Failed to close bill.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setActionError("An error occurred while closing the bill.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading bills...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        My Bills
      </h1>

      {actionError && (
        <p className="text-center text-red-500 mb-4">{actionError}</p>
      )}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bills.length > 0 ? (
          bills.map((bill) => (
            <div
              key={bill._id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  To: {bill.to?.name?.firstName} {bill.to?.name?.lastName}
                </h2>
                <p className="text-gray-600 text-sm">
                  From: {bill.from?.name?.firstName} {bill.from?.name?.lastName}
                </p>
                <p className="text-gray-600 text-sm">
                  Description: {bill.description}
                </p>
              </div>

              <div className="mt-auto flex justify-between items-center">
                <p className="text-lg font-bold text-black">₹{bill.amount}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    bill.status === "Paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {bill.status}
                </span>
              </div>

              {/* Close bill button if not paid */}
              {!bill.completed && (
                <button
                  onClick={() => handleCloseBill(bill._id)}
                  className="mt-4 w-full py-2 bg-black text-white rounded-md hover:bg-gray-900 transition"
                >
                  Close Bill
                </button>
              )}

              <p className="mt-3 text-xs text-gray-400">
                Created at: {new Date(bill.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No bills found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyBills;
