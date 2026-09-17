import React from 'react';
import { Terminal, Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-gray-800/80 bg-gray-950 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & tagline */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md">
              <Terminal className="w-4 h-4 text-gray-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="font-mono text-sm font-bold text-white">
                utkarsh<span className="text-emerald-400">.dev</span>
              </div>
              <div className="text-[11px] text-gray-400">AI Enthusiast & Full-Stack Engineer</div>
            </div>
          </div>

          {/* Center text */}
          <div className="text-xs text-gray-400 text-center flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>using React, Node.js, Express & MySQL</span>
          </div>

          {/* Socials & Back to top */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/utkarsharma12"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              title="GitHub @utkarsharma12"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="text-gray-400 hover:text-white transition-colors"
              title="Contact"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="ml-2 p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-gray-900 text-center text-[11px] text-gray-400 font-mono">
          &copy; {new Date().getFullYear()} Utkarsh Sharma. All rights reserved. Full-stack portfolio internship project.
        </div>
      </div>
    </footer>
  );
}
