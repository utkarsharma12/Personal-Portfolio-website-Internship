import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Trash2, Edit2, Shield, Lock, Unlock, Check, AlertCircle, 
  Layers, Code2, Mail, RefreshCw, ExternalLink 
} from 'lucide-react';
import api from '../services/api';

export default function AdminModal({ isOpen, onClose, onDataChanged }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'skills' | 'messages'

  // Projects state
  const [projectsList, setProjectsList] = useState([]);
  const [projectForm, setProjectForm] = useState({
    id: null,
    title: '',
    description: '',
    category: 'Full Stack',
    image_url: '',
    tags: '',
    live_url: '',
    github_url: '',
    featured: false
  });
  const [isEditingProject, setIsEditingProject] = useState(false);

  // Skills state
  const [skillsList, setSkillsList] = useState([]);
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Frontend',
    level: 'Advanced',
    icon: 'Code2'
  });

  // Messages state
  const [messagesList, setMessagesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadAllData();
    }
  }, [isOpen, isAuthenticated]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [projRes, skillRes, msgRes] = await Promise.all([
        api.getProjects(),
        api.getSkills(),
        api.getContacts()
      ]);
      setProjectsList(projRes.data || []);
      setSkillsList(skillRes.data || []);
      setMessagesList(msgRes.data || []);
    } catch (err) {
      setFeedback({ type: 'error', text: 'Error loading database records: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Default passcode is: admin123');
    }
  };

  // Projects handlers
  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEditingProject && projectForm.id) {
        await api.updateProject(projectForm.id, projectForm);
        setFeedback({ type: 'success', text: 'Project updated in MySQL!' });
      } else {
        await api.createProject(projectForm);
        setFeedback({ type: 'success', text: 'New project inserted into MySQL!' });
      }
      resetProjectForm();
      await loadAllData();
      if (onDataChanged) onDataChanged();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (proj) => {
    setProjectForm({
      id: proj.id,
      title: proj.title || '',
      description: proj.description || '',
      category: proj.category || 'Full Stack',
      image_url: proj.image_url || '',
      tags: proj.tags || '',
      live_url: proj.live_url || '',
      github_url: proj.github_url || '',
      featured: Boolean(proj.featured)
    });
    setIsEditingProject(true);
  };

  const resetProjectForm = () => {
    setProjectForm({
      id: null,
      title: '',
      description: '',
      category: 'Full Stack',
      image_url: '',
      tags: '',
      live_url: '',
      github_url: '',
      featured: false
    });
    setIsEditingProject(false);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project from database?')) return;
    try {
      setLoading(true);
      await api.deleteProject(id);
      setFeedback({ type: 'success', text: 'Project deleted.' });
      await loadAllData();
      if (onDataChanged) onDataChanged();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Skills handlers
  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!skillForm.name) return;
    try {
      setLoading(true);
      await api.createSkill(skillForm);
      setFeedback({ type: 'success', text: 'Skill added to database!' });
      setSkillForm({ name: '', category: 'Frontend', level: 'Advanced', icon: 'Code2' });
      await loadAllData();
      if (onDataChanged) onDataChanged();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      setLoading(true);
      await api.deleteSkill(id);
      setFeedback({ type: 'success', text: 'Skill removed from database.' });
      await loadAllData();
      if (onDataChanged) onDataChanged();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Messages handler
  const handleDeleteMessage = async (id) => {
    try {
      setLoading(true);
      await api.deleteContact(id);
      setFeedback({ type: 'success', text: 'Message deleted.' });
      await loadAllData();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Portfolio Content Management (CMS)</h3>
              <p className="text-[11px] font-mono text-gray-400">Direct Database Management & Live Inquiries</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback.text && (
          <div className={`px-6 py-2.5 text-xs flex items-center justify-between ${
            feedback.type === 'error' ? 'bg-rose-950/50 text-rose-300 border-b border-rose-800/40' : 'bg-emerald-950/50 text-emerald-300 border-b border-emerald-800/40'
          }`}>
            <span>{feedback.text}</span>
            <button onClick={() => setFeedback({ type: '', text: '' })} className="hover:underline">Dismiss</button>
          </div>
        )}

        {/* Auth Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center text-center justify-center space-y-5 my-auto">
            <div className="w-14 h-14 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-emerald-400 shadow-xl">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Admin Authentication</h4>
              <p className="text-xs text-gray-400 mt-1 max-w-sm">
                Enter your admin credentials to manage projects, tech stack, and read contact submissions.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
              <input
                type="password"
                placeholder="Enter passcode (default: admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-sm text-white focus:outline-none focus:border-emerald-500 text-center font-mono"
                autoFocus
              />
              {authError && <p className="text-rose-400 text-xs">{authError}</p>}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs shadow-md transition-colors"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Main Dashboard Content */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs */}
            <div className="flex items-center justify-between border-b border-gray-800 px-6 bg-gray-950/30">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`py-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
                    activeTab === 'projects'
                      ? 'border-emerald-400 text-emerald-400'
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Projects ({projectsList.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('skills')}
                  className={`py-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
                    activeTab === 'skills'
                      ? 'border-emerald-400 text-emerald-400'
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  <span>Skills ({skillsList.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('messages')}
                  className={`py-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
                    activeTab === 'messages'
                      ? 'border-emerald-400 text-emerald-400'
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Inquiries ({messagesList.length})</span>
                </button>
              </div>

              <button
                onClick={loadAllData}
                disabled={loading}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
                title="Refresh from DB"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Tab Views Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">

              {/* PROJECTS TAB */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Form to Add / Edit */}
                  <div className="p-5 rounded-xl bg-gray-950/60 border border-gray-800">
                    <h4 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
                      <span>{isEditingProject ? 'Edit Project' : 'Add New Project to Database'}</span>
                      {isEditingProject && (
                        <button
                          type="button"
                          onClick={resetProjectForm}
                          className="text-xs text-gray-400 hover:text-white underline"
                        >
                          Cancel Editing
                        </button>
                      )}
                    </h4>

                    <form onSubmit={handleSaveProject} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono text-gray-400 mb-1">Title *</label>
                          <input
                            type="text"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            placeholder="e.g. AI Workflow Platform"
                            required
                            className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-gray-400 mb-1">Category</label>
                          <select
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                          >
                            <option value="Full Stack">Full Stack</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Mobile">Mobile</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-gray-400 mb-1">Description *</label>
                        <textarea
                          rows={3}
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          placeholder="Comprehensive summary of features, architecture, and results..."
                          required
                          className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono text-gray-400 mb-1">Image URL</label>
                          <input
                            type="text"
                            value={projectForm.image_url}
                            onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-gray-400 mb-1">Tags (comma separated)</label>
                          <input
                            type="text"
                            value={projectForm.tags}
                            onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                            placeholder="React, Express, MySQL"
                            className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-gray-400 mb-1">Live URL</label>
                          <input
                            type="text"
                            value={projectForm.live_url}
                            onChange={(e) => setProjectForm({ ...projectForm, live_url: e.target.value })}
                            placeholder="https://example.com"
                            className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={projectForm.featured}
                            onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                            className="rounded bg-gray-900 border-gray-700 text-emerald-500 focus:ring-emerald-500"
                          />
                          <span>Highlight as Featured Project</span>
                        </label>

                        <button
                          type="submit"
                          disabled={loading}
                          className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs transition-colors flex items-center gap-1.5"
                        >
                          {isEditingProject ? <Edit2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          <span>{isEditingProject ? 'Update Project' : 'Save to Database'}</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* List of current projects */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-mono uppercase text-gray-400">Existing Projects in DB</h5>
                    <div className="space-y-2">
                      {projectsList.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-gray-950/40 border border-gray-800 hover:border-gray-700 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&auto=format&fit=crop&q=80'}
                              alt=""
                              className="w-12 h-10 object-cover rounded-lg bg-gray-800"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">{p.title}</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-emerald-400">
                                  {p.category}
                                </span>
                                {p.featured ? (
                                  <span className="text-[10px] text-amber-400 font-medium">★ Featured</span>
                                ) : null}
                              </div>
                              <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{p.tags}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditClick(p)}
                              className="p-1.5 text-gray-400 hover:text-emerald-400 rounded-md hover:bg-gray-800 transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              className="p-1.5 text-gray-400 hover:text-rose-400 rounded-md hover:bg-gray-800 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SKILLS TAB */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  {/* Add skill form */}
                  <form onSubmit={handleAddSkill} className="p-4 rounded-xl bg-gray-950/60 border border-gray-800 flex flex-wrap gap-3 items-end">
                    <div className="flex-1 min-w-[150px]">
                      <label className="block text-[11px] font-mono text-gray-400 mb-1">Skill Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Next.js, Redis, AWS"
                        value={skillForm.name}
                        onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="w-36">
                      <label className="block text-[11px] font-mono text-gray-400 mb-1">Category</label>
                      <select
                        value={skillForm.category}
                        onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="Tools">Tools</option>
                      </select>
                    </div>

                    <div className="w-32">
                      <label className="block text-[11px] font-mono text-gray-400 mb-1">Level</label>
                      <select
                        value={skillForm.level}
                        onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Skill</span>
                    </button>
                  </form>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {skillsList.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-gray-950/40 border border-gray-800"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white">{s.name}</div>
                          <div className="text-[10px] font-mono text-gray-400">{s.category} • {s.level}</div>
                        </div>
                        <button
                          onClick={() => handleDeleteSkill(s.id)}
                          className="text-gray-500 hover:text-rose-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MESSAGES TAB */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  {messagesList.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-gray-800 rounded-xl">
                      <p className="text-gray-400 text-xs">No contact form submissions recorded in the database yet.</p>
                    </div>
                  ) : (
                    messagesList.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 rounded-xl bg-gray-950/50 border border-gray-800 space-y-2 hover:border-gray-700 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{msg.name}</span>
                            <span className="text-xs text-emerald-400 font-mono">&lt;{msg.email}&gt;</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-gray-500">
                              {new Date(msg.created_at).toLocaleString()}
                            </span>
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="text-gray-500 hover:text-rose-400 p-1"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {msg.subject && (
                          <div className="text-xs font-medium text-teal-300">
                            Subject: {msg.subject}
                          </div>
                        )}

                        <p className="text-xs text-gray-300 whitespace-pre-wrap leading-relaxed bg-gray-900/60 p-3 rounded-lg border border-gray-800/60">
                          {msg.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
