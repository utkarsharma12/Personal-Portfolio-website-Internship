import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Terminal, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenAdmin, dbStatus }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0F19]/85 backdrop-blur-md border-b border-gray-800/80 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-white group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md group-hover:shadow-emerald-500/20 transition-all">
              <Terminal className="w-5 h-5 text-gray-950 stroke-[2.5]" />
            </div>
            <span className="font-mono text-gray-200">
              utkarsh<span className="text-emerald-400">.dev</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* DB Status Badge */}
            <div
              title={dbStatus === 'mysql_connected' ? 'Connected to MySQL Database' : 'Running in In-Memory Fallback'}
              className="flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-gray-800/80 border border-gray-700/60 text-gray-300 font-mono"
            >
              <span className={`w-2 h-2 rounded-full ${dbStatus === 'mysql_connected' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{dbStatus === 'mysql_connected' ? 'MySQL' : 'Local DB'}</span>
            </div>

            {/* Admin CMS Button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin CMS</span>
            </button>

            {/* Contact CTA */}
            <a
              href="#contact"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-gray-900 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-md shadow-emerald-500/20"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg text-emerald-400 bg-emerald-950/40 border border-emerald-500/30"
              title="Admin CMS"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F172A]/95 backdrop-blur-xl border-b border-gray-800 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-gray-200 hover:text-emerald-400 py-2 border-b border-gray-800/50"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Panel</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-900 bg-emerald-400"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
