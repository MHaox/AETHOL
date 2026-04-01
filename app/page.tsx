"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const container = useRef(null);

  useGSAP(() => {
    // A subtle "floating/wind" effect for your hero text
    gsap.to(".logo-text", {
      y: -20,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "power1.inOut"
    });
  }, { scope: container });

  return (
    <main ref={container} className="flex min-h-screen flex-col items-center justify-center bg-[#0f172a]">
      <h1 className="logo-text text-6xl font-bold text-white tracking-widest">
        AETHOL
      </h1>
      <p className="mt-4 text-cyan-400 opacity-70">Ruler of the Winds</p>
    </main>
  );
}