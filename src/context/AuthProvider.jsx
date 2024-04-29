import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userInfo, set_user_info] = useState(null);

  useEffect(() => {
    let user_token = localStorage.getItem("user_token");
    // console.log(user_token);
    if (user_token) {
      // console.log("Token is not undefined or null");

      const decoded = jwtDecode(user_token);
      if (decoded && decoded._id) {
        const currentTime = new Date().getTime() / 1000;
        // console.log(currentTime);
        if (decoded.exp > currentTime) {
          set_user_info({
            user: decoded,
            token: user_token,
          });
        } else {
          set_user_info({
            user: "",
            token: "",
          });
        }
      }
    } else {
      // console.log("Token is undefined or null");

      set_user_info({
        user: "",
        token: "",
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
