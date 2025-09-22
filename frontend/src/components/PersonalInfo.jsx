import { useEffect, useState } from "react";
import host from "../../host";

const PersonalInfo = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(host + "/api/v1/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          setUserData(data.data);
        } else {
          console.log("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex-1 p-6 flex items-center justify-center space-y-6 bg-transparent">
      <div className="w-full max-w-3xl px-2 sm:px-8 flex flex-col gap-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-center text-gray-700 mb-8 sm:mb-10">
          Personal Details
        </h1>
        <div className="w-full flex flex-col gap-0">
          {userData ? (
            <div className="flex flex-col gap-0 w-full">
              <div className="flex flex-col px-2 sm:px-8 py-3 sm:py-4 border-b">
                <span className="text-xs sm:text-sm font-sans text-gray-500 mb-1">
                  First Name
                </span>
                <span className="text-xl sm:text-2xl text-gray-900 font-serif break-words">
                  {userData.name.firstName}
                </span>
              </div>
              <div className="flex flex-col px-2 sm:px-8 py-3 sm:py-4 border-b">
                <span className="text-xs sm:text-sm font-sans text-gray-500 mb-1">
                  Last Name
                </span>
                <span className="text-xl sm:text-2xl text-gray-900 font-serif break-words">
                  {userData.name.lastName}
                </span>
              </div>
              <div className="flex flex-col px-2 sm:px-8 py-3 sm:py-4 border-b">
                <span className="text-xs sm:text-sm font-sans text-gray-500 mb-1">
                  Username
                </span>
                <span className="text-xl sm:text-2xl text-gray-900 font-serif break-words">
                  {userData.username}
                </span>
              </div>
              <div className="flex flex-col px-2 sm:px-8 py-3 sm:py-4 border-b">
                <span className="text-xs sm:text-sm font-sans text-gray-500 mb-1">
                  Email
                </span>
                <span className="text-xl sm:text-2xl text-gray-900 font-serif break-words">
                  {userData.email}
                </span>
              </div>
              <div className="flex flex-col px-2 sm:px-8 py-3 sm:py-4 border-b">
                <span className="text-xs sm:text-sm font-sans text-gray-500 mb-1">
                  Phone Number
                </span>
                <span className="text-xl sm:text-2xl text-gray-900 font-serif break-words">
                  {userData.phoneNumber}
                </span>
              </div>
              <div className="flex flex-col px-2 sm:px-8 py-3 sm:py-4 border-b">
                <span className="text-base sm:text-lg font-serif text-gray-700 mb-2">
                  Address
                </span>
                <div className="flex flex-col gap-1">
                  <div>
                    <span className="text-xs font-sans text-gray-500 mr-2">
                      Street:
                    </span>
                    <span className="text-base sm:text-lg text-gray-900 font-medium break-words">
                      {userData.address?.street || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-sans text-gray-500 mr-2">
                      Area:
                    </span>
                    <span className="text-base sm:text-lg text-gray-900 font-medium break-words">
                      {userData.address?.area || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-sans text-gray-500 mr-2">
                      City:
                    </span>
                    <span className="text-base sm:text-lg text-gray-900 font-medium break-words">
                      {userData.address?.city || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-sans text-gray-500 mr-2">
                      State:
                    </span>
                    <span className="text-base sm:text-lg text-gray-900 font-medium break-words">
                      {userData.address?.state || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-sans text-gray-500 mr-2">
                      Country:
                    </span>
                    <span className="text-base sm:text-lg text-gray-900 font-medium break-words">
                      {userData.address?.country || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-sans text-gray-500 mr-2">
                      Zip Code:
                    </span>
                    <span className="text-base sm:text-lg text-gray-900 font-medium break-words">
                      {userData.address?.zipCode || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-40">
              <span className="text-lg text-gray-500 animate-pulse">
                Loading...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
