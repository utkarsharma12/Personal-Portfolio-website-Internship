import React, { useState } from 'react';
import { ExternalLink, Github, Eye, Sparkles } from 'lucide-react';
import ProjectModal from './ProjectModal';

export default function Projects({ projects = [], onAddProjectClick }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'Mobile'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => (p.category || '').toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="projects" className="py-24 relative border-t border-gray-800/60 bg-[#0c111d]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Featured Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Projects Showcase
            </h2>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              Explore dynamic real-world web applications backed by MySQL and REST APIs.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-gray-950 font-semibold shadow-md shadow-emerald-500/20'
                    : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-gray-800 rounded-2xl">
            <p className="text-gray-400 text-sm">No projects found for category "{selectedCategory}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const tagsArray = project.tags
                ? project.tags.split(',').map(t => t.trim()).slice(0, 4)
                : [];

              return (
                <div
                  key={project.id}
                  className="glass-card rounded-2xl overflow-hidden border border-gray-800 hover:border-emerald-500/40 flex flex-col group transition-all"
                >
                  {/* Image container */}
                  <div className="relative h-48 w-full bg-gray-950 overflow-hidden">
                    <img
                      src={project.image_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90" />

                    {/* Category pill */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-gray-900/80 backdrop-blur-md text-emerald-400 border border-gray-700/60">
                        {project.category}
                      </span>
                    </div>

                    {project.featured ? (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] bg-amber-400/90 text-gray-950 font-bold flex items-center gap-1 shadow-md">
                          <Sparkles className="w-2.5 h-2.5" />
                          Featured
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tagsArray.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-gray-900 text-gray-400 border border-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Bottom Link buttons */}
                      <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs">
                        <button
                          onClick={() => setActiveModalProject(project)}
                          className="text-gray-300 hover:text-emerald-400 flex items-center gap-1 font-medium transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>

                        <div className="flex items-center gap-3">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-gray-400 hover:text-white transition-colors"
                              title="Source Code"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium transition-colors"
                              title="Live Demo"
                            >
                              <span>Demo</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Project Details Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
