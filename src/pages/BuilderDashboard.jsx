import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Sparkles, FileText, Globe, Archive } from 'lucide-react';
import { getProjects } from '../api/omniops';
import ProjectCard from '../components/ProjectCard';
import NewProjectModal from '../components/NewProjectModal';
import { useNavigate } from 'react-router-dom';

export default function BuilderDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      console.error('Failed to load projects:', err);
      // Use mock data for demo if API fails
      setProjects([
        {
          id: 1,
          name: 'My Portfolio',
          description: 'Personal portfolio showcasing my work',
          status: 'published',
          pageCount: 5,
          domain: 'myportfolio.com',
          isAiGenerated: true,
          qualityScore: 92,
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          name: 'E-commerce Store',
          description: 'Online store for fashion products',
          status: 'draft',
          pageCount: 12,
          isAiGenerated: true,
          qualityScore: 85,
          updatedAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewProject = (project) => {
    setShowNewProjectModal(false);
    loadProjects();
    // Navigate to editor
    if (project?.id) {
      navigate(`/builder/editor/${project.id}`);
    }
  };

  const handleEditProject = (project) => {
    navigate(`/builder/editor/${project.id}`);
  };

  const handleViewProject = (project) => {
    if (project.domain) {
      window.open(`https://${project.domain}`, '_blank');
    } else {
      navigate(`/builder/preview/${project.id}`);
    }
  };

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const stats = {
    total: projects.length,
    published: projects.filter(p => p.status === 'published').length,
    aiGenerated: projects.filter(p => p.isAiGenerated).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Website Builder</h1>
              <p className="text-white/90 text-lg">Create stunning websites with AI in seconds</p>
            </div>
            
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              Generate with AI
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-lg">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{stats.total}</div>
                  <div className="text-white/80 text-sm">Total Projects</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{stats.published}</div>
                  <div className="text-white/80 text-sm">Published</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{stats.aiGenerated}</div>
                  <div className="text-white/80 text-sm">AI Generated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              All
            </button>
            
            <button
              onClick={() => setFilterStatus('published')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filterStatus === 'published'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Published
            </button>
            
            <button
              onClick={() => setFilterStatus('draft')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filterStatus === 'draft'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Draft
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
              {searchQuery ? (
                <Search className="w-10 h-10 text-blue-600" />
              ) : (
                <Plus className="w-10 h-10 text-blue-600" />
              )}
            </div>
            
            {searchQuery ? (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-6">Create your first website with AI</p>
                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate with AI
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onView={handleViewProject}
              />
            ))}
          </div>
        )}
      </div>

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
        onSuccess={handleNewProject}
      />
    </div>
  );
}
