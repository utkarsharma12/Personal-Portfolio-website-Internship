import express from 'express';
import { db } from '../config/db.js';

const router = express.Router();

// GET /api/skills - list all skills
router.get('/', async (req, res) => {
  try {
    const skills = await db.getSkills();
    
    // Also group them by category for convenience
    const grouped = skills.reduce((acc, skill) => {
      const cat = skill.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {});

    res.json({ success: true, count: skills.length, data: skills, grouped });
  } catch (err) {
    console.error('Error fetching skills:', err);
    res.status(500).json({ success: false, message: 'Server error fetching skills', error: err.message });
  }
});

// POST /api/skills - add skill
router.post('/', async (req, res) => {
  try {
    const { name, category, level, icon } = req.body;
    if (!name || !category) {
      return res.status(400).json({ success: false, message: 'Name and category are required' });
    }
    const created = await db.createSkill({
      name,
      category,
      level: level || 'Intermediate',
      icon: icon || 'Code'
    });
    res.status(201).json({ success: true, message: 'Skill added successfully', data: created });
  } catch (err) {
    console.error('Error adding skill:', err);
    res.status(500).json({ success: false, message: 'Server error adding skill', error: err.message });
  }
});

// DELETE /api/skills/:id - delete skill
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await db.deleteSkill(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (err) {
    console.error('Error deleting skill:', err);
    res.status(500).json({ success: false, message: 'Server error deleting skill', error: err.message });
  }
});

export default router;
