import { toast } from "react-toastify";
import useFormFields from "../../hooks/useFormFields";
import { bdPhoneNumber, isEmail } from "../../helpers/helpers";
import { useDispatch } from "react-redux";
import {
  addNewDonar,
  updateDonarById,
} from "../../features/donars/donarApiSlice";
import { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import PropTypes from "prop-types";
import { getAuthData } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

export default function DonarForm({ data, toggleModal }) {
  const [loading, setLoading] = useState(false);

  // dispatch
  const dispatch = useDispatch();

  // user
  const { user } = useSelector(getAuthData);

  // fields
  const { fields, clearFields, handleChange } = useFormFields(
    data
      ? { ...data }
      : {
          name: "",
          phone: "",
          bloodGroup: "",
          email: "",
          homeDistrict: "",
          session: "",
          department: "",
          totalDonation: "",
          lastDonationDate: "",
          age: "",
          comment: "",
        }
  );

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // fields
    const { age, totalDonation, email, phone, name } = fields;

    // age will be number
    if (age && isNaN(age)) return toast.error("Age  must be number");

    // total donation will be number
    if (totalDonation && isNaN(totalDonation))
      return toast.error("Total Donation must be number");

    // name required
    if (!name) return toast.error("Name is required");

    // phone required
    if (!phone) return toast.error("Phone Number is required");

    // blood group required
    if (!fields.bloodGroup) return toast.error("Blood Group is required");

    // email validation
    if (email && !isEmail(email)) return toast.error("Invalid Email");

    // bd phone number validation
    if (!bdPhoneNumber(phone)) return toast.error("Invalid Phone Number");

    setLoading(true);
    // add or update donar
    if (data) {
      // if change last donation date and greater than 120 day then update total donation
      if (
        fields.lastDonationDate &&
        new Date(fields.lastDonationDate) -
          new Date(data.lastDonationDate).getTime() >
          120 * 24 * 60 * 60 * 1000
      ) {
        console.log(data.lastDonationDate);
        fields.totalDonation = fields.totalDonation
          ? parseInt(fields.totalDonation) + 1
          : 1;
      }

      // update donar data
      dispatch(
        updateDonarById({ id: data.id, data: fields, setLoading, toggleModal })
      );
    } else {
      // add new donar
      dispatch(addNewDonar({ fields, setLoading, clearFields, toggleModal }));
    }
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
    <form
      className="text-white m-6 sm:max-w-[500px] mx-auto bg-[#0c1222]   px-1 pb-6 pt-0 min-w-[80vw] sm:min-w-[350px] rounded-md border-general"
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      {/* donar name  */}
      <div className="my-3">
        <label className="pb-[2px] block" htmlFor="name">
          Donar Name <span className="text-red-500 font-bold -ml-[2px]">*</span>
        </label>
        <input
          type="text"
          placeholder="Mr. Boss"
          name="name"
          id="name"
          value={fields?.name || ""}
          onChange={handleChange}
          autoFocus
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70]"
        />
      </div>
      {/* donar phone  */}
      <div className="my-3">
        <label className="pb-[2px] block" htmlFor="phone">
          Phone Number
          <span className="text-red-500 font-bold ">*</span>
        </label>
        <input
          type="text"
          id="phone"
          placeholder="+8801xxxxxxxx"
          name="phone"
          value={fields?.phone || ""}
          onChange={handleChange}
          className=" input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70]"
          disabled={data && user?.role === "moderator"}
        />
      </div>
      {/* blood group  */}
      <div className="my-3">
        <label className="pb-[2px] block" htmlFor="group">
          Blood Group
          <span className="text-red-500 font-bold ">*</span>
        </label>
        <select
          name="bloodGroup"
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#141c2d] "
          id="group"
          onChange={handleChange}
          defaultValue={fields?.bloodGroup}
          disabled={data && user?.role === "moderator"}
        >
          <option>--select--</option>
          <option defaultValue="A+">A+</option>
          <option defaultValue={"A-"}>A-</option>
          <option defaultValue={"B+"}>B+</option>
          <option defaultValue={"B-"}>B-</option>
          <option defaultValue={"O+"}>O+</option>
          <option defaultValue={"O-"}>O-</option>
          <option defaultValue={"AB+"}>AB+</option>
          <option defaultValue={"AB-"}>AB-</option>
        </select>
      </div>
      {/* donar email  */}
      <div className="my-3">
        <label className="pb-[2px] block" htmlFor="email">
          Donar Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="boss@gmail.com"
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70]"
          value={fields?.email || ""}
          onChange={handleChange}
        />
      </div>
      {/* donar home district  */}
      <div className="my-3">
        <label className="pb-[2px] block" htmlFor="district">
          Donar Home District
        </label>
        <input
          type="text"
          placeholder="Dhaka"
          id="district"
          name="homeDistrict"
          value={fields?.homeDistrict || ""}
          onChange={handleChange}
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70]"
        />
      </div>
      {/* donar session  */}
      <div className="my-3">
        <label className="pb-[2px] block" htmlFor="session">
          Session
        </label>
        <input
          type="text"
          placeholder="2019-2020"
          id="session"
          name="session"
          value={fields?.session || ""}
          onChange={handleChange}
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70]"
        />
      </div>
      {/* donar department  */}
      <div className="my-3">
        <label className="pb-[2px] block" htmlFor="department">
          Department
        </label>
        <input
          type="text"
          placeholder="EEE"
          id="department"
          value={fields?.department || ""}
          onChange={handleChange}
          name="department"
          className=" input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70]"
        />
      </div>
      {/* donar total donate */}
      <div className="my-3">
        <label className="pb-[2px] block" htmlFor="total_donate">
          Total Donate
        </label>
        <input
          type="text"
          name="totalDonation"
          id="total_donate"
          value={fields?.totalDonation || ""}
          onChange={handleChange}
          placeholder="4"
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70]"
        />
      </div>
      {/* last doante date */}
      <div className="my-3">
        <label className="pb-[2px] block" htmlFor="last_donate">
          Last Donate Date
        </label>
        <input
          type="date"
          name="lastDonationDate"
          id="last_donate"
          value={fields?.lastDonationDate || ""}
          onChange={handleChange}
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70]"
          max={new Date().toISOString().split("T")[0]}
          disabled={data && user?.role === "moderator"}
          // min={fields?.lastDonationDate ? fields?.lastDonationDate : ""}
        />
      </div>
      {/* donar age */}
      <div className="my-3">
        <label className="pb-[2px] block" htmlFor="age">
          Donar Age
        </label>
        <input
          type="text"
          placeholder="22"
          id="age"
          value={fields?.age || ""}
          onChange={handleChange}
          name="age"
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70]"
        />
      </div>
      {/* comment*/}
      <div className="my-3">
        <label className="pb-[2px] block" htmlFor="comment">
          Comment
        </label>
        <textarea
          name="comment"
          id="comment"
          placeholder="Text comment for Donar"
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70]"
          value={fields?.comment || ""}
          onChange={handleChange}
          cols="10"
          rows="2"
        ></textarea>
      </div>
      {/* submit  */}
      <div className="my-3 flex gap-5 items-center">
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

DonarForm.propTypes = {
  data: PropTypes.object,
  toggleModal: PropTypes.func,
};
