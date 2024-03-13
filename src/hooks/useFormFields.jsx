import { useState } from "react";

export default function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  // handle change
  function handleChange(event) {
    setValues({
      ...fields,
      [event.target.name]: event.target.value,
    });
  }

  // handle clear
  function clearFields() {
    setValues(initialState);
  }

  return { fields, handleChange, clearFields };
}
