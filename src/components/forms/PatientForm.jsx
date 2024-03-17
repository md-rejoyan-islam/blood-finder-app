import { toast } from "react-toastify";
import useFormFields from "../../hooks/useFormFields";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import PropTypes from "prop-types";
import {
  addNewPatient,
  updatePatientById,
} from "../../features/patient/patientApiSlice";

export default function PatientForm({ data, toggleModal, title, type }) {
  // dispatch
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // fields
  const { fields, handleChange, clearFields } = useFormFields(
    { ...data } || {
      phone: "",
      bloodGroup: "",
      location: "",
      amount: 1,
      comment: "",
      date: new Date().toLocaleDateString().split("/").reverse().join("-"),
    }
  );

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const { phone, location, amount, bloodGroup, date } = fields;

    if (type === "add") {
      if (!phone) return toast.error("Phone is required");
      if (!bloodGroup) return toast.error("Blood Group is required");
      if (!amount) {
        fields.amount = 1;
      }
      if (!date) {
        fields.date = new Date()
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("-");
      }
      if (!location) return toast.error("Location is required");
    }
    // password length
    if (type === "p-update") {
      ("");
    }
    setLoading(true);
    // update or add or change password
    if (data && type === "update") {
      // update user

      dispatch(
        updatePatientById({
          id: data.id,
          data: fields,
          toggleModal,
          setLoading,
        })
      );
    } else {
      // add new patient
      dispatch(addNewPatient({ fields, toggleModal, clearFields, setLoading }));
    }
  };

  // handle key down
  const hanleKeyDown = (e) => {
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
      onKeyDown={hanleKeyDown}
    >
      {/* patient Phone  */}
      <div className={` my-3`}>
        <label className="pb-[2px] block" htmlFor="phone">
          Patient Phone{" "}
          <span className="text-red-500 font-bold -ml-[2px]">*</span>
        </label>
        <input
          type="text"
          disabled={type === "update"}
          name="phone"
          id="phone"
          value={fields?.phone}
          onChange={handleChange}
          placeholder="01738XXXXXX"
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70] disabled:text-gray-500"
        />
      </div>
      {/* patient group  */}
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

      {/* pateint need blood bag  */}
      <div className={`${title === "Update User Password" && "hidden"} my-3`}>
        <label className="pb-[2px] block" htmlFor="amount">
          Amount of bag{" "}
        </label>
        <input
          type="number"
          id="amount"
          placeholder="2"
          name="amount"
          value={fields?.amount || 1}
          onChange={handleChange}
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70]"
        />
      </div>

      {/* date  */}
      <div className={`${title === "Update User Password" && "hidden"} my-3`}>
        <label className="pb-[2px] block" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={
            fields?.date ||
            new Date().toLocaleDateString().split("/").reverse().join("-")
          }
          onChange={handleChange}
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70]"
        />
      </div>

      {/* patient location  */}
      <div className="my-3">
        <label className="pb-[2px] block" htmlFor="location">
          Location <span className="text-red-500 font-bold -ml-[2px]">*</span>
        </label>
        <input
          type="text"
          name="location"
          id="location"
          value={fields?.location}
          onChange={handleChange}
          placeholder="Ragib Rabeya Medical"
          className="input w-full py-[10px] px-3 border-general rounded-md border bg-[#1e293b70] disabled:text-gray-500"
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

PatientForm.propTypes = {
  data: PropTypes.object,
  toggleModal: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string,
};
