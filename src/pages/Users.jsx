import { useState } from "react";
import Modal from "../components/Modal";
import UserForm from "../components/forms/UserForm";
import { useSelector } from "react-redux";
import UserTable from "../components/tables/UserTable";
import { getAuthData } from "../features/auth/authSlice";
import { Helmet } from "react-helmet-async";

export default function Users() {
  // login user
  const { user } = useSelector(getAuthData);

  // modal
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <Helmet>
        <meta property="og:title" content="Users-KIN" />
        <meta
          property="og:description"
          content="KIN Executive member who have access this page"
        />
        <title>Users | KIN</title>
      </Helmet>
      <div className="xl:w-[1230px] pt-6 pb-10 mx-auto xl:px-0 sm:px-10 px-3  overflow-hidden">
        {user?.role !== "moderator" && (
          <div className="mb-4">
            <button
              type="button"
              className="flex items-center  gap-1 justify-center   text-sm h-fit w-fit bg-blue-500 rounded-md py-[6px] px-2  text-white"
              onClick={() => setFormOpen(!formOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 font-bold"
                color="white"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path>
              </svg>
              <span className="block font-bold text-[12px]">Add User</span>
            </button>
          </div>
        )}
        <div className="border border-general px-2 sm:px-6 pt-2 pb-6 rounded-md">
          <div className="overflow-x-scroll pb-4">
            <UserTable />
          </div>
        </div>
      </div>

      {/* modal for add new user  */}
      {formOpen && (
        <Modal toggleModal={() => setFormOpen(!formOpen)} title="Add New User">
          <UserForm toggleModal={() => setFormOpen(!formOpen)} type={"add"} />
        </Modal>
      )}
    </>
  );
}
