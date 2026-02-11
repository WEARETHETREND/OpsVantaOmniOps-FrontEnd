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
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🚀 AI Website Builder</h1>
              <p className="mt-1 text-sm text-gray-600">
                Create stunning websites with AI in minutes
              </p>
            </div>

            <button
              onClick={() => setShowNewProject(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <SparklesIcon size={20} />
              Generate with AI
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {loading ? (
          <div className="py-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <EmptyState onCreateClick={() => setShowNewProject(true)} />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} navigate={navigate} />
            ))}
          </div>
        )}
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <NewProjectModal onClose={() => setShowNewProject(false)} onSuccess={loadProjects} />
      )}
    </div>
  );
}

function EmptyState({ onCreateClick }) {
  return (
    <div className="py-16 text-center">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
        <SparklesIcon size={32} className="text-blue-600" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900">No projects yet</h3>
      <p className="mx-auto mb-6 max-w-md text-gray-600">
        Get started by generating your first website with AI. Just describe what you want!
      </p>
      <button
        onClick={onCreateClick}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
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
    archived: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Preview Image */}
      <div className="relative aspect-video rounded-t-lg bg-gradient-to-br from-blue-500 to-purple-600">
        {project.ai_generated && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium backdrop-blur">
            <SparklesIcon size={12} />
            AI Generated
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[project.status]}`}
          >
            {project.status}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {project.description || 'No description'}
        </p>

        <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
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
            className="flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Edit
          </button>
          {project.status === 'published' && (
            <button
              onClick={() => window.open(project.published_url, '_blank')}
              className="rounded bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              View
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
