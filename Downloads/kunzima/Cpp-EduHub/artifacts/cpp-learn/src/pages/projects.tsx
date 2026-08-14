/**
 * Infinity Code - Projects Hub
 * Browse, create, and manage real-world projects
 */

import { useState } from 'react';

const categories = ['All', 'Web Development', 'Mobile', 'AI', 'Data Science', 'APIs', 'Games', 'Tools', 'Portfolio'];

const projects = [
  { id: 1, title: 'Portfolio Website', category: 'Portfolio', status: 'Published', tech: ['React', 'TypeScript', 'Tailwind'], description: 'A personal developer portfolio with dark theme and project showcase.', author: 'Phumeh', stars: 12 },
  { id: 2, title: 'Task Manager API', category: 'APIs', status: 'In Progress', tech: ['Node.js', 'Express', 'PostgreSQL'], description: 'RESTful API for managing tasks with JWT authentication.', author: 'JaneDoe', stars: 8 },
  { id: 3, title: 'Weather Dashboard', category: 'Web Development', status: 'Published', tech: ['React', 'OpenWeather API', 'CSS'], description: 'Real-time weather dashboard with city search and forecasts.', author: 'CodeMaster', stars: 24 },
  { id: 4, title: 'AI Chat Bot', category: 'AI', status: 'In Progress', tech: ['Python', 'TensorFlow', 'Flask'], description: 'An AI-powered chatbot using natural language processing.', author: 'MLDev', stars: 45 },
  { id: 5, title: 'Snake Game', category: 'Games', status: 'Published', tech: ['JavaScript', 'Canvas', 'HTML5'], description: 'Classic snake game with score tracking and leaderboards.', author: 'GameDev', stars: 31 },
  { id: 6, title: 'Code Snippet Manager', category: 'Tools', status: 'Published', tech: ['React', 'TypeScript', 'IndexedDB'], description: 'Save, organize, and search code snippets with syntax highlighting.', author: 'Phumeh', stars: 19 },
  { id: 7, title: 'Expense Tracker', category: 'Mobile', status: 'In Progress', tech: ['React Native', 'Expo', 'SQLite'], description: 'Cross-platform mobile app for tracking daily expenses.', author: 'MobileDev', stars: 7 },
  { id: 8, title: 'Data Visualisation Dashboard', category: 'Data Science', status: 'Published', tech: ['Python', 'Pandas', 'D3.js'], description: 'Interactive dashboard for visualising sales data trends.', author: 'DataSci', stars: 28 },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showCreate, setShowCreate] = useState(false);

  const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);

  const statusColor = (s: string) => s === 'Published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400';

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Projects Hub</h1>
            <p className="text-gray-400">Build, showcase, and explore real-world projects.</p>
          </div>
          <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-lg font-medium hover:opacity-90 transition">+ New Project</button>
        </div>

        {showCreate && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Create New Project</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Project name" className="bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" />
              <select className="bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff]">
                {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input type="text" placeholder="Technologies (comma separated)" className="bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] md:col-span-2" />
              <textarea placeholder="Project description" rows={3} className="bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] md:col-span-2" />
              <input type="text" placeholder="GitHub repository URL" className="bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" />
              <input type="text" placeholder="Live demo URL" className="bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" />
            </div>
            <div className="flex gap-3 mt-4">
              <button className="px-6 py-2 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-lg font-medium hover:opacity-90 transition">Create Project</button>
              <button onClick={() => setShowCreate(false)} className="px-6 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg font-medium hover:bg-white/10 transition">Cancel</button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 text-sm rounded-lg transition ${activeCategory === cat ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}>{cat}</button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div key={project.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition group">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor(project.status)}`}>{project.status}</span>
                <span className="text-xs text-gray-500">⭐ {project.stars}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00d4ff] transition">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-300">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-gray-500">by {project.author}</span>
                <span className="text-xs text-[#00d4ff]">{project.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}