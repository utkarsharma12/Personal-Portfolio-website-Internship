import express from 'express';
import { db } from '../config/db.js';

const router = express.Router();

// POST /api/contact - submit a contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required fields' });
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    const saved = await db.createContact({ name, email, subject, message });
    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been sent successfully.',
      data: saved
    });
  } catch (err) {
    console.error('Error submitting contact form:', err);
    res.status(500).json({ success: false, message: 'Server error sending message', error: err.message });
  }
});

// GET /api/contact - view received messages (admin)
router.get('/', async (req, res) => {
  try {
    const messages = await db.getContacts();
    res.json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ success: false, message: 'Server error fetching contact messages', error: err.message });
  }
});

// DELETE /api/contact/:id - delete message
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await db.deleteContact(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ success: false, message: 'Server error deleting message', error: err.message });
  }
});

export default router;
