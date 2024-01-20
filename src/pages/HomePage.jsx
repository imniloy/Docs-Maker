import React from "react";
import Header from "../components/homepage/Header";
import AllDocsContainer from "../components/homepage/AllDocsContainer"; 

const HomePage = () => {
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
