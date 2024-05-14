import React, { useContext, useEffect, useState } from "react";
import Header from "../components/homepage/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { base_url } from "../../utils";
import { FaWindows } from "react-icons/fa6";
import { FcLinux } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { FaLaptopCode } from "react-icons/fa6";
import moment from "moment";
import { AuthContext } from "../context/AuthProvider";

const SessionsPage = () => {
  const [loginHistories, setLoginHistories] = useState([]);
  const navigate = useNavigate();
  const userCookie = Cookies.get("userToken");
  const user = useContext(AuthContext);
  const deviceTypes = ["macos", "mac", "windows", "linux"];
  const getHistories_data = async () => {
    try {
      const response = await fetch(`${base_url}/api/login/history`, {
        method: "GET",
        credentials: "include",
        headers: {
          authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      });

      const { data } = await response.json();

      console.log(data);
      if (data?.length > 0) {
        setLoginHistories(data);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");

        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (user && user.token && user.user._id) {
      getHistories_data();
    }
  }, [user]);

  return (
    <div className="w-full font-opensans">
      <Header />

      <div className="max-w-5xl w-full mx-auto py-8 text-[#202124] space-y-10">
        <div>
          <h3 className="text-[#202124] font-semibold text-lg">Your devices</h3>
          <p className="">
            You’re signed in on these devices or have been in the last 6 months
          </p>
        </div>

        <div className="relative overflow-x-auto">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs text-[#202124] uppercase bg-[#f1f3f4]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Device name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Model
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Browser
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Ip address
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loginHistories.map((item, i) => (
                  <tr
                    key={i}
                    className="bg-white hover:bg-[#4284f51e] border-b last:border-b-0 font-medium cursor-pointer"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {i + 1}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap flex items-center space-x-2"
                    >
                      {item.device_info.type == "desktop" &&
                        item.device_info.name.toLowerCase() === "windows" && (
                          <FaWindows />
                        )}

                      {item.device_info.type == "desktop" &&
                        item.device_info.name.toLowerCase().includes("mac") && (
                          <FaApple />
                        )}

                      {item.device_info.type == "desktop" &&
                        item.device_info.name
                          .toLowerCase()
                          .includes("linux") && <FcLinux />}

                      {item.device_info.type == "desktop" &&
                        item.device_info.name
                          .toLowerCase()
                          .includes("linux") && <FcLinux />}

                      {item.device_info.type == "desktop" &&
                        !deviceTypes.includes(
                          item.device_info.name.toLowerCase()
                        ) && <FaLaptopCode />}

                      {item.device_info.type == ("smartphone" || "phablet") && (
                        <HiDevicePhoneMobile />
                      )}

                      <p>{item.device_info.name}</p>
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      {item.device_info.model}
                    </th>

                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      {item.device_info.browser}
                    </th>
                    <td className="px-6 py-4 text-center">{item.ip}</td>
                    <td className="px-6 py-4">
                      {moment(item.updatedAt).format("LLLL")}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium cursor-pointer text-center text-blue-600 dark:text-blue-500 hover:underline">
                        {userCookie !== item.token ? "SignOut" : "SignOut Me"}
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
