import React from 'react';
import { X, ExternalLink, Github, Tag, Layers, CheckCircle } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const tagsList = project.tags ? project.tags.split(',').map(t => t.trim()) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative h-56 w-full bg-gray-950 overflow-hidden">
          <img
            src={project.image_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'}
            alt={project.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {project.category}
            </span>
            {project.featured ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs bg-amber-400/20 text-amber-300 border border-amber-400/30 font-medium">
                ★ Featured
              </span>
            ) : null}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
          </div>

          {/* Tags */}
          {tagsList.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {tagsList.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs bg-gray-800 text-gray-300 border border-gray-700/60 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Engineering Highlights */}
          <div className="bg-gray-950/60 p-4 rounded-xl border border-gray-800/80">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              Engineering Highlights
            </h4>
            <ul className="text-xs text-gray-400 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Integrated RESTful endpoints with parameter validation and defensive error handling</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Responsive mobile-first layout with smooth state synchronization</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Relational database queries configured for rapid data retrieval</span>
              </li>
            </ul>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium text-xs flex items-center justify-center gap-2 border border-gray-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
