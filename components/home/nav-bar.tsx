"use client";
import {useState, useEffect} from "react";
import Link from "next/link";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const whatsappNumber = "5511945427947";
    const whatsappMessage = encodeURIComponent(
        "Olá! Vim pelo site da Boreal e gostaria de solicitar um orçamento."
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        {label: "Início", href: "#"},
        {label: "Projetos", href: "#projetos"},
        {label: "Sobre", href: "#sobre"},
        {label: "Contato", href: "#contato"},
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-black/80 backdrop-blur-md border-b border-white/10"
                    : "bg-transparent"
            }`}
            aria-label="Navegação principal Boreal Móveis"
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <a href="#" className="flex flex-col leading-none">
                    <span className="text-white text-base font-medium tracking-wide">Boreal</span>
                    <span className="text-white/40 text-[10px] uppercase tracking-[0.3em]">Móveis em Vidro</span>
                </a>

                {/* Links — desktop */}
                <nav aria-label="Menu principal" className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-white/50 text-sm hover:text-white transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CTA + menu mobile */}
                <div className="flex items-center gap-3">

                    <a href={whatsappUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="Solicitar orçamento pelo WhatsApp"
                       className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-white/20
                    text-white text-xs font-light tracking-wide hover:bg-white hover:text-black transition-all
                    duration-300"
                    >
                        <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
                            <path
                                d="M9 1C4.58 1 1 4.58 1 9C1 10.77 1.58 12.41 2.55 13.74L1 18L5.44 16.5C6.73 17.44 8.3 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2"
                                stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        WhatsApp
                    </a>

                    {/* Botão menu mobile */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Abrir menu"
                        className="md:hidden flex flex-col gap-1.5 p-2"
                    >
                    <span
                        className={`block h-px w-5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}/>
                        <span
                            className={`block h-px w-5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}/>
                        <span
                            className={`block h-px w-5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}/>
                    </button>
                </div>

            </div>

            {/* Menu mobile */
            }
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${
                    menuOpen ? "max-h-64 border-t border-white/10" : "max-h-0"
                } bg-black/90 backdrop-blur-md`}
            >
                <nav className="flex flex-col px-6 py-4 gap-4">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="text-white/50 text-sm hover:text-white transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    ))}

                    <a href={whatsappUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors
                    duration-200"
                    >
                        <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
                            <path
                                d="M9 1C4.58 1 1 4.58 1 9C1 10.77 1.58 12.41 2.55 13.74L1 18L5.44 16.5C6.73 17.44 8.3 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2"
                                stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        WhatsApp
                    </a>
                </nav>
            </div>
        </header>
    )
        ;
}