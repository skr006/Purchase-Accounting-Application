import Sidebar from "../components/ProfileBar";
import { useState } from "react";
import PersonalInfo from "../components/PersonalInfo";
import Username from "../components/Username";
import Name from "../components/Name";
import Address from "../components/Address";
import PhoneNumber from "../components/PhoneNumber";
import Password from "../components/Password";
const Profile = () => {
  const [category, setCategory] = useState(0);

  return (
    <div className="flex flex-col sm:flex-row min-h-[70vh]">
      <Sidebar setCategory={setCategory} />
      {category === 0 && <PersonalInfo />}
      {category === 1 && <PersonalInfo />}
      {category === 2 && <Name />}
      {category === 3 && <Address />}
      {category === 4 && <Username />}
      {category === 5 && <PhoneNumber />}
      {category === 6 && <Password />}
    </div>
  );
};

export default Profile;
