"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { useTranslation } from "@/hooks/useTranslation";

export default function Newsletter() {
  const {t} = useTranslation()
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <section className="py-12 px-6 rounded-2xl shadow-sm mt-12">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {t('about.updated')}
        </h2>
        <p className="text-gray-600 mb-6">
         {t('about.subscribe')}
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center sm:flex-row gap-3 justify-center"
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('about.email')}
            required
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl  text-white font-semibold bg-gradient-to-l from-secondary to-primary transition"
          >
            {t('about.btn')}
          </button>
        </form>
      </div>
    </section>
  );
}
