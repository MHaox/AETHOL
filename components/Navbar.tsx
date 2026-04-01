"use client";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // 1. Blur the background if scrolled down more than 50px
            setIsScrolled(currentScrollY > 50);

            // 2. Hide when scrolling DOWN, Show when scrolling UP
            // We only start hiding after 200px so it doesn't glitch at the very top
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }

            // Update the last position for the next scroll event
            lastScrollY = currentScrollY;
        };

        // Add the listener
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Cleanup the listener when the component unmounts
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${isHidden ? "-translate-y-full" : "translate-y-0"
                } ${isScrolled
                    ? "bg-[#080c16]/80 backdrop-blur-md border-b border-cyan-900/30 py-4 shadow-xl"
                    : "bg-transparent py-8"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

                {/* Left: The Brand */}
                <a href="/" className="w-24 md:w-28 block">
                    <Logo className="text-white hover:text-cyan-400 transition-colors duration-300" />
                </a>

                {/* Center: The Links */}
                <div className="hidden md:flex gap-8 text-[10px] md:text-xs font-mono tracking-widest uppercase text-slate-300">
                    <a href="#archives" className="hover:text-white transition-colors">The Archives</a>
                    <Link href="/manifesto" className="hover:text-white transition-colors">Manifesto</Link>

                    <span
                        className="text-cyan-500/50 cursor-not-allowed flex items-center gap-2 select-none"
                        title="Currently in development"
                    >
                        Bag of Winds (.online) — Coming Soon
                    </span>
                </div>

                {/* Right: The CTA */}
                <a
                    href="mailto:mhaox.dev@gmail.com"
                    className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-widest bg-white text-black px-6 py-2 md:py-3 hover:bg-cyan-400 transition-colors duration-300"
                >
                    Initiate Contact
                </a>

            </div>
        </nav>
    );
}