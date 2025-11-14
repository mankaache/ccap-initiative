// import React, { useState } from "react";
// import emailjs from "emailjs-com";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [status, setStatus] = useState("");

//   const handleChange = (e:any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e:any) => {
//     e.preventDefault();

//     // Replace these with your EmailJS credentials
//     const serviceID = "service_xvf1goi";
//     const templateID = "template_n9ka3hc";
//     const userID = "JsFmBX8wJK_EOCOcg";

//     emailjs
//       .send(serviceID, templateID, formData, userID)
//       .then(
//         (response:any) => {
//           console.log("SUCCESS!", response.status, response.text);
//           setStatus("Message sent successfully!");
//           setFormData({ name: "", email: "", message: "" });
//         },
//         (err:any) => {
//           console.error("FAILED...", err);
//           setStatus("Failed to send message. Try again later.");
//         }
//       );
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

//         <label className="block mb-2 font-medium">Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <label className="block mb-2 font-medium">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <label className="block mb-2 font-medium">Message</label>
//         <textarea
//           name="message"
//           value={formData.message}
//           onChange={handleChange}
//           required
//           rows={5}
//           className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         ></textarea>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
//         >
//           Send Message
//         </button>

//         {status && <p className="mt-4 text-center text-green-500">{status}</p>}
//       </form>
//     </div>
//   );
// };

// export default ContactUs;

import React from 'react'

const Contact = () => {
  return (
    <div>Contact</div>
  )
}

export default Contact