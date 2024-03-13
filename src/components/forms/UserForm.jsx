import { toast } from "react-toastify";
import useFormFields from "../../hooks/useFormFields";
import { useDispatch } from "react-redux";
import {
  addNewUser,
  updateUserById,
  updateUserPassword,
} from "../../features/users/usersApiSlice";

import { isEmail } from "../../helpers/helpers";
import { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import PropTypes from "prop-types";

export default function UserForm({ data, toggleModal, title, type }) {
  // dispatch
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // show hide password state
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // fields
  const { fields, handleChange, clearFields } = useFormFields(
    { ...data, password: "", confirmPassword: "" } || {
      name: "",
      email: "",
      password: "",
      role: "",
      confirmPassword: "",
    }
  );

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword, role } = fields;

    if (type === "add") {
      if (!name || !email || !password || !role)
        return toast.error("Please fill all the fields");
      if (password.length < 6)
        return toast.error("Password must be at least 6 characters");
    }

    // email validation
    if (!isEmail(email)) return toast.error("Invalid Email");

    // password length
    if (type === "p-update") {
      if (password.length < 6)
        return toast.error("Password must be at least 6 characters");
    }
    setLoading(true);
    // update or add or change password
    if (data && type === "update") {
      // update user
      dispatch(
        updateUserById({
          id: data.id,
          data: { name: fields.name, role: fields.role },
          toggleModal,
        })
      );
    } else if (type === "p-update") {
      if (password !== confirmPassword) {
        setLoading(false);
        return toast.error("Password and Confirm Password must be same");
      }

      // update user password
      dispatch(
        updateUserPassword({ id: data.id, password, toggleModal, setLoading })
      );
    } else {
      // add new user
      dispatch(
        addNewUser({ data: fields, toggleModal, clearFields, setLoading })
      );
    }
  };

  // handle key down
  const hanleKeyDown = (event) => {
    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);

    // if press enter go to next input
    if (event.key === "Enter" && event.target.type !== "submit") {
      form.elements[index + 1].focus();
    }
    // if press backspace go to previous input
    if (event.key === "Backspace" && event.target.value === "") {
      form.elements[index - 1].focus();
    }
  };

  return (
    <form
      className="text-white m-6 sm:max-w-[500px] mx-auto bg-[#0c1222]   px-1 pb-6 pt-0 min-w-[80vw] sm:min-w-[350px] rounded-md border-general"
      onSubmit={handleSubmit}
      onKeyDown={hanleKeyDown}
    >
      {/* user name  */}

      <div className={`${title === "Update User Password" && "hidden"} my-3`}>
        <label className="pb-[2px] block" htmlFor="name">
          User Name <span className="text-red-500 font-bold -ml-[2px]">*</span>
        </label>
        <input
          type="text"
          id="name"
          placeholder="Mr. Boss"
          name="name"
          value={fields.name}
          onChange={handleChange}
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70]"
        />
      </div>

      {/* user email  */}

      <div className={`${type === "p-update" && "hidden"} my-3`}>
        <label className="pb-[2px] block" htmlFor="email">
          User Email
        </label>
        <input
          type="text"
          disabled={type === "update"}
          name="email"
          id="email"
          value={fields.email}
          onChange={handleChange}
          placeholder="boss@gmail.com"
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70] disabled:text-gray-500"
        />
      </div>
      {/* user password  */}
      <div className={`${type === "update" && "hidden"} my-3`}>
        <label className="pb-[2px] block" htmlFor="passwword">
          User Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={fields?.password}
            onChange={handleChange}
            placeholder="123@#-aWq1"
            className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70]"
          />
          <span
            className=" absolute top-0 bottom-0 right-4 cursor-pointer my-auto flex items-center"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <svg
                className="w-4 h-4 "
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
                className="w-4 h-4 "
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
          </span>
        </div>
      </div>
      {/* confirm password user password  */}
      <div
        className={`${(type === "update" || type === "add") && "hidden"} my-3`}
      >
        <label className="pb-[2px] block" htmlFor="confirm">
          User Confirm Password
        </label>
        <div className="relative">
          <input
            type={showPassword2 ? "text" : "password"}
            name="confirmPassword"
            id="confirm"
            value={fields?.confirmPassword}
            onChange={handleChange}
            placeholder="123@#-aWq1"
            className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70]"
          />
          <span
            className="absolute top-0 bottom-0 right-4 cursor-pointer my-auto flex items-center"
            onClick={(event) => {
              event.preventDefault();
              setShowPassword2(!showPassword2);
            }}
          >
            {showPassword2 ? (
              <svg
                className="w-4 h-4 "
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
                className="w-4 h-4 "
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
          </span>
        </div>
      </div>
      {/* user role  */}
      <div className={`${type === "p-update" && "hidden"} my-3`}>
        <label className="pb-[2px] block" htmlFor="role">
          User Role
        </label>
        <select
          onChange={handleChange}
          defaultValue={fields.role}
          className="w-full py-[10px]  border-general rounded-md  px-6 border-none  bg-[#141c2d] input text-center"
          id="role"
          name="role"
        >
          <option defaultValue={""}>Select</option>
          <option defaultValue={"moderator"}>Moderator</option>
          <option defaultValue={"admin"}>Admin</option>
        </select>
      </div>

      {/* submit  */}
      <div className="mt-6 mb-3 flex gap-4">
        <button
          type="submit"
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-violet-500 hover:bg-violet-600"
        >
          Submit
        </button>
        {loading && <ScaleLoader color="#36d7b7" />}
      </div>
    </form>
  );
}

UserForm.propTypes = {
  data: PropTypes.object,
  toggleModal: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string,
};
