import React, { useState } from "react";
import DocsLogo from "../assets/docs.png";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { TiArrowSortedDown } from "react-icons/ti";
import { MdOutlineDone } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  // console.log(pathname);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [seletedFilter, setSeletedFilter] = useState("Owned by me");
  const [showFilter, setshowFilter] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchText);
  };

  const onChangeText = (e) => {
    setSearchText(e.target.value);
  };

  const filterOptions = (item) => {
    setSeletedFilter(item);
    setshowFilter(false);
  };

  const signOutFunc = () => {};

  return (
    <header className="font-opensans">
      <div className="w-full p-2 text-primary-black flex items-center justify-between">
        <Link to={`/`}>
          <div className="flex items-center space-x-1">
            <img src={DocsLogo} className="h-10 w-10" alt="DocsLogo" />
            <p className="font-medium text-[22px] leading-[24px] hover:underline">
              Docs Maker
            </p>
          </div>
        </Link>

        {!pathname.startsWith("/myaccount") && (
          <div className="flex-grow bg-[#f1f3f4] max-w-2xl rounded-lg">
            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-between p-2"
            >
              <div className="p-2 cursor-pointer rounded-full hover:bg-[#dddedf] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-black"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <input
                type="text"
                onChange={onChangeText}
                placeholder="Search"
                className="w-full h-full bg-transparent px-2 py-1 text-base textop outline-none border-none focus:outline-none text-black placeholder:text-gray-500"
              />

              <div
                className={`p-2 cursor-pointer rounded-full hover:bg-[#dddedf] ${
                  searchText.length > 0 ? "block" : "hidden"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 cursor-pointer text-black"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </form>
          </div>
        )}
        <div className="space-x-5 flex">
          {!pathname.startsWith("/myaccount") && (
            <Link
              to={`/docs/${crypto.randomUUID()}`}
              className="py-[9px] px-6 font-medium text-sm bg-brand-color text-white hover:bg-brand-hover-color rounded"
            >
              Create a doc
            </Link>
          )}
          <div className="relative">
            <Avatar
              className="cursor-pointer"
              name="hhh"
              size="42"
              round={true}
              onClick={() => {
                setShowAccount(true);
              }}
            />

            {/* account informations */}
            <div
              onClick={() => {
                setShowAccount(false);
              }}
              className={`${
                showAccount ? "fixed" : "hidden"
              } top-0 bottom-0 left-0 right-0 bg-transparent z-[9999]`}
            />
            <div
              className={`${
                showAccount
                  ? "absolute w-[400px] scale-100 z-[99999]"
                  : "hidden w-0 scale-50"
              } transition-all duration-300 right-2 top-14 bg-[#E9EDF6] p-6 rounded-xl shadow-lg`}
            >
              <div className="w-full flex items-center">
                <p className="text-center flex-grow font-semibold text-[#4e5056]">
                  imniloy8@gmail.com
                </p>

                <div
                  onClick={() => {
                    setShowAccount(false);
                  }}
                  className={`p-2 cursor-pointer rounded-full hover:bg-[#dddedf] absolute right-2 top-4`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 cursor-pointer text-black"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center flex-col my-4">
                <Avatar
                  className="cursor-pointer"
                  name="hhh"
                  size="80"
                  value="96%"
                  round={true}
                />

                <p className="text-[#202124] font-medium mt-4 text-xl">
                  HI! Niloy
                </p>
              </div>

              <div
                className="px-4 py-2 border border-[#202124] hover:border-[#4285F4] mx-auto max-w-[280px] font-semibold text-center cursor-pointer rounded-[36px] w-full hover:text-[#4285F4]"
                onClick={() => navigate(`/myaccount/1`)}
              >
                View Your Account Sessions
              </div>

              <button
                onClick={signOutFunc}
                className="w-full px-10 py-4 rounded-[100px] bg-white hover:bg-[#DCE1E8] mt-6 flex items-center justify-center space-x-2"
              >
                <PiSignOutBold className="h-6 w-6 text-[#202124]" />
                <p className="text-base font-semibold text-[#202124]">
                  Sign Out
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      {!pathname.startsWith("/myaccount") && (
        <div className="w-full">
          <div className="w-full max-w-7xl mx-auto p-5 flex items-center justify-between">
            <div className="flex-grow">
              <p className="font-semibold text-lg text-[#202124]">
                Recent documents
              </p>
            </div>
            <div className="flex items-center space-x-10">
              <div className="relative w-[200px]">
                <button
                  onClick={() => setshowFilter(!showFilter)}
                  className="px-3 py-1 hover:bg-[#e8e9ea] flex items-center  mx-auto space-x-1"
                >
                  <p className="text-sm font-semibold">{seletedFilter}</p>
                  <TiArrowSortedDown className="h-4 w-4" />
                </button>

                <div
                  className={`top-0 left-0 bottom-0 right-0 bg-transparent ${
                    showFilter ? "fixed" : "hidden"
                  }`}
                  onClick={() => setshowFilter(false)}
                />
                <div
                  className={`absolute py-1 w-[200px] top-10 right-[50%] translate-x-[50%] my-1 bg-white card_shadow text-[#414549] rounded ${
                    showFilter ? "visible" : "invisible"
                  }`}
                >
                  {["Owned by anyone", "Owned by me"].map((item, i) => (
                    <div
                      onClick={(e) => filterOptions(item)}
                      key={i}
                      className="w-full flex items-center space-x-2 font-semibold text-sm py-2 hover:bg-[#e8e9ea] px-4 cursor-pointer"
                    >
                      {seletedFilter === item ? (
                        <MdOutlineDone className="h-5 w-5" />
                      ) : (
                        <div className="h-5 w-5" />
                      )}
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-[150px]">
                <p className="text-sm font-semibold text-center">
                  Last opened by me
                </p>
              </div>

              <div className="w-[70px]">
                <p className="text-sm font-semibold text-right">Remove</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
