import React from 'react';
import { Layout, Server, Database, Zap, Award, CheckCircle2 } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Layout,
      title: 'Frontend Mastery',
      desc: 'Crafting responsive, high-performance interfaces with React, state management, and modern styling.'
    },
    {
      icon: Server,
      title: 'Backend & APIs',
      desc: 'Building scalable Node.js and Express RESTful services with clean modular architectures and JWT security.'
    },
    {
      icon: Database,
      title: 'Database Design',
      desc: 'Designing normalized relational schemas in MySQL as well as flexible document stores in MongoDB.'
    },
    {
      icon: Zap,
      title: 'Performance & Deployment',
      desc: 'Optimized asset delivery, automated builds, and cloud deployment on Vercel, Netlify, and Render.'
    }
  ];

  const stats = [
    { label: 'Projects Built', value: '15+' },
    { label: 'Tech Stack Tools', value: '12+' },
    { label: 'Code Quality', value: '100%' },
    { label: 'Learning Mindset', value: 'Continuous' },
  ];

  return (
    <section id="about" className="py-24 relative border-t border-gray-800/60 bg-[#0c111d]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Bridging Design with Robust System Architecture
          </h2>
          <p className="text-gray-400 mt-4 text-base leading-relaxed">
            I am a full-stack engineer driven by curiosity and problem-solving. My goal is to build digital products that are fast, accessible, and enjoyable to use.
          </p>
        </div>

        {/* 2-Column Info & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-5 text-gray-300">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              Software & AI Engineering Journey
            </h3>
            <p className="text-gray-400 leading-relaxed">
              I am pursuing my <span className="text-white font-medium">B.Tech in Computer Science & Engineering (Artificial Intelligence)</span> at <span className="text-white font-medium">Dr. APJ Abdul Kalam Technical University (AKTU)</span> (Graduating 2027). I specialize in designing intelligent applications, generative AI workflows, and modern web applications.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My technical expertise spans <span className="text-emerald-400 font-mono">Agentic AI & LangChain</span>, Natural Language Processing with Python, alongside production-grade full-stack engineering with <span className="text-emerald-400 font-mono">React.js, Node.js, and Java</span> connected to relational <span className="text-emerald-400 font-mono">MySQL</span> databases.
            </p>

            <ul className="space-y-2.5 pt-2 font-medium text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AI & NLP: Agentic AI, LangChain, Prompt Engineering & NLTK</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full-Stack Development: React.js, Vite, Tailwind CSS, Node.js & Java</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Database Engineering: Structured SQL schema design & MySQL optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Game Development & 3D: C#, Unity, and Blender</span>
              </li>
            </ul>
          </div>

          {/* Highlights Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-5 rounded-xl border border-gray-800 hover:border-emerald-500/40 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:bg-emerald-500 group-hover:text-gray-950 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1.5">{item.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-sm">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 font-mono uppercase mt-1 tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
