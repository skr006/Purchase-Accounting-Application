import Sidebar from "../components/Profilebar";
import PageContent from "../components/PageContent";
import { useState } from "react";
import PersonalInfo from "../components/PersonalInfo";
import Username from "../components/Username";
const Profile = () => {
  const [category, setCategory] = useState(0);

  // Import your components for each category

  return (
    <div className="flex h-screen py-20">
      <Sidebar setCategory={setCategory} />
      {category === 0 && <PageContent />}
      {category === 1 && <PersonalInfo />}
      {category === 2 && <Username />}
    </div>
  );
};

export default Profile;
