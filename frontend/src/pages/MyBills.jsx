import { useEffect, useState } from "react";
import BillCard from "../components/BillCard";
import { apiFetch } from "../lib/api";

const MyBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const fetchBills = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/api/v1/bills/my");
      setBills(data.bills || []);
    } catch (err) {
      setError(err.message || "Failed to load bills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleCloseBill = async (billId) => {
    setActionError("");
    setBusyId(billId);

    try {
      const data = await apiFetch(`/api/v1/bills/${billId}/close`, {
        method: "PATCH",
      });

      setBills((prev) => prev.map((bill) => (bill._id === billId ? data.bill : bill)));
    } catch (err) {
      setActionError(err.message || "Failed to close bill.");
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
          Created Bills
        </h1>
        <p className="text-sm text-gray-600">
          Close a bill only after the receiver marks it as paid.
        </p>
      </div>

      {actionError && <p className="text-red-600 mb-4">{actionError}</p>}

      {bills.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bills.map((bill) => (
            <BillCard
              key={bill._id}
              bill={bill}
              mode="created"
              onClose={handleCloseBill}
              busy={busyId === bill._id}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No created bills found.</p>
      )}
    </div>
  );
};

export default MyBills;
