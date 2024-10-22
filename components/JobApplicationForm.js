// components/JobApplicationForm.js

import { useState } from 'react';

export default function JobApplicationForm() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    job: '',
    resume: null,
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormState({
      ...formState,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    Object.keys(formState).forEach((key) => formData.append(key, formState[key]));

    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Email sent successfully');
    } else {
      console.error('Error sending email');
    }
  };

  return (
    <form action="https://formspree.io/f/mzzbpapl" method="POST" encType="multipart/form-data" className='flex flex-col gap-2'>
      <input name="firstName" placeholder="First name" onChange={handleChange} className='border border-black rounded p-2' required />
      <input name="lastName" placeholder="Last name" onChange={handleChange} className='border border-black rounded p-2' required />
      <input name="phoneNumber" placeholder="Phone number" onChange={handleChange} className='border border-black rounded p-2' required />
      <input name="email" placeholder="Email" onChange={handleChange} className='border border-black rounded p-2' required />
      <select name="job" onChange={handleChange} className='border border-black rounded p-2' required>
        <option value={``}>Select job</option>
        <option value={`Maintenance Mechanic I - Egg Products`}>Maintenance Mechanic I - Egg Products</option>
      </select>
      <label className='uppercase text-gray-600'>Upload your resume</label>
      <input type="file" name="resume" onChange={handleFileChange} className='pb-8' accept="application/pdf" required />
      <div className='text-center'>
        <button type="submit" className='bg-chinored text-white uppercase font-bold py-2 rounded-lg text-4xl w-48'>Submit</button>
      </div>
    </form>
  );
}
