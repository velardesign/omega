"use client"
import HeroCarousel from "@/components/home/hero-carousel";
import {Gallery} from "@/components/home/gallery";
import {About} from "@/components/home/about";
import {Contact} from "@/components/home/contact";
import {Analytics} from "@vercel/analytics/next";


export default function ClientHome() {
    return (
        <div className="flex flex-col gap-4 p-4 pt-0">
            <HeroCarousel/>
            <Gallery/>
            <About/>
            <Contact/>
            <Analytics/>
        </div>
    );
}