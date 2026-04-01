"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "@/components/Logo";
import Projects from "@/components/Projects";

export default function Home() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    console.log("GSAP Hook Fired!");
    // 1. The Entrance: Logo fades and floats up smoothly
    gsap.from(".logo-wrapper", {
      y: 40,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });

    // 2. The "Breathing" Effect: Makes the head slowly drift so it feels alive
    gsap.to(".aeolus-head", {
      y: -3,
      rotation: 1,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut",
      transformOrigin: "center center"
    });

    // 3. The Interactive Wind: Head subtly follows the user's cursor
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      // Calculate mouse position relative to center of screen
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(".aeolus-head", {
        x: xPos,
        y: yPos,
        duration: 1.5, // Smooth lag effect
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: container });

  return (
    <>
      <main
        ref={container}
        className="relative flex min-h-screen flex-col items-center justify-center bg-[#080c16] overflow-hidden"
      >
        {/* Subtle Background Glow (The 'Aethol' Aura) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Main Content */}
        <div className="logo-wrapper relative z-10 w-full max-w-3xl px-6 flex flex-col items-center">
          {/* Your Logo Component! */}
          <Logo className="text-white drop-shadow-xl" />

          {/* Tagline */}
          <div className="mt-8 overflow-hidden">
            <p className="text-cyan-200/70 tracking-[0.4em] text-xs md:text-sm font-light uppercase">
              Directing the Digital Currents
            </p>
          </div>
        </div>
      </main>
      <Projects />
    </>
  );

}