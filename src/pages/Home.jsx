import { useState } from "react";
import DonarTable from "../components/tables/DonarTable";
import Modal from "../components/Modal";
import DonarForm from "../components/forms/DonarForm";
import { useSelector, useDispatch } from "react-redux";
import { getAuthData } from "../features/auth/authSlice";
import { Helmet } from "react-helmet-async";
import ScaleLoader from "react-spinners/ScaleLoader";
import { donarFileUpload } from "../features/donars/donarApiSlice";

export default function Home() {
  // login user
  const { user } = useSelector(getAuthData);

  // dispatch
  const dispatch = useDispatch();

  // modal state
  const [formOpen, setFormOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  // handle file upload
  const handleFileUpload = (e) => {
    setLoading(true);
    const file = e.target.files[0];

    const form = new FormData();
    form.append("file", file);
    dispatch(
      donarFileUpload({
        form,
        setLoading,
      })
    );
  };

  return (
    <>
      <Helmet>
        <meta property="og:title" content="Donars KIN-Blood" />
        <meta
          property="og:description"
          content="KIN Blood application donars page"
        />
        <title>Donars | KIN</title>
      </Helmet>
      <div className="xl:w-[1230px] pt-6 pb-10 mx-auto xl:px-0 sm:px-10 px-3  overflow-hidden">
        <div className="mb-4 flex items-center gap-2">
          <button
            type="button"
            className="flex items-center  gap-1 justify-center   text-sm h-fit w-fit bg-blue-500 rounded-sm py-[6px] px-2  text-white"
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
            <span className="block font-bold text-[12px]">Add </span>
          </button>

          {user.role !== "moderator" && (
            <label
              htmlFor="file"
              className="flex items-center  gap-1 justify-center cursor-pointer   text-sm h-fit w-fit bg-blue-500 rounded-sm py-[6px] px-2 overflow-hidden  text-white"
            >
              <span className="overflow-hidden">
                {loading ? (
                  <ScaleLoader color="#36d711" height={"15px"} />
                ) : (
                  "Import"
                )}
              </span>
              <input
                type="file"
                id="file"
                className="hidden"
                name="file"
                onChange={handleFileUpload}
                accept=".json,.csv"
              />
            </label>
          )}
        </div>

        <div className="border border-general px-2 sm:px-6 pt-2 pb-6 rounded-md">
          <div className=" ">
            <DonarTable />
          </div>
        </div>
      </div>
      {/* modal  */}
      {formOpen && (
        <Modal toggleModal={() => setFormOpen(!formOpen)} title="Add New Donar">
          <DonarForm toggleModal={() => setFormOpen(!formOpen)} />
        </Modal>
      )}
    </>
  );
}
