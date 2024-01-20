import React from "react";
import logo from "../assets/docs.png";
import { MdDelete } from "react-icons/md";

const AllDocsContainer = () => {
  return (
    <div className="">
      {[
        { _id: 1, name: "Resume1", owner: ["Niloy"] },
        { _id: 2, name: "Resume2", owner: ["Me"] },
        { _id: 3, name: "Resume3", owner: ["Antu"] },
        { _id: 4, name: "Resume4", owner: ["Me"] },
        { _id: 5, name: "Resume5", owner: ["Me"] },
        { _id: 6, name: "Resume6", owner: ["Me"] },
      ].map((doc) => (
        <div
          key={doc._id}
          className="w-full border-b last:border-0 flex items-center justify-between rounded-lg hover:bg-[#4284f51e] cursor-pointer"
        >
          <div className="py-3 px-5">
            <img className="h-6 w-6" src={logo} alt="logo" />
          </div>
          <div className="flex-grow">
            <p className="text-sm font-medium text-[#202124]">{doc.name}</p>
          </div>

          <div className="flex items-center space-x-10">
            <div className="w-[180px] text-sm font-medium text-[#5f6368] text-center">
              {doc.owner}
            </div>
            <div className="w-[150px] text-center text-sm font-medium text-[#5f6368]">
              Jan 19, 2024
            </div>
            <div className="pl-3 pr-6">
              <div className="w-full p-2 rounded-full hover:bg-[#dddedf]">
                <MdDelete className="h-6 w-6 text-[#5f6368]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllDocsContainer;
