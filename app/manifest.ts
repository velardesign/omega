import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Boreal Móveis em Vidro e Alumínio",
        short_name: "Boreal Móveis",
        description:
            "Especialistas em cozinhas planejadas e divisórias de vidro temperado sob medida em Arujá e região.",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
            {
                src: "/icons/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icons/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}