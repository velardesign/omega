export function Contact() {
  const whatsappNumber = "5511945427947";
  const whatsappMessage = encodeURIComponent(
    "Olá! Vim pelo site da Boreal e gostaria de solicitar um orçamento."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section
      id="contato"
      aria-label="Entre em contato com a Boreal Móveis em Vidro"
      className="py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">

        {/* Topo */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-4">
            Contato
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-white leading-snug mb-4">
            Solicite seu
            <br />
            <span className="text-white/60">Orçamento Gratuito</span>
          </h2>
          <div className="w-10 h-px bg-white/20 mx-auto mt-6" />
          <p className="mt-6 text-white/50 text-base max-w-xl mx-auto leading-relaxed">
            Atendemos residências em{" "}
            <strong className="text-white/70 font-normal">Arujá</strong>,{" "}
            <strong className="text-white/70 font-normal">Mogi das Cruzes</strong>,{" "}
            <strong className="text-white/70 font-normal">Guarulhos</strong> e região.
            Fale com a gente agora pelo WhatsApp e receba uma proposta personalizada.
          </p>
        </div>

        {/* Cards de contato */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 2C6.58 2 3 5.58 3 10C3 11.77 3.58 13.41 4.55 14.74L3 19L7.44 17.5C8.73 18.44 10.3 19 12 19C16.42 19 20 15.42 20 11C20 6.58 16.42 3 12 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 10.5C8 10.5 8.5 12 10.5 13.5C12.5 15 14 14.5 14 14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              ),
              label: "WhatsApp",
              value: "(11) 94542-7947",
              sub: "Respondemos rapidamente",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="9" r="3" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M11 2C7.13 2 4 5.13 4 9C4 14.25 11 20 11 20C11 20 18 14.25 18 9C18 5.13 14.87 2 11 2Z" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
              ),
              label: "Localização",
              value: "Arujá — SP",
              sub: "Atendemos toda a região",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M11 7V11L14 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              ),
              label: "Horário",
              value: "Seg–Sex, 8h–18h",
              sub: "Sáb até 13h",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 p-6 text-center hover:border-white/20 transition-colors duration-300"
            >
              <div className="text-white/40 flex justify-center mb-3">{item.icon}</div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-white text-sm font-medium">{item.value}</p>
              <p className="text-white/30 text-xs mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* CTA WhatsApp */}
        <div className="text-center">

            <a href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar orçamento de móveis em vidro pelo WhatsApp"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-white text-black text-sm font-medium tracking-wide hover:bg-white/90 transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1C4.58 1 1 4.58 1 9C1 10.77 1.58 12.41 2.55 13.74L1 18L5.44 16.5C6.73 17.44 8.3 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Falar no WhatsApp
          </a>
          <p className="mt-4 text-white/20 text-xs tracking-wide">
            Orçamento gratuito · Sem compromisso · Resposta rápida
          </p>
        </div>

      </div>
    </section>
  );
}