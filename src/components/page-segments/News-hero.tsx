import React from "react";
import Image, { StaticImageData } from "next/image";


const NewsHero = ({ title, desc, image }: { title: string; desc: string, image:StaticImageData }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 py-24">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full">
          <Image
            src={image}
            fill
            alt="Climate action in Cameroon"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/30 " />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold mb-8 tracking-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl  max-w-4xl mx-auto leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsHero;
