import { useAuth } from "../hooks/useAuth";

const DetailRow = ({ label, value }) => (
  <div className="flex flex-col px-2 sm:px-8 py-3 sm:py-4 border-b">
    <span className="text-xs sm:text-sm text-gray-500 mb-1">{label}</span>
    <span className="text-base sm:text-xl text-gray-900 font-medium break-words">
      {value || "N/A"}
    </span>
  </div>
);

const PersonalInfo = () => {
  const { user } = useAuth();

  return (
    <div className="flex-1 p-4 sm:p-6 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl sm:text-4xl font-semibold text-center text-gray-800 mb-8">
          Personal Details
        </h1>

        <div className="bg-white border border-gray-200 rounded-md shadow-sm">
          <DetailRow label="First Name" value={user?.name?.firstName} />
          <DetailRow label="Last Name" value={user?.name?.lastName} />
          <DetailRow label="Username" value={user?.username} />
          <DetailRow label="Email" value={user?.email} />
          <DetailRow label="Phone Number" value={user?.phoneNumber} />
          <DetailRow label="Street" value={user?.address?.street} />
          <DetailRow label="Area" value={user?.address?.area} />
          <DetailRow label="City" value={user?.address?.city} />
          <DetailRow label="State" value={user?.address?.state} />
          <DetailRow label="Country" value={user?.address?.country} />
          <DetailRow label="Zip Code" value={user?.address?.zipCode} />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
