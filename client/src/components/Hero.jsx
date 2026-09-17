import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download, Sparkles, Code2, Database } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background glowing radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              AI Enthusiast • Aspiring AI Engineer • Full-Stack Developer
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Utkarsh Sharma</span> <br />
              Building Intelligent Systems & Web Apps.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              B.Tech in Computer Science (Artificial Intelligence) at <span className="text-white font-medium">Dr. APJ Abdul Kalam University</span>. Passionate about <span className="text-emerald-400 font-mono">Agentic AI</span>, <span className="text-emerald-400 font-mono">LangChain</span>, modern <span className="text-emerald-400 font-mono">React.js & Node.js</span> web development, and future game engineering.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-semibold text-sm shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Explore Projects</span>
                <Sparkles className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-gray-900/80 hover:bg-gray-800 border border-gray-700/80 text-gray-200 font-medium text-sm transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Get In Touch</span>
              </a>

              <a
                href="https://github.com/utkarsharma12"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-xl bg-gray-900/40 hover:bg-gray-800/60 border border-gray-800 text-gray-300 text-sm flex items-center gap-2 transition-all"
              >
                <Github className="w-4 h-4 text-gray-400" />
                <span>GitHub Profile</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-5 pt-4 text-gray-400">
              <span className="text-xs uppercase tracking-wider font-mono text-gray-500">Connect:</span>
              <a
                href="https://github.com/utkarsharma12"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-gray-900 border border-gray-800 hover:border-emerald-500/50 hover:text-white transition-all"
                title="GitHub @utkarsharma12"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-gray-900 border border-gray-800 hover:border-emerald-500/50 hover:text-white transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="p-2 rounded-lg bg-gray-900 border border-gray-800 hover:border-emerald-500/50 hover:text-white transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Hero Visual / Code Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-2xl filter blur-xl" />
              
              {/* Glass Code Editor Card */}
              <div className="relative rounded-2xl bg-gray-900/90 border border-gray-800 shadow-2xl p-6 font-mono text-xs overflow-hidden backdrop-blur-xl">
                {/* Editor Top Bar */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-800 text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] text-gray-500">developer.profile.ts</span>
                  <div className="w-6" />
                </div>

                {/* Code Content */}
                <div className="space-y-2 text-gray-300 leading-relaxed">
                  <p className="text-purple-400">const <span className="text-blue-300">engineer</span> = &#123;</p>
                  <p className="pl-4">name: <span className="text-emerald-300">'Utkarsh Sharma'</span>,</p>
                  <p className="pl-4">role: <span className="text-emerald-300">'AI & Full-Stack Engineer'</span>,</p>
                  <p className="pl-4">education: <span className="text-emerald-300">'B.Tech CSE (AI) @ AKTU (2027)'</span>,</p>
                  <p className="pl-4">stack: [</p>
                  <p className="pl-8 text-amber-300">'Agentic AI', 'LangChain', 'Python',</p>
                  <p className="pl-8 text-amber-300">'React.js', 'Node.js', 'Java', 'MySQL'</p>
                  <p className="pl-4">],</p>
                  <p className="pl-4">vision: <span className="text-cyan-300">'Build intelligent AI apps & games'</span>,</p>
                  <p className="text-purple-400">&#125;;</p>
                </div>

                {/* Bottom interactive badge */}
                <div className="mt-5 pt-4 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Clean Code</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <Database className="w-3.5 h-3.5" />
                    <span>Relational & NoSQL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  );
}
