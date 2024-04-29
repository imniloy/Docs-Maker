import React, { useContext, useEffect } from "react";
import Header from "../components/homepage/Header";
import AllDocsContainer from "../components/homepage/AllDocsContainer";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  // const { user } = useContext(AuthContext);
  // console.log(user);

  // useEffect(() => {
  //   if (!user) {
  //     return <Navigate to={`/login`} replace />;
  //   }
  // }, [user]);

  return (
    <main className="bg-white">
      <Header />
      <div className="max-w-7xl mx-auto py-3">
        <AllDocsContainer />
      </div>
    </main>
  );
};

export default HomePage;
