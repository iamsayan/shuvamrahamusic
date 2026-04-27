import React from "react";
import { BookOpen, Headphones, Award, MessageCircle, Calendar, ShieldCheck, FileText, Music, Sparkles, CheckCircle2, FileCheck2, Clock, Info } from "lucide-react";

const features = [
  {
    title: "Learning Support & Guidance",
    desc: "Everything you need to learn, practice, and improve—fully structured.",
    icon: ShieldCheck,
    points: [
      { t: "Free Introductory Call", d: "Understand your level + get a personalized roadmap" },
      { t: "Structured Syllabus", d: "Beginner to Advanced. Always know your next step" },
      { t: "Practice Routine (PDF)", d: "Clear daily plan—no confusion" },
      { t: "Curated Song List", d: "Learn songs based on your taste & skill level" },
    ]
  },
  {
    title: "Study Materials & Resources",
    desc: "All materials are shared for easy access anytime via WhatsApp or Email.",
    icon: FileText,
    points: [
      { t: "Practice PDFs", d: "Detailed tabs, notes, and exercises" },
      { t: "Visual Guides", d: "High-quality lesson photos & diagrams" },
      { t: "Audio Tracks", d: "Backing tracks for rhythm & timing control" },
      { t: "Video Lessons", d: "Recorded video breakdowns for complex sections" },
    ]
  },
  {
    title: "Certification (Optional)",
    desc: "Ideal for students who want formal certification & structured growth.",
    icon: Award,
    points: [
      { t: "Global Recognition", d: "Appear for internationally recognized guitar grade exams" },
      { t: "Exam Preparation", d: "Aligned with reputed Western music boards (like LCM/Trinity)" },
      { t: "Focused Syllabus", d: "Structured specifically to pass your desired grade" },
    ]
  },
  {
    title: "Ongoing Support",
    desc: "Never feel stuck. Get help exactly when you need it.",
    icon: MessageCircle,
    points: [
      { t: "Direct WhatsApp Support", d: "Ask doubts anytime between classes" },
      { t: "Video Feedback", d: "Send short videos of your playing for posture & technique corrections" },
    ]
  }
];

export default function WhatYouGet() {
  return (
    <section className="relative w-full py-16 md:py-24 px-5 md:px-12 lg:px-20 overflow-hidden bg-[#05050A]" id="what-you-get">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-cyan-600/5 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full bg-blue-600/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-cyan-400 tracking-widest uppercase">
              Complete Learning System
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            You Also <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Get...</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            You’re not just joining a class—you’re getting a fully structured ecosystem designed to guarantee your progress.
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col p-6 sm:p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl hover:bg-white/[0.04] transition-colors duration-300">
              <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 shrink-0">
                  <feature.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm font-medium">{feature.desc}</p>
                </div>
              </div>
              
              <ul className="flex flex-col gap-5 flex-1">
                {feature.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-200 block sm:inline">{point.t} — </strong>
                      <span className="text-gray-400 text-sm sm:text-base">{point.d}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Logistics / Schedule Dashboard */}
        <div className="relative w-full rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-3xl overflow-hidden shadow-2xl p-8 sm:p-12">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-50" />
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
              
              {/* Column 1: Schedule */}
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white">Class Schedule</h3>
                 </div>
                 <p className="text-gray-400 text-sm mb-2">Available Timings (IST)</p>
                 <ul className="flex flex-col gap-3">
                    <li className="flex items-center gap-2 text-gray-200 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                      <strong className="w-20">Mon - Wed:</strong> <span>10:00 AM – 9:00 PM</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-200 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                      <strong className="w-20">Sat - Sun:</strong> <span>10:00 AM – 4:00 PM</span>
                    </li>
                 </ul>
              </div>

              {/* Column 2: Booking System */}
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">Booking System</h3>
                 </div>
                 <ul className="flex flex-col gap-3">
                    <li className="flex items-start gap-3">
                       <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                       <span className="text-gray-300 text-sm"><strong>Fixed Day & Time:</strong> A dedicated slot is required for consistency.</span>
                    </li>
                    <li className="flex items-start gap-3">
                       <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                       <span className="text-gray-300 text-sm"><strong>1-to-1 Attention:</strong> All classes are entirely private for maximum focus.</span>
                    </li>
                 </ul>
              </div>

              {/* Column 3: Important Notes */}
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3 mb-2">
                    <Info className="w-6 h-6 text-indigo-400" />
                    <h3 className="text-xl font-bold text-white">Important Notes</h3>
                 </div>
                 <ul className="flex flex-col gap-3">
                    <li className="flex items-start gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2" />
                       <span className="text-gray-300 text-sm"><strong>Month-End Break:</strong> No classes on the 29th–31st of any month.</span>
                    </li>
                    <li className="flex items-start gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2" />
                       <span className="text-gray-300 text-sm"><strong>Fees Due:</strong> By the 5th of every month.</span>
                    </li>
                    <li className="flex items-start gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2" />
                       <span className="text-gray-300 text-sm"><strong>Make-up Classes:</strong> Must be scheduled and completed within the same month.</span>
                    </li>
                 </ul>
              </div>

           </div>
        </div>

      </div>
    </section>
  );
}
