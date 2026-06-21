import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BillCard from "../components/BillCard";
import { apiFetch } from "../lib/api";

const UnpaidBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const data = await apiFetch("/api/v1/bills/unpaid");
        setBills(data.bills || []);
      } catch (err) {
        setError(err.message || "Failed to load bills.");
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  const handlePayBill = async (billId) => {
    setActionError("");
    setActionMessage("");
    setBusyId(billId);

    try {
      await apiFetch(`/api/v1/bills/${billId}/pay`, {
        method: "PATCH",
      });
      setBills((prev) => prev.filter((bill) => bill._id !== billId));
      setActionMessage("Bill marked as paid. The creator can now verify and close it.");
    } catch (err) {
      setActionError(err.message || "Failed to mark bill as paid.");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <p className="text-gray-600 text-lg">Loading bills...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <p className="text-red-500 text-lg text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Received Bills
        </h1>
        <p className="text-sm text-gray-600">
          Mark a received bill as paid after you complete payment.
        </p>
      </div>

      {actionError && <p className="text-red-600 mb-4">{actionError}</p>}
      {actionMessage && (
        <p className="text-green-700 mb-4">
          {actionMessage}{" "}
          <Link to="/paid" className="font-semibold underline">
            View paid bills
          </Link>
        </p>
      )}

      {bills.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bills.map((bill) => (
            <BillCard
              key={bill._id}
              bill={bill}
              mode="received"
              onPay={handlePayBill}
              busy={busyId === bill._id}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No unpaid received bills found.</p>
      )}
    </div>
  );
};

export default UnpaidBills;
