"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Animate the massive text characters up from the bottom
    gsap.from(".footer-text-char", {
      y: 150,
      opacity: 0,
      rotateX: -45,
      stagger: 0.05,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
      }
    });

    // Fade in the links
    gsap.from(".footer-links", {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: footerRef });

  // Split the word into an array so we can animate each letter individually
  const title = "AETHOL".split("");

  return (
    <footer id="contact" ref={footerRef} className="bg-black text-white pt-32 pb-12 px-6 md:px-12 border-t border-cyan-900/30 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vw] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">

        <p className="text-cyan-500 font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-6">
          Ready to command the currents?
        </p>

        {/* Massive Animated Title */}
        <h2 className="text-[15vw] leading-none font-black tracking-tighter flex overflow-hidden mb-12">
          {title.map((char, index) => (
            <span key={index} className="footer-text-char inline-block">
              {char}
            </span>
          ))}
        </h2>

        {/* Contact Links */}
        <div className="footer-links w-full flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-800 pt-8 mt-12">

          <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8">
            <a href="mailto:mhaox.dev@gmail.com" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest text-xs font-bold">
              <Mail size={16} /> mhaox.dev@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/max-robert-hoogeweg/" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest text-xs font-bold">
              LinkedIn <ArrowUpRight size={14} className="opacity-70" />
            </a>
            <a href="https://github.com/MHaox" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
              GitHub <ArrowUpRight size={14} className="opacity-70" />
            </a>
          </div>

          <div className="text-slate-600 text-xs font-mono uppercase tracking-widest text-center md:text-right">
            <p>© {new Date().getFullYear()} Max Robert Hoogeweg.</p>
            <p>Built with Next.js & GSAP.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}