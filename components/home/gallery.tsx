"use client";
import Image from "next/image";
import {useState, useEffect} from "react";

const images = [
    {src: "/images/projetos/img08.jpg", alt: "Móveis de vidro para cozinha com acabamento premium"},
    {src: "/images/projetos/img01.jpg", alt: "Armário em vidro e alumínio para sala de estar"},
    {src: "/images/projetos/img09.jpg", alt: "Porta de vidro temperado com perfil em alumínio"},
    {src: "/images/projetos/img10.jpg", alt: "Divisória em vidro para ambientes internos"},
    {src: "/images/projetos/img04.jpg", alt: "Guarda-roupa em vidro espelhado com moldura em alumínio"},
    {src: "/images/projetos/img05.jpg", alt: "Móvel em vidro para banheiro com design moderno"},
    {src: "/images/projetos/img03.jpg", alt: "Box de vidro temperado para banheiro"},
    {src: "/images/projetos/img15.jpg", alt: "Fechamento de varanda em vidro com perfil slim"},
    {src: "/images/projetos/img02.jpg", alt: "Escada com corrimão e guarda-corpo em vidro"},
    {src: "/images/projetos/img13.jpg", alt: "Mesa em vidro temperado com base em alumínio"},
    {src: "/images/projetos/img07.jpg", alt: "Fachada em vidro e alumínio para escritório"},
    {src: "/images/projetos/img16.jpeg", alt: "Porta de correr em vidro para área gourmet"},
    {src: "/images/projetos/img17.jpeg", alt: "Prateleira em vidro temperado com suporte em alumínio"},
    {src: "/images/projetos/img14.jpg", alt: "Closet com portas em vidro e perfil em alumínio"},
    {src: "/images/projetos/img00.jpg", alt: "Móveis planejados em vidro para cozinha moderna"},
];

export function Gallery() {
    const [selected, setSelected] = useState<number | null>(null);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelected(null);
            if (e.key === "ArrowRight" && selected !== null)
                setSelected((selected + 1) % images.length);
            if (e.key === "ArrowLeft" && selected !== null)
                setSelected((selected - 1 + images.length) % images.length);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selected]);

    useEffect(() => {
        document.body.style.overflow = selected !== null ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [selected]);

    return (
        <>
            <section className="w-full py-20 px-6">
                <div className="max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-6">
                        <div>
                            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-2">Portfólio</p>
                            <h2 className="text-4xl font-light tracking-tight text-white">Projetos</h2>
                        </div>
                        <span className="text-sm text-white/30 font-light">{images.length} trabalhos</span>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {images.map((image, i) => (
                            <button
                                key={i}
                                onClick={() => setSelected(i)}
                                className="group relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                style={{height: "280px"}}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    style={{objectFit: "cover"}}
                                    className="transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-75"
                                />
                                {/* Overlay */}
                                <div
                                    className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"/>

                                {/* Index label */}
                                <div
                                    className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-xs text-white/80 tracking-widest font-light">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                {/* Expand icon */}
                                <div
                                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div
                                        className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M8.5 1.5H12.5V5.5M5.5 12.5H1.5V8.5M12.5 1.5L8 7M1.5 12.5L6 7"
                                                  stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {selected !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={() => setSelected(null)}
                >
                    {/* Close */}
                    <button
                        onClick={() => setSelected(null)}
                        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </button>

                    {/* Prev */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelected((selected - 1 + images.length) % images.length);
                        }}
                        className="absolute left-4 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M9 2L4 7L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </button>

                    {/* Image */}
                    <div
                        className="relative w-full max-w-4xl mx-16"
                        style={{height: "80vh"}}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[selected].src}
                            alt={images[selected].alt}
                            fill
                            sizes="90vw"
                            style={{objectFit: "contain"}}
                            className="rounded-lg"
                        />
                    </div>

                    {/* Next */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelected((selected + 1) % images.length);
                        }}
                        className="absolute right-4 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M5 2L10 7L5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </button>

                    {/* Counter */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest">
                        {String(selected + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                    </div>
                </div>
            )}
        </>
    );
}