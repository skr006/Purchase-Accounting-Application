import Sidebar from "../components/ProfileBar";
import { useState } from "react";
import PersonalInfo from "../components/PersonalInfo";
import Username from "../components/Username";
import Name from "../components/Name";
import Address from "../components/Address";
import Phonenumber from "../components/Phonenamber";
import Password from "../components/Password";
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
      {category === 5 && <Phonenumber />}
      {category === 6 && <Password />}
    </div>
  );
};

export default Profile;
