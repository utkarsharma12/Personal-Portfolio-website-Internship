import axios from 'axios';

// When in development with Vite proxy, '/api' proxies to http://localhost:5000/api
// In production or custom setup, it falls back gracefully to window.location or VITE_API_URL
const API_BASE = import.meta.env.VITE_API_URL || '/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor for consistent error messaging
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export const api = {
  // Projects
  async getProjects(category) {
    const params = category && category !== 'All' ? { category } : {};
    return client.get('/projects', { params });
  },
  async getProject(id) {
    return client.get(`/projects/${id}`);
  },
  async createProject(data) {
    return client.post('/projects', data);
  },
  async updateProject(id, data) {
    return client.put(`/projects/${id}`, data);
  },
  async deleteProject(id) {
    return client.delete(`/projects/${id}`);
  },

  // Skills
  async getSkills() {
    return client.get('/skills');
  },
  async createSkill(data) {
    return client.post('/skills', data);
  },
  async deleteSkill(id) {
    return client.delete(`/skills/${id}`);
  },

  // Experience
  async getExperience() {
    return client.get('/experience');
  },

  // Contact
  async sendContact(data) {
    return client.post('/contact', data);
  },
  async getContacts() {
    return client.get('/contact');
  },
  async deleteContact(id) {
    return client.delete(`/contact/${id}`);
  },

  // Health
  async getHealth() {
    return client.get('/health');
  }
};

export default api;
