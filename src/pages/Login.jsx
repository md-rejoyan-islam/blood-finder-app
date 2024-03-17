import { toast } from "react-toastify";
import login from "../assets/login.png";
import useFormFields from "../hooks/useFormFields";
import { useDispatch } from "react-redux";
import { userLogin } from "../features/auth/authApiSlice";
import { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Helmet } from "react-helmet-async";
export default function Login() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // fields
  const { fields, handleChange, clearFields } = useFormFields({
    email: "",
    password: "",
  });

  // show hide password state
  const [showPassword, setShowPassword] = useState(false);

  // handle form submit
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const { email, password } = fields;

    if (!email || !password) return toast.error("Please fill all the fields");
    dispatch(userLogin({ data: fields, clearFields, setLoading }));
  };

  // handle keydown
  const handleKeyDown = (e) => {
    const form = e.target.form;
    const index = Array.prototype.indexOf.call(form, e.target);
    // when press enter go to next input
    if (e.key === "Enter" && e.target.type !== "submit") {
      e.preventDefault();
      form.elements[index + 1].focus();
    }
    // when backspace press go to previous input
    if (e.key === "Backspace" && e.target.value === "") {
      e.preventDefault();
      form.elements[index - 1].focus();
    }
  };
  return (
    <>
      <Helmet>
        <meta property="og:title" content="Login-KIN-Blood" />
        <meta
          property="og:description"
          content="Login to KIN Blood Application"
        />
        <title>Login | KIN</title>
      </Helmet>
      <div
        className="bg-[#0f172a00] box-border  w-full min-h-[calc(100vh-20px)] text-white flex items-center justify-center after:content-[' '] after:fixed after:top-0 after:h-full  after:bg-cover after:bg-no-repeat  after:opacity-[.05] after:w-full "
        id="loginPage"
      >
        <div className="  container xl:w-[1230px] py-10 mx-auto xl:px-0 sm:px-10 px-6  z-10">
          <div className="flex justify-center lg:justify-between flex-col-reverse lg:flex-row   gap-4 lg:gap-8 flex-wrap lg:flex-nowrap  h-full">
            <figure className="hidden lg:block">
              <img src={login} className="mx-auto" alt="kin blood donation" />
            </figure>
            <div className="sm:flex items-center">
              <form
                className="sm:max-w-[500px] mx-auto  min-w-max sm:min-w-[500px] "
                onSubmit={handleSubmit}
                onKeyDown={handleKeyDown}
              >
                <h1 className="text-2xl font-bold text-[#38bdf8] text-center mb-10">
                  Login
                </h1>
                <div className="my-5 text-sm">
                  <input
                    type="text"
                    name="email"
                    value={fields.email}
                    onChange={handleChange}
                    className="bg-[#1e293b48] placeholder:text-gray-600  px-3 py-3 rounded-md border w-full focus:ring-4 focus:ring-sky-900 border-general  border-gray-700 focus:outline-none"
                    autoComplete="true"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="my-5 relative text-sm">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="true"
                    className=" border-gray-700 bg-[#1e293b48] placeholder:text-gray-600 px-3 py-3 rounded-md border w-full focus:ring-4 focus:ring-sky-900 border-general  focus:outline-none"
                    value={fields.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  <button
                    className=" absolute top-0 bottom-0 right-4"
                    onClick={(event) => {
                      event.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
                <div className="my-5 flex gap-4 items-center">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-violet-500 w-full px-3 py-2   rounded-md border border-general focus:ring-4 focus:ring-blue-800 focus:outline-0"
                  >
                    Login
                  </button>
                  {loading && <ScaleLoader color="#36d7b7" />}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
