"use client"
import HeroCarousel from "@/components/home/hero-carousel";
import {Gallery} from "@/components/home/gallery";
import {About} from "@/components/home/about";
import {Contact} from "@/components/home/contact";
import {Analytics} from "@vercel/analytics/next";
import {Footer} from "@/components/home/footer";
import {Navbar} from "@/components/home/nav-bar";


export default function ClientHome() {
    return (
        <main className="w-full">
            <Navbar/>
            <div className="pt-16">
                <HeroCarousel/>
                <Gallery/>
                <About/>
                <Contact/>
                <Footer/>
                <Analytics />
            </div>
        </main>
    );
}