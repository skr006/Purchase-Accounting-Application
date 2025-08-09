import Sidebar from "../components/Profilebar";
import { useState } from "react";
import PersonalInfo from "../components/PersonalInfo";
import Username from "../components/Username";
import Name from "../components/Name";
import Address from "../components/Address";
const Profile = () => {
  const [category, setCategory] = useState(0);

  // Import your components for each category

  return (
    <div className="flex min-h-screen">
      <Sidebar setCategory={setCategory} />
      {category === 0 && <PersonalInfo />}
      {category === 1 && <PersonalInfo />}
      {category === 2 && <Name />}
      {category === 3 && <Address />}
      {category === 4 && <Username />}
      {/* {category === 5 && <PhoneNumber />}
      {category === 6 && <ChangePassword />} */}
    </div>
  );
};

export default Profile;
