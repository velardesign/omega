export function About() {
    return (
        <section
            id="sobre"
            aria-label="Sobre a Boreal Móveis em Vidro e Alumínio em Arujá e região"
            className="py-24 px-6"
        >
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Bloco esquerdo — texto */}
                    <div>
                        <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-4">
                            Sobre a Boreal
                        </p>
                        <h2 className="text-4xl md:text-5xl font-light text-white leading-snug mb-6">
                            Cozinhas e Divisórias
                            <br/>
                            <span className="text-white/60">em Vidro Sob Medida</span>
                        </h2>
                        <div className="w-10 h-px bg-white/20 mb-8"/>

                        <div className="space-y-5">
                            <p className="text-white/70 text-base leading-relaxed">
                                A <strong className="text-white font-medium">Boreal</strong> é especialista em{" "}
                                <strong className="text-white font-medium">cozinhas planejadas em vidro e
                                    alumínio</strong>{" "}
                                e <strong className="text-white font-medium">divisórias de vidro temperado</strong> para
                                residências em Arujá, Mogi das Cruzes, Guarulhos e região.
                            </p>
                            <p className="text-white/70 text-base leading-relaxed">
                                Cada projeto é desenvolvido sob medida, com vidro temperado de alta resistência
                                e perfis de alumínio com acabamento impecável — unindo funcionalidade,
                                segurança e sofisticação para a sua casa.
                            </p>
                            <p className="text-white/70 text-base leading-relaxed">
                                Fabricamos e instalamos{" "}
                                <strong className="text-white font-medium">armários com portas de vidro</strong>,{" "}
                                <strong className="text-white font-medium">gabinetes para banheiro</strong>,{" "}
                                <strong className="text-white font-medium">pias de vidro personalizadas</strong>,{" "}
                                <strong className="text-white font-medium">divisórias para ambientes
                                    internos</strong>{" "}
                                e fachadas em alumínio com vidro.
                            </p>
                        </div>

                        <p className="mt-6 text-xs text-white/30 tracking-widest uppercase">
                            Arujá · Mogi das Cruzes · Guarulhos · Santa Isabel · Itaquaquecetuba
                        </p>

                        <div className="mt-10">

                            <a href="#contato"
                               className="inline-block px-8 py-3.5 rounded-xl border border-white/20 text-white text-sm font-light tracking-wide hover:bg-white hover:text-black transition-all duration-300"
                            >
                                Solicitar orçamento gratuito
                            </a>
                        </div>
                    </div>

                    {/* Bloco direito — diferenciais */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            {
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path
                                            d="M11 2L13.5 8.5H20.5L14.5 12.5L16.5 19L11 15L5.5 19L7.5 12.5L1.5 8.5H8.5L11 2Z"
                                            stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                                    </svg>
                                ),
                                title: "Vidro Temperado",
                                desc: "Segurança e resistência certificadas para uso residencial",
                            },
                            {
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <rect x="3" y="3" width="16" height="16" rx="2" stroke="currentColor"
                                              strokeWidth="1.2"/>
                                        <path d="M7 11L10 14L15 9" stroke="currentColor" strokeWidth="1.2"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                ),
                                title: "100% Sob Medida",
                                desc: "Projetos exclusivos adaptados ao seu espaço",
                            },
                            {
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.2"/>
                                        <path d="M11 7V11L14 13" stroke="currentColor" strokeWidth="1.2"
                                              strokeLinecap="round"/>
                                    </svg>
                                ),
                                title: "Entrega e Instalação",
                                desc: "Fabricação ágil com instalação inclusa na região",
                            },
                            {
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path d="M11 3C7 3 3 7 3 11C3 15 7 19 11 19C15 19 19 15 19 11"
                                              stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                                        <path d="M15 3L19 3L19 7" stroke="currentColor" strokeWidth="1.2"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M19 3L12 10" stroke="currentColor" strokeWidth="1.2"
                                              strokeLinecap="round"/>
                                    </svg>
                                ),
                                title: "Anos de Experiência",
                                desc: "Referência em móveis de vidro no leste paulista",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-white/10 p-5 hover:border-white/20 transition-colors duration-300"
                            >
                                <div className="text-white/50 mb-3">{item.icon}</div>
                                <p className="text-white text-sm font-medium mb-1">{item.title}</p>
                                <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}