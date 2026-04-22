export function Footer() {
  const whatsappNumber = "5511945427947";
  const whatsappMessage = encodeURIComponent(
    "Olá! Vim pelo site da Boreal e gostaria de solicitar um orçamento."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Rodapé Boreal Móveis em Vidro e Alumínio"
      className="border-t border-white/10 py-16 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Coluna 1 — Marca */}
          <div>
            <p className="text-white text-lg font-light tracking-wide mb-3">Boreal Móveis</p>
            <p className="text-white/40 text-sm leading-relaxed">
              Especialistas em <strong className="text-white/60 font-normal">cozinhas planejadas</strong> e{" "}
              <strong className="text-white/60 font-normal">divisórias em vidro e alumínio</strong> sob
              medida para residências.
            </p>

             <a href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com a Boreal pelo WhatsApp"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl border border-white/20 text-white text-xs font-light tracking-wide hover:bg-white hover:text-black transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <path d="M9 1C4.58 1 1 4.58 1 9C1 10.77 1.58 12.41 2.55 13.74L1 18L5.44 16.5C6.73 17.44 8.3 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              (11) 94542-7947
            </a>
          </div>

          {/* Coluna 2 — Navegação */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-5">Navegação</p>
            <nav aria-label="Links do rodapé">
              <ul className="space-y-3">
                {[
                  { label: "Início", href: "#" },
                  { label: "Projetos", href: "#projetos" },
                  { label: "Sobre a Boreal", href: "#sobre" },
                  { label: "Contato", href: "#contato" },
                ].map((link) => (
                  <li key={link.label}>

                    <a  href={link.href}
                      className="text-white/40 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Coluna 3 — Região */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-5">Região Atendida</p>
            <ul className="space-y-2">
              {[
                "Arujá",
                "Mogi das Cruzes",
                "Guarulhos",
                "Santa Isabel",
                "Itaquaquecetuba",
                "Suzano",
              ].map((city) => (
                <li key={city} className="text-white/40 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/20 inline-block" />
                  {city}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Rodapé inferior */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            © {currentYear} Boreal Móveis em Vidro e Alumínio. Todos os direitos reservados.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="text-white/20 text-xs">
              Arujá — SP
            </p>
            <span className="hidden sm:block text-white/10 text-xs">·</span>
            <p className="text-white/20 text-xs">
              Desenvolvido por{" "}
              <span className="text-white/40 font-medium">Anderson Andrade</span>
              {" "}— Software Engineer
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}