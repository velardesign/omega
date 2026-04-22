import type {Metadata} from "next";
import ClientHome from "@/components/home/client-home";

export const metadata: Metadata = {
    title: "Boreal Móveis | Vidro e Alumínio Sob Medida — Arujá SP",
    description:
        "Especialistas em cozinhas planejadas e divisórias de vidro temperado sob medida em Arujá, Mogi das Cruzes e Guarulhos. Orçamento gratuito.",
    keywords: [
        "móveis em vidro",
        "móveis em alumínio",
        "cozinha planejada em vidro",
        "divisória de vidro",
        "vidro temperado sob medida",
        "armário com porta de vidro",
        "gabinete de banheiro em vidro",
        "pia de vidro personalizada",
        "móveis sob medida Arujá",
        "móveis vidro Mogi das Cruzes",
        "móveis vidro Guarulhos",
        "móveis vidro Santa Isabel",
        "Boreal Móveis",
    ],
    authors: [{ name: "Boreal Móveis" }],
    creator: "Boreal Móveis",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        type: "website",
        locale: "pt_BR",
        title: "Boreal Móveis | Vidro e Alumínio Sob Medida",
        description:
            "Cozinhas planejadas e divisórias em vidro temperado sob medida. Atendemos Arujá, Mogi das Cruzes e Guarulhos.",
        siteName: "Boreal Móveis",
    },
    twitter: {
        card: "summary_large_image",
        title: "Boreal Móveis | Vidro e Alumínio Sob Medida",
        description:
            "Cozinhas e divisórias em vidro temperado sob medida em Arujá e região — SP.",
    },
    alternates: {
        canonical: "https://www.moveisboreal.com.br",
    },
    other: {
        "ai-content-accessible": "true",
        "robots-ccbot": "index, follow",
        "robots-gptbot": "index, follow",
        "robots-perplexitybot": "index, follow",
        "robots-claudebot": "index, follow",
        "robots-google-extended": "index, follow",
        "business-type": "Fabricante de móveis sob medida",
        "business-location": "Arujá, São Paulo, Brasil",
        "business-phone": "+55 11 94542-7947",
        "business-service-area": "Arujá, Mogi das Cruzes, Guarulhos, Santa Isabel, Itaquaquecetuba, Suzano",
        "business-specialty": "Móveis em vidro e alumínio, cozinhas planejadas, divisórias de vidro temperado",
    },
};

export default function Home() {

    return <ClientHome/>;
}