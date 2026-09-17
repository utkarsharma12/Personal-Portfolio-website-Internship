import React from 'react';
import { Briefcase, Calendar, Building, Sparkles } from 'lucide-react';

export default function Experience({ experiences = [] }) {
  return (
    <section id="experience" className="py-24 relative border-t border-gray-800/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Experience & Education
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            My career timeline, engineering internships, and academic foundation.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-gray-800 ml-4 sm:ml-32 space-y-12">
          {experiences.map((item, index) => {
            const skillsList = item.skills_used ? item.skills_used.split(',').map(s => s.trim()) : [];

            return (
              <div key={item.id || index} className="relative pl-8 sm:pl-10 group">
                
                {/* Glowing timeline node */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gray-950 border-2 border-emerald-400 group-hover:bg-emerald-400 group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(52,211,153,0.5)]" />

                {/* Left Date display for larger screens */}
                <div className="hidden sm:block absolute -left-32 top-1 text-right w-24">
                  <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {item.period}
                  </span>
                </div>

                {/* Content Card */}
                <div className="glass-card p-6 rounded-2xl border border-gray-800/80 hover:border-emerald-500/30 transition-all">
                  
                  {/* Mobile period badge */}
                  <div className="sm:hidden mb-2">
                    <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                      {item.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-3">
                    <Building className="w-3.5 h-3.5 text-gray-500" />
                    <span>{item.company}</span>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Skills used */}
                  {skillsList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-800/70">
                      {skillsList.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-gray-900 text-gray-400 border border-gray-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
