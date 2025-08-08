import Sidebar from "../components/Profilebar";
import PageContent from "../components/PageContent";
import { useState } from "react";

const Profile = () => {
  const [category, setCategory] = useState(0);

  return (
    <div className="flex h-screen py-20">
      <Sidebar setCategory={setCategory} />
      <PageContent />
      <p>{category}</p>
    </div>
  );
};

export default Profile;
