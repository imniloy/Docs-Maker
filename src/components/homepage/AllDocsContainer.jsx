import React, { useContext } from "react";
import logo from "../assets/docs.png";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../../utils";
import { IoEye } from "react-icons/io5";

const AllDocsContainer = ({ all_docs, set_all_docs }) => {
  const user = useContext(AuthContext);
  const router = useNavigate();
  if (user && !user.user?._id) return;

  const delete_doc = async (id) => {
    try {
      const response = await fetch(`${base_url}/api/docs/doc-delete/${id}`, {
        method: "Delete",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.id) {
        let new_docs = all_docs.filter((doc) => doc._id != data.id);
        console.log(new_docs);
        set_all_docs(new_docs);
      }
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };

  return (
    <div className="">
      {all_docs.map((doc) => (
        <div
          key={doc._id}
          className="w-full border-b last:border-0 flex items-center justify-between rounded-lg hover:bg-[#4284f51e] cursor-pointer"
        >
          <div
            onClick={() => {
              router(`docs/${doc._id}`);
            }}
            className="py-3 px-5"
          >
            <img className="h-6 w-6" src={logo} alt="logo" />
          </div>
          <div
            onClick={() => {
              router(`docs/${doc._id}`);
            }}
            className="flex-grow"
          >
            <p className="text-sm font-medium text-[#202124]">{doc.name}</p>
          </div>

          <div className="flex items-center space-x-10">
            <div
              onClick={() => {
                router(`docs/${doc._id}`);
              }}
              className="w-[180px] text-sm font-medium text-[#5f6368] text-center capitalize"
            >
              {doc.owner_id?._id === user.user._id ? "Me" : doc.owner_id?.name}
            </div>
            <div
              onClick={() => {
                router(`docs/${doc._id}`);
              }}
              className="w-[150px] text-center text-sm font-medium text-[#5f6368]"
            >
              {moment(doc.createAt).format("lll")}
            </div>
            <div className="pl-3 pr-6">
              <div className="w-full p-2 rounded-full hover:bg-[#dddedf]">
                {doc.owner_id._id == user.user._id ? (
                  <MdDelete
                    onClick={() => delete_doc(doc._id)}
                    className="h-6 w-6 text-[#5f6368]"
                  />
                ) : (
                  <div
                    onClick={() => router(`docs/${doc._id}`)}
                    className="h-6 w-6"
                  >
                    <IoEye className="h-6 w-6 text-[#5f6368]" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllDocsContainer;
