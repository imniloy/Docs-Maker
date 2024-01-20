import React from "react";
import Header from "../components/homepage/Header";
import { useLocation } from "react-router-dom";

const SessionsPage = () => {
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <div className="w-full font-opensans">
      <Header />

      <div className="max-w-4xl w-full mx-auto py-8 text-[#202124] space-y-10">
        <div>
          <h3 className="text-[#202124] font-semibold text-lg">Your devices</h3>
          <p className="">
            You’re signed in on these devices or have been in the last 6 months
          </p>
        </div>

        <div class="relative overflow-x-auto">
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right">
              <thead class="text-xs text-[#202124] uppercase bg-[#f1f3f4]">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    No
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Device name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Ip address
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" class="px-6 py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2].map((item, i) => (
                  <tr class="bg-white hover:bg-[#4284f51e] border-b last:border-b-0 font-medium cursor-pointer">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      1
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td class="px-6 py-4">28.137.242.54</td>
                    <td class="px-6 py-4">Jan 19, 2024</td>
                    <td class="px-6 py-4">
                      <p class="font-medium cursor-pointer text-center text-blue-600 dark:text-blue-500 hover:underline">
                        Signout
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionsPage;
