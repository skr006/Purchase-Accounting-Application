import { Link } from "react-router-dom";
import { FilePlus2, Inbox, ReceiptText, WalletCards } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const actions = [
  {
    to: "/new-bill",
    label: "Create Bill",
    description: "Send a new bill to another user by username.",
    icon: FilePlus2,
  },
  {
    to: "/unpaid",
    label: "Received Bills",
    description: "Review bills sent to you and mark them paid.",
    icon: Inbox,
  },
  {
    to: "/my",
    label: "Created Bills",
    description: "Track paid status and close verified bills.",
    icon: ReceiptText,
  },
  {
    to: "/paid",
    label: "Paid Bills",
    description: "See bills you have already marked as paid.",
    icon: WalletCards,
  },
];

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Purchase Accounting
          </h1>
          <p className="mt-4 text-gray-600">
            Create, receive, pay, and close bills with clear ownership at every step.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/login" className="px-5 py-2 bg-black text-white rounded-md font-semibold">
              Sign In
            </Link>
            <Link to="/signup" className="px-5 py-2 bg-white border border-gray-300 rounded-md font-semibold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="mb-8">
        <p className="text-sm text-gray-500">Welcome back</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {user?.name?.firstName || user?.username}
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.to}
              to={action.to}
              className="bg-white border border-gray-200 rounded-md p-5 shadow-sm hover:shadow-md transition"
            >
              <Icon className="h-7 w-7 text-gray-900" />
              <h2 className="mt-4 text-lg font-semibold text-gray-900">
                {action.label}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
