import express from 'express';
import { db } from '../config/db.js';

const router = express.Router();

// GET /api/projects - list all projects (optional ?category=filter)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const projects = await db.getProjects(category);
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ success: false, message: 'Server error fetching projects', error: err.message });
  }
});

// GET /api/projects/:id - single project
router.get('/:id', async (req, res) => {
  try {
    const project = await db.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ success: false, message: 'Server error fetching project', error: err.message });
  }
});

// POST /api/projects - add project
router.post('/', async (req, res) => {
  try {
    const { title, description, category, image_url, tags, live_url, github_url, featured } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }
    const created = await db.createProject({
      title,
      description,
      category: category || 'Full Stack',
      image_url: image_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      tags: tags || 'React, Node.js',
      live_url: live_url || '',
      github_url: github_url || '',
      featured: featured ? 1 : 0
    });
    res.status(201).json({ success: true, message: 'Project created successfully', data: created });
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ success: false, message: 'Server error creating project', error: err.message });
  }
});

// PUT /api/projects/:id - update project
router.put('/:id', async (req, res) => {
  try {
    const existing = await db.getProjectById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    const updated = await db.updateProject(req.params.id, {
      title: req.body.title || existing.title,
      description: req.body.description || existing.description,
      category: req.body.category || existing.category,
      image_url: req.body.image_url ?? existing.image_url,
      tags: req.body.tags ?? existing.tags,
      live_url: req.body.live_url ?? existing.live_url,
      github_url: req.body.github_url ?? existing.github_url,
      featured: req.body.featured !== undefined ? (req.body.featured ? 1 : 0) : existing.featured
    });
    res.json({ success: true, message: 'Project updated successfully', data: updated });
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ success: false, message: 'Server error updating project', error: err.message });
  }
});

// DELETE /api/projects/:id - delete project
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await db.deleteProject(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ success: false, message: 'Server error deleting project', error: err.message });
  }
});

export default router;
