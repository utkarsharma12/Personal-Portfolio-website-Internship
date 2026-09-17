import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import api from './services/api';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [dbStatus, setDbStatus] = useState('connecting');
  const [loading, setLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const fetchPortfolioData = async () => {
    try {
      const [projRes, skillRes, expRes, healthRes] = await Promise.allSettled([
        api.getProjects(),
        api.getSkills(),
        api.getExperience(),
        api.getHealth()
      ]);

      if (projRes.status === 'fulfilled') {
        setProjects(projRes.value.data || []);
      }
      if (skillRes.status === 'fulfilled') {
        setSkills(skillRes.value.data || []);
      }
      if (expRes.status === 'fulfilled') {
        setExperiences(expRes.value.data || []);
      }
      if (healthRes.status === 'fulfilled') {
        setDbStatus(healthRes.value.database || 'connected');
      } else {
        setDbStatus('fallback');
      }
    } catch (err) {
      console.error('Error fetching initial portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center text-white space-y-4 font-mono">
        <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
        <div className="text-sm tracking-wider text-gray-400">Loading Portfolio Experience...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        dbStatus={dbStatus}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills skills={skills} />
        <Projects
          projects={projects}
          onAddProjectClick={() => setIsAdminOpen(true)}
        />
        <Experience experiences={experiences} />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin CMS Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onDataChanged={fetchPortfolioData}
      />
    </div>
  );
}
