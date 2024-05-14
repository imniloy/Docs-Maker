import React, { useContext, useEffect, useState } from "react";
import Header from "../components/homepage/Header";
import AllDocsContainer from "../components/homepage/AllDocsContainer";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { base_url } from "../../utils";
import axios from "axios";

const HomePage = () => {
  const user = useContext(AuthContext);
  const [all_docs, set_all_docs] = useState([]);

  const get_all_docs = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const { data } = await axios.get(`${base_url}/api/docs/all`, config);
      set_all_docs(data.all_docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.token && user.user._id) {
      get_all_docs();
    }
  }, [user]);

  return (
    <main className="bg-white">
      <Header />
      <div className="max-w-7xl mx-auto py-3">
        <AllDocsContainer set_all_docs={set_all_docs} all_docs={all_docs} />
      </div>
    </main>
  );
};

export default HomePage;
