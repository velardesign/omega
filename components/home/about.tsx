export function About() {
  return (
    <section id="sobre" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">

        {/* Label */}
        <span className="text-xs uppercase tracking-[0.5em] text-gray-600">
          Sobre a Boreal
        </span>

        {/* Título */}
        <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
          Móveis em Vidro e Alumínio
          <br />
          <span className="text-gray-700">Sob Medida</span>
        </h2>

        {/* Divider */}
        <div className="w-12 h-0.5 bg-gray-900 mx-auto mt-6" />

        {/* Texto */}
        <p className="mt-8 text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
          Especialistas na fabricação de móveis em vidro e alumínio,
          criamos soluções modernas, resistentes e sofisticadas para
          cozinhas, banheiros, áreas gourmet e ambientes comerciais.
        </p>

        <p className="mt-4 text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
          Trabalhamos com materiais de alta qualidade e acabamento impecável,
          garantindo durabilidade, segurança e um design elegante para cada projeto.
        </p>

        <p className="mt-4 text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
          Desenvolvemos projetos sob medida como <strong>pias personalizadas</strong>,
          <strong> gabinetes</strong>, <strong> armarios</strong> e móveis planejados.
        </p>

        {/* Local */}
        <p className="mt-6 text-sm text-gray-600">
          Atendendo Arujá, Mogi das Cruzes, Guarulhos e região
        </p>

        {/* CTA */}
        <div className="mt-10">
          <button className="px-7 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
            Solicitar orçamento
          </button>
        </div>
      </div>
    </section>
  );
}