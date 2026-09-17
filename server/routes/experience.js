import express from 'express';
import { db } from '../config/db.js';

const router = express.Router();

// GET /api/experience - list work and education experiences
router.get('/', async (req, res) => {
  try {
    const experiences = await db.getExperiences();
    res.json({ success: true, count: experiences.length, data: experiences });
  } catch (err) {
    console.error('Error fetching experiences:', err);
    res.status(500).json({ success: false, message: 'Server error fetching experiences', error: err.message });
  }
});

export default router;
