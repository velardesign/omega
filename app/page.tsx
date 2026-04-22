"use client"

import {Contact} from "@/components/home/contact";
import {About} from "@/components/home/about";
import {Gallery} from "@/components/home/gallery";
import HeroCarousel from "@/components/home/hero-carousel";
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <HeroCarousel/>
            <About/>
            <Gallery/>
            <Contact/>
            <Analytics />
        </div>
    );
}