import React, { useState } from 'react';
import { 
  Code2, Server, Database, Wrench, Layers, 
  FileCode, Layout, Palette, Code, Cpu, 
  Network, ShieldCheck, HardDrive, GitBranch, Box, Send, Cloud 
} from 'lucide-react';

const iconMap = {
  Code2, FileCode, Layout, Palette, Code,
  Server, Cpu, Network, ShieldCheck,
  Database, HardDrive, Layers,
  GitBranch, Box, Send, Cloud, Wrench
};

export default function Skills({ skills = [] }) {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'AI & ML', 'Frontend', 'Backend', 'Database', 'Tools'];

  const filteredSkills = activeTab === 'All' 
    ? skills 
    : skills.filter(s => s.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <section id="skills" className="py-24 relative border-t border-gray-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Skills & Competencies
          </h2>
          <p className="text-gray-400 mt-3 text-base">
            Core technologies and tools I utilize across full-stack application lifecycle.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === cat
                  ? 'bg-emerald-500 text-gray-950 font-semibold shadow-lg shadow-emerald-500/20'
                  : 'bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredSkills.map((skill) => {
            const IconComponent = iconMap[skill.icon] || Code2;
            return (
              <div
                key={skill.id || skill.name}
                className="glass-card p-4 rounded-xl border border-gray-800/80 hover:border-emerald-500/30 flex flex-col items-center text-center group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-900/80 border border-gray-800 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:border-emerald-500/40 transition-transform mb-3">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  {skill.name}
                </h3>
                <span className="text-[11px] font-mono text-gray-500 px-2 py-0.5 rounded-full bg-gray-900 border border-gray-800">
                  {skill.category}
                </span>
                <div className="mt-3 w-full flex items-center justify-between text-[11px] text-gray-400">
                  <span className="text-gray-500">Level</span>
                  <span className="text-emerald-400 font-medium">{skill.level || 'Advanced'}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
