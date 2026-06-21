import { useEffect, useState } from "react";
import BillCard from "../components/BillCard";
import { apiFetch } from "../lib/api";

const PaidBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const data = await apiFetch("/api/v1/bills/paid");
        setBills(data.bills || []);
      } catch (err) {
        setError(err.message || "Failed to load bills.");
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

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
          Paid Bills
        </h1>
        <p className="text-sm text-gray-600">
          Bills you marked as paid. Closed bills have been verified by the creator.
        </p>
      </div>

      {bills.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bills.map((bill) => (
            <BillCard key={bill._id} bill={bill} mode="received" />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No paid bills found.</p>
      )}
    </div>
  );
};

export default PaidBills;
