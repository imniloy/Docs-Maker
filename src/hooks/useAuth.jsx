import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
  const { user, token } = useContext(AuthContext);

  return { user, token };
};

export default useAuth;
