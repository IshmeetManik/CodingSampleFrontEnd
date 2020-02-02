import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    console.log("Use Effectt----", errors);
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);
  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = event => {
    console.log("Inside hanlde Chnage", event.target.value);
    if (event.target.type === "checkbox") {
      event.persist();
      const remember = "remember";
      if (values[remember]) {
        values[remember] = "false";
      } else {
        values[remember] = "true";
      }
    } else {
      event.persist();
      setValues(values => ({
        ...values,
        [event.target.name]: event.target.value
      }));
    }
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};

export default useForm;
