import { useFormik } from "formik";
import emailjs from "emailjs-com";
import { useState } from "react";
import Alert from "@mui/material/Alert";

const AppointmentForm = () => {
  const [submissionSuccessful, setSubmissionSuccessful] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      date: "",
      contactNumber: "",
    },

    onSubmit: (values) => {
      const currentDate = new Date().toISOString().split("T")[0];
      emailjs
        .send(
          "service_3mt8z5o",
          "template_fhfk3a6",
          {
            to_name: "Elite Blueprint Team",
            from_name: values.name,
            message: `Name: ${values.name}\nEmail: ${values.email}\nDate: ${currentDate}\nContact: ${values.contactNumber}`,
          },
          "6MjS_6rHsk0rSdAL-"
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
            setSubmissionSuccessful(true);
          },
          (err) => {
            console.log("FAILED...", err);
          },

          setTimeout(() => {
            setSubmissionSuccessful(false);
          }, 3000)
        );
    },
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-[86vh] bg-custom-blue">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center text-white">
        Book an Appointment
      </h1>
      <form onSubmit={formik.handleSubmit} className="w-full max-w-md mt-10">
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          required="required"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Your Name"
        />
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}
        <input
          id="email"
          name="email"
          type="email"
          required="required"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
          placeholder="Your Email"
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        <input
          id="contactNumber"
          name="contactNumber"
          type="tel"
          required="required"
          onChange={formik.handleChange}
          value={formik.values.contactNumber}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
          placeholder="Your Contact Number"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Submit
        </button>
      </form>
      <div className="p-2">
        {submissionSuccessful ? (
          <Alert severity="success" className="w-full max-w-md mt-10">
            Your appointment has been successfully submitted!
          </Alert>
        ) : null}
      </div>
    </div>
  );
};

export default AppointmentForm;
