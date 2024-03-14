import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../features/auth/authApiSlice";
import { getAuthData } from "../features/auth/authSlice";

import usePopupControl from "../hooks/usePopupControl";
import Modal from "./Modal";
import UserForm from "./forms/UserForm";
import { allUsers } from "../features/users/usersApiSlice";
import { allDonars } from "../features/donars/donarApiSlice";
import { allHistory } from "../features/history/historyApiSlice";
import { allPatient } from "../features/patient/patientApiSlice";

import logo from "../assets/logo_white.webp";

export default function Navbar() {
  // dispatch
  const dispatch = useDispatch();

  // popup control 1
  const { isOpen, toggleMenu, popupRef } = usePopupControl();

  // popup control 1
  const {
    isOpen: sideOpen,
    toggleMenu: toggle,
    popupRef: popRef,
  } = usePopupControl();

  // message
  const { user } = useSelector(getAuthData);

  // handle logout
  const handleLogout = () => {
    dispatch(userLogout());
  };

  // handle password update modal state
  const [passwordUpdateModal, setPasswordUpdateModal] = useState({
    open: false,
    data: null,
  });

  // load all data
  useEffect(() => {
    dispatch(allUsers());
    dispatch(allDonars());
    dispatch(allHistory());
    dispatch(allPatient());
  }, [dispatch]);

  return (
    <>
      <nav className="bg-[#0b1221]">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div
              className="inset-y-0 left-0 flex items-center sm:hidden relative z-10"
              ref={popupRef}
            >
              {/* Mobile menu button */}
              <button
                className="relative inline-flex items-center justify-center rounded-md p-2  text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset border border-slate-600"
                onClick={toggleMenu}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
              {/* <!-- Mobile menu, show/hide based on menu state. --> */}
              {isOpen && (
                <div
                  className=" absolute  -left-[7px]  rounded-md top-[53px] bg-[#0b1221] p-2 border-2 border-[#1c364665]"
                  // ref={popupRef}
                >
                  <div className=" w-[200px]  space-y-1">
                    <NavLink
                      to={"/"}
                      className="rounded-md  hover:bg-[#1f2937] text-white block  px-3 py-2 text-base font-medium"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to={"/users"}
                      className="rounded-md  text-gray-300 hover:bg-[#1f2937] hover:text-white block  px-3 py-2 text-base font-medium"
                    >
                      Users
                    </NavLink>
                    <NavLink
                      to={"/patient"}
                      className=" rounded-md  text-left text-gray-300 hover:bg-[#1f2937] hover:text-white block  px-3 py-2 text-base font-medium"
                    >
                      Patient
                    </NavLink>
                    <NavLink
                      to={"/summary"}
                      className=" rounded-md  text-left text-gray-300 hover:bg-[#1f2937] hover:text-white block  px-3 py-2 text-base font-medium"
                    >
                      Summary
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
            <div className="flex w-fit items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link to={"/"}>
                  <img className=" h-12" src={logo} alt="Your Company" />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block my-auto">
                <div className="flex space-x-4">
                  {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                  <NavLink
                    to="/"
                    className="hover:bg-[#1f2937] text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={"/users"}
                    className="hover:bg-[#1f2937] text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Users
                  </NavLink>
                  <NavLink
                    to={"/patient"}
                    className="hover:bg-[#1f2937] text-white rounded-md px-3 py-2 text-sm font-medium relative"
                  >
                    Patient
                  </NavLink>
                  <NavLink
                    to={"/summary"}
                    className="hover:bg-[#1f2937] text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Summary
                  </NavLink>
                </div>
              </div>
            </div>
            <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown  */}
              <div className="relative ml-3">
                <div ref={popRef}>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2f4e2f] focus:ring-offset-1 items-center justify-center focus:ring-offset-gray-800"
                    onClick={toggle}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      x="0"
                      y="0"
                      viewBox="0 0 512 512"
                      className=" w-8 p-1 bg-[#2d357f] rounded-full"
                    >
                      <g>
                        <linearGradient
                          id="a"
                          x1="256"
                          x2="256"
                          y1="512"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#5cc4bb"></stop>
                          <stop offset=".097" stopColor="#50c1c0"></stop>
                          <stop offset=".501" stopColor="#25b4d2"></stop>
                          <stop offset=".815" stopColor="#0aacde"></stop>
                          <stop offset="1" stopColor="#00a9e2"></stop>
                        </linearGradient>
                        <path
                          fill="url(#a)"
                          d="M279.437 242.692h-46.874C147.279 242.692 77.9 303.1 77.9 377.346v91.525C77.9 492.653 99.3 512 125.6 512h260.8c26.305 0 47.705-19.347 47.705-43.129v-91.525c0-74.246-69.384-134.654-154.668-134.654zm122.668 226.179c0 5.929-7.338 11.129-15.705 11.129H125.6c-8.366 0-15.7-5.2-15.7-11.129v-91.525c0-56.6 55.028-102.654 122.668-102.654h46.874c67.64 0 122.668 46.051 122.668 102.654zM256 220.866a110.433 110.433 0 1 0-110.434-110.433A110.558 110.558 0 0 0 256 220.866zM256 32a78.433 78.433 0 1 1-78.434 78.433A78.522 78.522 0 0 1 256 32z"
                          opacity="1"
                        ></path>
                      </g>
                    </svg>
                  </button>
                  {sideOpen && (
                    <div className="absolute -right-2 z-10 mt-4 w-48 origin-top-right rounded-md text-white bg-[#050f1df2] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <button
                        className="w-full text-left block px-4 py-2 text-sm  hover:bg-slate-700"
                        onClick={() =>
                          setPasswordUpdateModal({
                            open: !passwordUpdateModal.open,
                            data: user,
                          })
                        }
                      >
                        Password Change
                      </button>
                      <button
                        className="w-full text-left block px-4 py-2 text-sm  hover:bg-slate-700"
                        onClick={handleLogout}
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* modal for update user password  */}
      {passwordUpdateModal?.open && (
        <Modal
          toggleModal={() =>
            setPasswordUpdateModal({
              open: false,
              data: null,
            })
          }
          title="Update User Password"
        >
          <UserForm
            data={passwordUpdateModal.data}
            title="Update User Password"
            type="p-update"
            toggleModal={() =>
              setPasswordUpdateModal({
                open: false,
                data: null,
              })
            }
          />
        </Modal>
      )}
    </>
  );
}
