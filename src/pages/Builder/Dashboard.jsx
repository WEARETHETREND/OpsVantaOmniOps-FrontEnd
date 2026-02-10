import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { PlusIcon, GlobeIcon, SparklesIcon } from 'lucide-react';
import NewProjectModal from '../../components/Builder/NewProjectModal';

export default function BuilderDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewProject, setShowNewProject] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await api.fetch('/api/builder/projects');
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🚀 AI Website Builder
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Create stunning websites with AI in minutes
              </p>
            </div>
            
            <button
              onClick={() => setShowNewProject(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <SparklesIcon size={20} />
              Generate with AI
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <EmptyState onCreateClick={() => setShowNewProject(true)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} navigate={navigate} />
            ))}
          </div>
        )}
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <NewProjectModal
          onClose={() => setShowNewProject(false)}
          onSuccess={loadProjects}
        />
      )}
    </div>
  );
}

function EmptyState({ onCreateClick }) {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
        <SparklesIcon size={32} className="text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No projects yet
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Get started by generating your first website with AI. Just describe what you want!
      </p>
      <button
        onClick={onCreateClick}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <SparklesIcon size={20} />
        Generate Your First Website
      </button>
    </div>
  );
}

function ProjectCard({ project, navigate }) {
  const statusColors = {
    draft: 'bg-yellow-100 text-yellow-800',
    published: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      {/* Preview Image */}
      <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg relative">
        {project.ai_generated && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-medium flex items-center gap-1">
            <SparklesIcon size={12} />
            AI Generated
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">
            {project.name}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
            {project.status}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {project.description || 'No description'}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span>{project.page_count || 0} pages</span>
          {project.domain_name && (
            <span className="flex items-center gap-1">
              <GlobeIcon size={14} />
              {project.domain_name}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/builder/editor/${project.id}`)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
          {project.status === 'published' && (
            <button
              onClick={() => window.open(project.published_url, '_blank')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              View
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
