import React from "react";

const PageContent = () => {
  return (
    <div className="flex-1 p-8 bg-gray-100 overflow-auto">
      <h1 className="text-3xl font-semibold mb-4">
        Welcome to the Profile page
      </h1>
      <p className="text-gray-700 leading-relaxed">
        Navigate through the sidebar to view and edit your profile information.
      </p>
    </div>
  );
};

export default PageContent;
