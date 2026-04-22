'use client'
import {useState, useEffect} from "react";
import Image from "next/image";

const images = [
    "/images/hero/hero1.png",
    "/images/hero/hero2.png",
    "/images/hero/hero3.png"
]
export default function HeroCarousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000);
    }, []);

    return (
        <section className="relative h-[80vh] w-full overflow-hidden">
            {images.map((img, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        i === index ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <Image
                        src={img}
                        alt={`Slide ${i}`}
                        fill
                        priority={i === 0}
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
            ))}

            <div className="absolute inset-0 flex items-center justify-center px-4">

                <div className="bg-black/15 backdrop-blur-sm px-8 py-6 rounded-2xl text-center max-w-3xl">

                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-lg">
                        Boreal Móveis
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-gray-200 font-light leading-relaxed">
                        Móveis em vidro e alumínio
                        <span className="block font-medium text-white">
          sob medida para seu ambiente
        </span>
                    </p>

                    <button
                        className="mt-8 px-8 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition">
                        Solicitar orçamento
                    </button>

                </div>

            </div>
        </section>
    );
}
