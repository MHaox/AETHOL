"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Manifesto() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Fade in the background glow
    tl.to(".glow-orb", {
      opacity: 1,
      duration: 2,
      ease: "power2.inOut",
    })
    // 2. Reveal the headers line by line
    .from(".reveal-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    }, "-=1.5")
    // 3. Fade in the body paragraphs
    .from(".manifesto-body p", {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
    }, "-=0.5")
    // 4. The "Blow In" effect for the artwork
    .from(".aeolus-artwork-container", {
      x: 100, // Blows in from the right
      opacity: 0,
      rotation: 8, // Slight tilt
      scale: 0.95,
      duration: 1.5,
      ease: "back.out(1.2)",
    }, "-=1.0")
    // 5. Fade in the bottom signature and button
    .from(".bottom-reveal", {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.5");

    // EXTRA ANIMATION: Continuous "Floating in the Wind" effect
    // We target the image wrapper specifically for the float so it doesn't mess with the entrance animation
    gsap.to(".aeolus-artwork", {
      y: -15,
      rotation: -1.5,
      repeat: -1,
      yoyo: true,
      duration: 4,
      ease: "sine.inOut",
      delay: 2.5 // Waits for the entrance animation to finish first
    });

  }, { scope: container });

  return (
    <main ref={container} className="relative min-h-screen bg-[#080c16] text-white pt-40 pb-24 px-6 md:px-12 overflow-hidden">
      
      {/* Background Mythological Glow */}
      <div className="glow-orb opacity-0 absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="mb-16 border-b border-cyan-900/30 pb-8">
          <p className="reveal-text text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase mb-4">
            File 01 // The Philosophy
          </p>
          <h1 className="reveal-text text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight mb-4">
            The <br/> Manifesto.
          </h1>
          <p className="reveal-text text-xl md:text-2xl text-slate-400 font-light italic">
            Engineering the logic. Designing the breeze.
          </p>
        </div>

        {/* FIXED: CSS GRID WRAPPER 
          This forces the text to the left (7 columns) and the image to the right (5 columns) on desktop
        */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center">
          
          {/* Left Side: The Text */}
          <div className="manifesto-body md:col-span-7 space-y-8 text-lg md:text-xl text-slate-300 font-light leading-relaxed">
            <p>
              In Greek mythology, <strong className="text-white font-bold">Aeolus</strong> was appointed by the gods as the keeper of the winds. He held the power to calm the breeze or unleash the storm, directing the unseen forces that moved the world.
            </p>
            <p>
              At <strong className="text-white font-bold">Aethol</strong>, we treat digital experiences the same way. 
            </p>
            <p>
              Code, much like the wind, is invisible. Users don't see the logic, the databases, or the routing. But they <em className="text-cyan-200">feel</em> it. They feel the friction of a broken layout, and they feel the effortless glide of a perfectly optimized interface.
            </p>
            <p className="pl-6 border-l-2 border-cyan-600/50 italic text-slate-400">
              We bridge the gap between raw technical power and human-centric design.
            </p>
            <p>
              With a foundation in Software Engineering and a rigorous focus on Communication and Multimedia Design (CMD), Aethol exists to harness the storm. We don't just build websites; we direct the digital currents.
            </p>
          </div>

          {/* Right Side: The Artwork */}
          <div className="aeolus-artwork-container md:col-span-5 relative">
            <div className="aeolus-artwork relative w-full aspect-[3/4] border border-cyan-900/30 rounded-sm overflow-hidden mix-blend-luminosity opacity-70 hover:mix-blend-normal hover:opacity-100 transition-all duration-700 cursor-crosshair">
              
              {/* Pointing to your local public folder asset */}
              <img 
                src="/Juno_Asking_Aeolus_to_Release_the_Winds.jpg" 
                alt="Juno Asking Aeolus to Release the Winds by François Boucher" 
                className="w-full h-full object-cover grayscale object-center" 
              />
              
              {/* Cyan Tint Overlay */}
              <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay pointer-events-none"></div>
            </div>
            
            {/* Updated Image Caption */}
            <p className="aeolus-artwork text-right text-[10px] font-mono text-cyan-600 mt-3 uppercase tracking-widest">
              Fig. 1 — Juno & Aeolus (F. Boucher)
            </p>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-cyan-900/30 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
          <div className="bottom-reveal text-sm font-mono text-cyan-500 uppercase tracking-widest">
            Aethol // 2026
          </div>
          <a href="mailto:mhaox.dev@gmail.com" className="bottom-reveal bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-cyan-400 transition-colors duration-300">
            Summon the Wind
          </a>
        </div>

      </div>
    </main>
  );
}