import { useEffect, useState } from "react";
import host from "../../host";

const UnpaidBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [payingId, setPayingId] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await fetch(host + "/api/v1/bills/unpaid", {
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
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("An error occurred while fetching bills.");
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  const handlePayBill = async (billId) => {
    setActionError("");
    setPayingId(billId);
    try {
      const res = await fetch(`${host}/api/v1/bills/${billId}/pay`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Update bill status locally
        setBills((prev) =>
          prev.map((bill) =>
            bill._id === billId
              ? { ...bill, status: "Paid", completed: true }
              : bill
          )
        );
      } else {
        setActionError(data.message || "Failed to pay bill.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setActionError("An error occurred while paying the bill.");
    } finally {
      setPayingId(null);
    }
  };

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
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Unpaid Bills
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
              {bill.status !== "Paid" && (
                <button
                  onClick={() => handlePayBill(bill._id)}
                  className={`mt-4 w-full py-2 bg-black text-white rounded-md hover:bg-gray-900 transition ${
                    payingId === bill._id ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  disabled={payingId === bill._id}
                >
                  {payingId === bill._id ? "Paying..." : "Pay Bill"}
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

export default UnpaidBills;
