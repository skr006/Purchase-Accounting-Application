const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Paid: "bg-green-100 text-green-800",
  Closed: "bg-gray-200 text-gray-800",
};

const personName = (user) => {
  const firstName = user?.name?.firstName || "";
  const lastName = user?.name?.lastName || "";
  return `${firstName} ${lastName}`.trim() || user?.username || "Unknown user";
};

const BillCard = ({ bill, onPay, onClose, busy, mode }) => {
  const status = bill.completed ? "Closed" : bill.status;
  const canPay = mode === "received" && bill.status === "Pending" && !bill.completed;
  const canClose = mode === "created" && bill.status === "Paid" && !bill.completed;

  return (
    <article className="bg-white rounded-md shadow-sm border border-gray-200 p-5 flex flex-col min-h-64">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase text-gray-500 tracking-wide">
            {mode === "created" ? "Bill To" : "Bill From"}
          </p>
          <h2 className="text-lg font-semibold text-gray-900 break-words">
            {mode === "created" ? personName(bill.to) : personName(bill.from)}
          </h2>
          <p className="text-sm text-gray-500 break-words">
            @{mode === "created" ? bill.to?.username : bill.from?.username}
          </p>
        </div>
        <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}>
          {status}
        </span>
      </div>

      <p className="mt-4 text-sm text-gray-700 break-words">
        {bill.description}
      </p>

      <div className="mt-auto pt-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xl font-bold text-gray-900">Rs. {Number(bill.amount).toFixed(2)}</p>
          <p className="text-xs text-gray-400">
            {new Date(bill.createdAt).toLocaleDateString()}
          </p>
        </div>

        {canPay && (
          <button
            onClick={() => onPay(bill._id)}
            disabled={busy}
            className="mt-4 w-full py-2 bg-black text-white rounded-md hover:bg-gray-900 transition disabled:opacity-60"
          >
            {busy ? "Marking paid..." : "Mark as Paid"}
          </button>
        )}

        {canClose && (
          <button
            onClick={() => onClose(bill._id)}
            disabled={busy}
            className="mt-4 w-full py-2 bg-black text-white rounded-md hover:bg-gray-900 transition disabled:opacity-60"
          >
            {busy ? "Closing..." : "Close Bill"}
          </button>
        )}

        {mode === "created" && bill.status === "Pending" && !bill.completed && (
          <p className="mt-4 text-sm text-gray-500">
            Waiting for receiver to mark this bill as paid.
          </p>
        )}
      </div>
    </article>
  );
};

export default BillCard;
