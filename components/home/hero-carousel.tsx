'use client'
import {useState, useEffect} from "react";
import Image from "next/image";

const images = [
    {
        src: "/images/hero/hero1.png",
        alt: "Cozinha planejada em vidro e alumínio sob medida em Arujá SP",
    },
    {
        src: "/images/hero/hero2.png",
        alt: "Divisória de vidro temperado para residências em Guarulhos e Mogi das Cruzes",
    },
    {
        src: "/images/hero/hero3.png",
        alt: "Móveis em vidro e alumínio com acabamento premium para sua casa",
    },
];

const whatsappNumber = "5511945427947";
const whatsappMessage = encodeURIComponent(
    "Olá! Vim pelo site da Boreal e gostaria de solicitar um orçamento."
);
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

export default function HeroCarousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            className="relative h-[90vh] w-full overflow-hidden"
            aria-label="Boreal Móveis em Vidro e Alumínio — Arujá e região"
        >
            {/* Slides */}
            {images.map((img, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        i === index ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        priority={i === 0}
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
            ))}

            {/* Overlay escuro gradiente */}
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60"/>

            {/* Conteúdo */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">

                <h1 className="text-5xl md:text-7xl font-light text-white leading-tight tracking-tight drop-shadow-lg">
                    Boreal Móveis
                </h1>

                <p className="mt-4 text-lg md:text-xl text-white/70 font-light max-w-xl leading-relaxed">
                    <strong className="text-white font-normal">Cozinhas planejadas</strong> e{" "}
                    <strong className="text-white font-normal">divisórias em vidro e alumínio</strong>{" "}
                    sob medida para sua casa
                </p>

                <div className="w-10 h-px bg-white/30 my-8"/>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-3">

                    <a href={whatsappUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="Solicitar orçamento de móveis em vidro pelo WhatsApp"
                       className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-black text-sm font-medium tracking-wide hover:bg-white/90 transition-all duration-300"
                    >
                        <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                            <path
                                d="M9 1C4.58 1 1 4.58 1 9C1 10.77 1.58 12.41 2.55 13.74L1 18L5.44 16.5C6.73 17.44 8.3 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2"
                                stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Solicitar orçamento
                    </a>

                    <a href="#sobre"
                    className="inline-block px-8 py-3.5 rounded-2xl border border-white/30 text-white text-sm font-light
                    tracking-wide hover:bg-white/10 transition-all duration-300"
                    >
                    Conheça a Boreal
                </a>
            </div>

            {/* Indicadores */}
            <div className="absolute bottom-8 flex gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        aria-label={`Slide ${i + 1}`}
                        className={`h-px transition-all duration-500 ${
                            i === index
                                ? "w-8 bg-white"
                                : "w-4 bg-white/30"
                        }`}
                    />
                ))}
            </div>
        </div>
</section>
)
    ;
}