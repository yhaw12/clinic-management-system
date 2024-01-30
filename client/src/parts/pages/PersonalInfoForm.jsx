import { useState } from 'react';

function PersonalInfoForm() {
  const [values, setValues] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    email: '',
    phone: '',
    dob: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setValues({ ...values, [name]: checked });
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission...
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 mx-auto max-w-lg">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
          First Name
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-500 ease-in-out" id="firstName" type="text" placeholder="First Name" name="firstName" onChange={handleChange} />
      </div>
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
    Gender
  </label>
  <select
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="gender"
    name="gender"
    onChange={handleChange}
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
    Email Address
  </label>
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="email"
    type="email"
    placeholder="Enter your email"
    name="email"
    onChange={handleChange}
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
    Phone Number
  </label>
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="phone"
    type="tel"
    placeholder="Enter your phone number"
    name="phone"
    onChange={handleChange}
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
    Date of Birth
  </label>
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="dob"
    type="date"
    name="dob"
    onChange={handleChange}
  />
</div>

<div className="flex items-center justify-between mt-6">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-500 ease-in-out" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default PersonalInfoForm;

