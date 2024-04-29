import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const PublicRoute = ({ children }) => {
  const userInfo = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.user && userInfo.user._id) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return children;
};

export default PublicRoute;
