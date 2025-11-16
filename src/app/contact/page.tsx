'use client'


import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useTranslation } from "@/hooks/useTranslation";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation()

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      // Add document to Firestore
      await addDoc(collection(db, "contactMessages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp(),
      });
      toast.success(t('auth.successMessage'))

      setStatus('auth.successMessage');
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus(t("auth.errorMessage"));
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">{t('footer.contact')}</h2>

        <label className="block mb-2 font-medium">{t('auth.full_name')}</label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium">{t("auth.email")}</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium">{t('auth.message')}</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white p-3 rounded  transition"
        >
          {loading ? t('auth.Sending') : t('auth.message2')}
        </button>

        {status && <p className="mt-4 text-center text-green-500">{status}</p>}
      </form>
    </div>
  );
};

export default ContactUs;
