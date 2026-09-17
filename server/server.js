import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { initDatabase, db } from './config/db.js';

import projectsRouter from './routes/projects.js';
import skillsRouter from './routes/skills.js';
import contactRouter from './routes/contact.js';
import experienceRouter from './routes/experience.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, '../client/dist');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API Routes
app.use('/api/projects', projectsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/experience', experienceRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: db.isFallback() ? 'fallback_in_memory' : 'mysql_connected',
    notice: db.isFallback() 
      ? 'Database operating in fallback mode. To connect MySQL, configure server/.env' 
      : 'Connected to MySQL database'
  });
});

// Root API info
app.get('/api', (req, res) => {
  res.json({
    name: 'Personal Portfolio API',
    version: '1.0.0',
    endpoints: [
      '/api/health',
      '/api/projects',
      '/api/skills',
      '/api/experience',
      '/api/contact'
    ]
  });
});

// Serve frontend static production files if client/dist exists
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // 404 handler for API routes
  app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

// Startup
async function startServer() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`[Server] Portfolio backend is running at http://localhost:${PORT}`);
    console.log(`[Server] API Health check available at http://localhost:${PORT}/api/health`);
    if (fs.existsSync(clientDistPath)) {
      console.log(`[Server] Serving production frontend at http://localhost:${PORT}`);
    }
  });
}

startServer();
