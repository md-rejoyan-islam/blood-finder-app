export default function Modal({ toggleModal, title, children }) {
  // handle form close
  const handleFormClose = () => {
    toggleModal();
  };

  return (
    <div className="justify-center bg-[#0b2c1dcc] items-center flex overflow-x-hidden overflow-y-auto fixed  inset-0  z-50 outline-none focus:outline-none">
      <div
        className={`absolute top-0  ${
          (title === "Update User Data" ||
            title === "Update User Password" ||
            title === "Add New User") &&
          "bottom-0"
        }  flex left-0 right-0 items-center   py-10  w-auto  mx-auto max-w-3xl `}
      >
        <div className="mx-auto">
          <div className="sm:max-w-[500px] sm:min-w-[500px] bg-[#0c1222] rounded-md p-2 ">
            {/* cancle button */}
            <div className=" flex justify-end">
              <button
                className="text-white hover:bg-red-400 bg-slate-700 px-3 py-1 flex items-center justify-center text-sm rounded-md"
                onClick={handleFormClose}
              >
                X
              </button>
            </div>
            <div className="">
              <h1 className=" text-2xl text-[#38bdf8] font-bold text-center mb-2">
                {title}
              </h1>
            </div>
            <div className="px-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
