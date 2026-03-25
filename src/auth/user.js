import { useState } from "react";

export const useUser = ({ setApiClient, Wazo }) => {
  // user
  const [user, setUser] = useState("");

  // user logout
  const userLogout = async () => {
    await Wazo.Phone.disconnect();
    await Wazo.Auth.logout(false);
    setApiClient({});
    setUser("");
  };

  // password
  const userPasswordUpdate = async (oldPassword, newPassword) => {
    try {
      const res = await Wazo.auth.updatePassword(user.uuid, oldPassword, newPassword);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    user,
    setUser,
    userLogout,
    userPasswordUpdate,
  };
};
