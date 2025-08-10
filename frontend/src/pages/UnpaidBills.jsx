import { useEffect, useState } from "react";

const UnpaidBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/v1/bills/unpaid", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setBills(data.bills || []);
        } else {
          setError(data.message || "Failed to load bills.");
        }
      } catch (err) {
        setError("An error occurred while fetching bills.");
        error.message = err.message;
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading bills...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Unpaid Bills
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bills.length > 0 ? (
          bills.map((bill) => (
            <div
              key={bill._id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  To: {bill.to.name.firstName} {bill.to.name.lastName}
                </h2>
                <p className="text-gray-600 text-sm">
                  From: {bill.from.name.firstName} {bill.from.name.lastName}
                </p>
                <p className="text-gray-600 text-sm">
                  Description: {bill.description}
                </p>
              </div>
              <div className="mt-auto flex justify-between items-center">
                <p className="text-lg font-bold text-black">₹{bill.amount}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    bill.completed
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {bill.completed ? "Paid" : "Pending"}
                </span>
              </div>
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

export default UnpaidBills;
