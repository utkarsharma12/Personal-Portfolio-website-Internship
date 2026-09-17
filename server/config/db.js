import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { defaultProjects, defaultSkills, defaultExperiences } from '../scripts/seedData.js';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'portfolio_db';

let pool = null;
let isUsingFallback = false;

// Fallback in-memory / state store in case MySQL credentials are not yet set
const inMemoryStore = {
  projects: [...defaultProjects.map((p, idx) => ({ id: idx + 1, ...p, created_at: new Date() }))],
  skills: [...defaultSkills.map((s, idx) => ({ id: idx + 1, ...s, created_at: new Date() }))],
  experiences: [...defaultExperiences.map((e, idx) => ({ id: idx + 1, ...e, created_at: new Date() }))],
  contacts: []
};
let nextId = {
  projects: inMemoryStore.projects.length + 1,
  skills: inMemoryStore.skills.length + 1,
  experiences: inMemoryStore.experiences.length + 1,
  contacts: 1
};

export async function initDatabase() {
  try {
    console.log(`[Database] Attempting to connect to MySQL at ${DB_HOST}:${DB_PORT} as ${DB_USER}...`);
    
    // Connect to MySQL server first (no DB specified) to ensure database exists
    const rootConnection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD
    });

    await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await rootConnection.end();

    // Create pool for portfolio_db
    pool = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test connection
    const testConn = await pool.getConnection();
    console.log(`[Database] Successfully connected to MySQL database: '${DB_NAME}'`);
    testConn.release();

    // Create tables
    await createTables();

    // Seed tables if empty
    await seedTablesIfEmpty();

    isUsingFallback = false;
    return { status: 'connected', type: 'mysql', database: DB_NAME };
  } catch (error) {
    console.warn(`[Database Warning] MySQL connection failed: ${error.message}`);
    console.warn(`[Database Notice] Switching to In-Memory Fallback store. Your API is fully functional.`);
    console.warn(`[Database Notice] To link your local MySQL, set valid DB_PASSWORD in server/.env`);
    isUsingFallback = true;
    return { status: 'fallback', type: 'memory', error: error.message };
  }
}

async function createTables() {
  const queries = [
    `CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(100) DEFAULT 'Full Stack',
      image_url VARCHAR(500),
      tags VARCHAR(255),
      live_url VARCHAR(500),
      github_url VARCHAR(500),
      featured TINYINT(1) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS skills (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      category VARCHAR(100) NOT NULL,
      level VARCHAR(50) DEFAULT 'Intermediate',
      icon VARCHAR(100) DEFAULT 'Code',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS experiences (
      id INT AUTO_INCREMENT PRIMARY KEY,
      role VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      period VARCHAR(100) NOT NULL,
      description TEXT,
      skills_used VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      message TEXT NOT NULL,
      is_read TINYINT(1) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
  ];

  for (const query of queries) {
    await pool.query(query);
  }
  console.log('[Database] Schema verified / tables ready.');
}

async function seedTablesIfEmpty() {
  // Check projects
  const [projectRows] = await pool.query('SELECT COUNT(*) as count FROM projects');
  if (projectRows[0].count === 0) {
    console.log('[Database] Seeding default projects...');
    for (const p of defaultProjects) {
      await pool.query(
        'INSERT INTO projects (title, description, category, image_url, tags, live_url, github_url, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [p.title, p.description, p.category, p.image_url, p.tags, p.live_url, p.github_url, p.featured]
      );
    }
  }

  // Check skills
  const [skillRows] = await pool.query('SELECT COUNT(*) as count FROM skills');
  if (skillRows[0].count === 0) {
    console.log('[Database] Seeding default skills...');
    for (const s of defaultSkills) {
      await pool.query(
        'INSERT INTO skills (name, category, level, icon) VALUES (?, ?, ?, ?)',
        [s.name, s.category, s.level, s.icon]
      );
    }
  }

  // Check experiences
  const [expRows] = await pool.query('SELECT COUNT(*) as count FROM experiences');
  if (expRows[0].count === 0) {
    console.log('[Database] Seeding default experiences...');
    for (const e of defaultExperiences) {
      await pool.query(
        'INSERT INTO experiences (role, company, period, description, skills_used) VALUES (?, ?, ?, ?, ?)',
        [e.role, e.company, e.period, e.description, e.skills_used]
      );
    }
  }
}

// Universal database executor supporting both MySQL pool and in-memory mock
export const db = {
  isFallback: () => isUsingFallback,
  getPool: () => pool,

  // Projects CRUD
  async getProjects(category) {
    if (!isUsingFallback && pool) {
      if (category && category !== 'All') {
        const [rows] = await pool.query('SELECT * FROM projects WHERE category = ? ORDER BY id DESC', [category]);
        return rows;
      }
      const [rows] = await pool.query('SELECT * FROM projects ORDER BY id DESC');
      return rows;
    }
    let list = inMemoryStore.projects;
    if (category && category !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    return [...list].sort((a, b) => b.id - a.id);
  },

  async getProjectById(id) {
    if (!isUsingFallback && pool) {
      const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
      return rows[0] || null;
    }
    return inMemoryStore.projects.find(p => p.id === Number(id)) || null;
  },

  async createProject(data) {
    const { title, description, category, image_url, tags, live_url, github_url, featured } = data;
    if (!isUsingFallback && pool) {
      const [result] = await pool.query(
        'INSERT INTO projects (title, description, category, image_url, tags, live_url, github_url, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, description, category || 'Full Stack', image_url || '', tags || '', live_url || '', github_url || '', featured ? 1 : 0]
      );
      return { id: result.insertId, ...data };
    }
    const newProject = {
      id: nextId.projects++,
      title,
      description,
      category: category || 'Full Stack',
      image_url: image_url || '',
      tags: tags || '',
      live_url: live_url || '',
      github_url: github_url || '',
      featured: featured ? 1 : 0,
      created_at: new Date()
    };
    inMemoryStore.projects.push(newProject);
    return newProject;
  },

  async updateProject(id, data) {
    const { title, description, category, image_url, tags, live_url, github_url, featured } = data;
    if (!isUsingFallback && pool) {
      await pool.query(
        'UPDATE projects SET title = ?, description = ?, category = ?, image_url = ?, tags = ?, live_url = ?, github_url = ?, featured = ? WHERE id = ?',
        [title, description, category, image_url, tags, live_url, github_url, featured ? 1 : 0, id]
      );
      return { id: Number(id), ...data };
    }
    const idx = inMemoryStore.projects.findIndex(p => p.id === Number(id));
    if (idx !== -1) {
      inMemoryStore.projects[idx] = { ...inMemoryStore.projects[idx], ...data };
      return inMemoryStore.projects[idx];
    }
    return null;
  },

  async deleteProject(id) {
    if (!isUsingFallback && pool) {
      const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [id]);
      return result.affectedRows > 0;
    }
    const initialLen = inMemoryStore.projects.length;
    inMemoryStore.projects = inMemoryStore.projects.filter(p => p.id !== Number(id));
    return inMemoryStore.projects.length < initialLen;
  },

  // Skills CRUD
  async getSkills() {
    if (!isUsingFallback && pool) {
      const [rows] = await pool.query('SELECT * FROM skills ORDER BY id ASC');
      return rows;
    }
    return inMemoryStore.skills;
  },

  async createSkill(data) {
    const { name, category, level, icon } = data;
    if (!isUsingFallback && pool) {
      const [result] = await pool.query(
        'INSERT INTO skills (name, category, level, icon) VALUES (?, ?, ?, ?)',
        [name, category, level || 'Intermediate', icon || 'Code']
      );
      return { id: result.insertId, ...data };
    }
    const newSkill = {
      id: nextId.skills++,
      name,
      category,
      level: level || 'Intermediate',
      icon: icon || 'Code',
      created_at: new Date()
    };
    inMemoryStore.skills.push(newSkill);
    return newSkill;
  },

  async deleteSkill(id) {
    if (!isUsingFallback && pool) {
      const [result] = await pool.query('DELETE FROM skills WHERE id = ?', [id]);
      return result.affectedRows > 0;
    }
    const initialLen = inMemoryStore.skills.length;
    inMemoryStore.skills = inMemoryStore.skills.filter(s => s.id !== Number(id));
    return inMemoryStore.skills.length < initialLen;
  },

  // Experiences
  async getExperiences() {
    if (!isUsingFallback && pool) {
      const [rows] = await pool.query('SELECT * FROM experiences ORDER BY id ASC');
      return rows;
    }
    return inMemoryStore.experiences;
  },

  // Contacts
  async getContacts() {
    if (!isUsingFallback && pool) {
      const [rows] = await pool.query('SELECT * FROM contacts ORDER BY id DESC');
      return rows;
    }
    return [...inMemoryStore.contacts].sort((a, b) => b.id - a.id);
  },

  async createContact(data) {
    const { name, email, subject, message } = data;
    if (!isUsingFallback && pool) {
      const [result] = await pool.query(
        'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [name, email, subject || 'General Inquiry', message]
      );
      return { id: result.insertId, ...data };
    }
    const newContact = {
      id: nextId.contacts++,
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      is_read: 0,
      created_at: new Date()
    };
    inMemoryStore.contacts.push(newContact);
    return newContact;
  },

  async deleteContact(id) {
    if (!isUsingFallback && pool) {
      const [result] = await pool.query('DELETE FROM contacts WHERE id = ?', [id]);
      return result.affectedRows > 0;
    }
    const initialLen = inMemoryStore.contacts.length;
    inMemoryStore.contacts = inMemoryStore.contacts.filter(c => c.id !== Number(id));
    return inMemoryStore.contacts.length < initialLen;
  }
};
