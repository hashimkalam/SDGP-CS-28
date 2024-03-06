import { useFormik } from 'formik';
import emailjs from 'emailjs-com';

const AppointmentForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      date: '',
      // Add other form fields here
    },

    
    onSubmit: values => {
      const currentDate = new Date().toISOString().split('T')[0];
      emailjs.send('service_3mt8z5o', 'template_fhfk3a6', {
        to_name: 'Elite Blueprint Team',
        from_name: values.name,
        message: `Name: ${values.name}\nEmail: ${values.email}\nDate: ${currentDate}\nContact: ${values.contactNumber}`,
      }, '6MjS_6rHsk0rSdAL-')
        .then((response) => {
           console.log('SUCCESS!', response.status, response.text);
        }, (err) => {
           console.log('FAILED...', err);
        });
    }
  });

  return (
    <div className="flex flex-col justify-center items-center h-full bg-custom-blue">
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Name"
        />
        <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
            placeholder="Your Email"
        />
        <input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            onChange={formik.handleChange}
            value={formik.values.contactNumber}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
            placeholder="Your Contact Number"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;