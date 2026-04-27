import React from "react";
import Image from "next/image";
import { Mic, Clock, Headphones, Award, Users, Music, Star, BadgeCheck } from "lucide-react";

const authorityPoints = [
  { 
    title: "Professional Performer", 
    desc: "Real stage experience—not just theory-based teaching.", 
    icon: Mic,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20"
  },
  { 
    title: "11+ Years Experience", 
    desc: "A decade of experience teaching students at all levels.", 
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  },
  { 
    title: "Music Producer", 
    desc: "Deep understanding of sound, tone & modern music production.", 
    icon: Headphones,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20"
  },
  { 
    title: "LCM Certified", 
    desc: "Passed with Distinction. Strong academic + practical foundation.", 
    icon: Award,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  { 
    title: "100+ Students Trained", 
    desc: "Proven track record across India, USA, UK & Canada.", 
    icon: Users,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  { 
    title: "Multi-Genre Expertise", 
    desc: "Bollywood, English Pop, Rock, Fingerstyle, Acoustic & more.", 
    icon: Music,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20"
  },
];

export default function Instructor() {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-[#05050A]" id="instructor">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose-600/5 blur-[120px] mix-blend-screen" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left: Huge Portrait Profile */}
          <div className="w-full lg:w-5/12 flex justify-center">
            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0a0a0f]">
                {/* Fallback to hero-guitarist.jpg or you can change to a specific portrait later */}
                <Image
                  src="/hero-guitarist.jpg"
                  alt="Shuvam Raha - Professional Instructor"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  sizes="(max-width: 1024px) 380px, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/20 to-transparent" />
                
                {/* Overlay Name Tag */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/10 backdrop-blur-md mb-2">
                    <BadgeCheck className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-white tracking-wide uppercase">Verified Instructor</span>
                  </div>
                  <h3 className="text-3xl font-black text-white">Shuvam Raha</h3>
                  <p className="text-gray-300 font-medium">Professional Guitarist & Educator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The "Why Learn From Me" Grid */}
          <div className="w-full lg:w-7/12 flex flex-col">
            <div className="mb-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/10 mb-6 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
                <Star className="w-4 h-4 text-rose-400" />
                <span className="text-sm font-bold text-rose-400 tracking-widest uppercase">
                  Meet Your Coach
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
                Why Learn From{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
                  Shuvam Raha?
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0 font-medium">
                You’re not just learning from a teacher—you’re learning from an active professional performer and music producer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {authorityPoints.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <div 
                    key={idx}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.05] hover:border-white/10 group"
                  >
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${point.bg} border ${point.border} ${point.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{point.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
