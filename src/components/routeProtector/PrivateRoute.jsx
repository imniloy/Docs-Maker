import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const userInfo = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && !userInfo.user && !userInfo.user._id & !userInfo.token) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  // console.log(userInfo);
  return children;
};

export default PrivateRoute;
