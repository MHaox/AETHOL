"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// Register ScrollTrigger for Next.js
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// 1. YOUR REAL DATA (Mapped to the "Four Winds")
const projects = [
    {
        id: 1,
        title: "Jaro Gevel Techniek",
        category: "Web Development",
        wind: "Boreas", // North Wind (Heavy Logic)
        images: ["https://i.imgur.com/kRAkYWE.png"],
        description: "Full website redesign & development.",
        fullDescription: "I made a full redesign of the Jaro Gevel Techniek website to improve user experience and modernize the look and feel. The project included a complete overhaul of the site's layout, color scheme, and functionality to better serve the client's needs and attract more visitors.",
        technologies: ["WordPress", "Elementor", "Brand Strategy", "Visual Identity"],
        link: "https://jarogeveltechniek.nl/"
    },
    {
        id: 2,
        title: "Museum Pop-up",
        category: "Interaction Design",
        wind: "Zephyrus", // West Wind (Creative/UI)
        images: ["https://i.imgur.com/iFoVtJw.jpeg"],
        description: "Interactive museum installation.",
        fullDescription: "For this project, we designed an interactive museum installation for a pop-up museum at our school. The installation aimed to engage visitors through immersive design elements and interactive features. We focused on creating a user-friendly experience that would captivate the audience and encourage exploration of the exhibits.",
        technologies: ["Figma", "Illustrator", "Scrum", "Prototyping"],
        link: "https://docs.google.com/document/d/1c9jAP73toWUDVamuIbWXa8u3nDEAXsidm-OFxHUFHH0/edit?usp=sharing"
    },
    {
        id: 3,
        title: "Pressure Cooker",
        category: "Client Project",
        wind: "Eurus", // East Wind (Fast/Stormy)
        images: ["https://i.imgur.com/8sUASmx.png"],
        description: "Working under pressure to create a design.",
        fullDescription: "For the Pressure Cooker Challenge, I had to work under tight deadlines to create a design for a client. This project tested my ability to manage time effectively, prioritize tasks, and deliver high-quality work within a limited timeframe of 1 week.",
        technologies: ["React", "Illustrator", "Visual Identity"],
        link: "/pressure-cooker"
    },
    {
        id: 4,
        title: "Learning Illustrator",
        category: "Personal Growth",
        wind: "Notus", // South Wind (Warm/Personal)
        images: ["https://i.imgur.com/8abgjpQ.jpeg", "https://i.imgur.com/zsLluxV.jpeg", "https://i.imgur.com/VIGiifl.jpeg"],
        description: "Self-taught vector graphics plan.",
        fullDescription: "To enhance my design skills, I created a structured learning plan to improve in Adobe Illustrator. This involved following tutorials, practicing various design techniques, and completing projects to apply what I learned.",
        technologies: ["Illustrator", "Learning", "Creative"],
        link: "https://docs.google.com/document/d/11xZbyt4hDQ9EWp3V4skDMaGHaZdChOBW0PeOobxfTLQ/edit?usp=sharing"
    }
];

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);

    // Modal State
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // --- Modal Image Navigation ---
    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedProject) {
            setActiveImageIndex((prev) => (prev + 1) % selectedProject.images.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedProject) {
            setActiveImageIndex((prev) => prev === 0 ? selectedProject.images.length - 1 : prev - 1);
        }
    };

    // --- GSAP Scroll Animation ---
    useGSAP(() => {
        const cards = gsap.utils.toArray(".project-card");

        gsap.from(cards, {
            y: 100,
            opacity: 0,
            rotateX: -10, // Slight tilt as it blows in
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            }
        });
    }, { scope: sectionRef });

    return (
        <section id="archives" ref={sectionRef} className="py-32 px-6 md:px-12 bg-[#080c16] min-h-screen relative z-20">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-light text-white mb-16 tracking-widest uppercase">
                    The <span className="font-bold text-cyan-500">Archives</span>
                </h2>

                {/* --- GRID OF PROJECTS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => { setSelectedProject(project); setActiveImageIndex(0); }}
                            className="project-card group cursor-pointer relative h-[450px] border border-cyan-900/30 bg-slate-900/40 rounded-sm overflow-hidden flex flex-col justify-end p-8 hover:border-cyan-400/50 transition-colors duration-500"
                        >
                            {/* Background Image */}
                            <img
                                src={project.images[0]}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale mix-blend-luminosity group-hover:scale-105 group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-700"
                            />

                            {/* Gradient Overlay so text is readable */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080c16] via-[#080c16]/80 to-transparent z-10"></div>

                            {/* Card Content */}
                            <div className="relative z-20 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                <p className="text-cyan-400 text-xs tracking-widest uppercase mb-2 font-mono">
                                    {project.wind} // {project.category}
                                </p>
                                <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                                    {project.title}
                                </h3>
                                <p className="text-slate-400 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                                    {project.description}
                                </p>

                                {/* Tech Stack Pills */}
                                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                                    {project.technologies.map(t => (
                                        <span key={t} className="text-xs px-3 py-1 rounded-sm border border-slate-700 bg-slate-800/50 text-slate-300 backdrop-blur-sm">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- MODAL (THE AETHOL VIBE) --- */}
            {selectedProject && (
                <div
                    className="fixed inset-0 bg-[#080c16]/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="bg-slate-900 max-w-5xl w-full border border-cyan-900/50 rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Left Side: Image Gallery */}
                        <div className="w-full md:w-1/2 relative bg-black min-h-[300px] flex items-center justify-center">
                            <img
                                src={selectedProject.images[activeImageIndex]}
                                alt="Project"
                                className="w-full h-full object-contain"
                            />

                            {/* Gallery Controls (Only show if multiple images) */}
                            {selectedProject.images.length > 1 && (
                                <div className="absolute bottom-4 left-0 w-full flex justify-center items-center gap-6 z-10">
                                    <button onClick={prevImage} className="p-2 bg-black/50 text-white rounded-full hover:bg-cyan-600 transition backdrop-blur-sm">
                                        <ChevronLeft size={20} />
                                    </button>
                                    <div className="flex gap-2">
                                        {selectedProject.images.map((_, i) => (
                                            <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === activeImageIndex ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                                        ))}
                                    </div>
                                    <button onClick={nextImage} className="p-2 bg-black/50 text-white rounded-full hover:bg-cyan-600 transition backdrop-blur-sm">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Right Side: Info */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto relative">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition"
                            >
                                <X size={24} />
                            </button>

                            <p className="text-cyan-500 font-mono text-xs tracking-widest uppercase mb-2">
                                Project File // {selectedProject.category}
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                {selectedProject.title}
                            </h2>

                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">The Brief</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    {selectedProject.fullDescription}
                                </p>
                            </div>

                            <div className="mb-10">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.technologies.map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <a
                                href={selectedProject.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 font-bold hover:bg-cyan-500 transition-colors uppercase tracking-wider text-sm"
                            >
                                Launch Project <ExternalLink size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}