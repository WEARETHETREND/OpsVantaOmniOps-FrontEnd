/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 * 
 * © 2026 OpsVanta LLC
 * ALL RIGHTS RESERVED
 * 
 * UNAUTHORIZED ACCESS, USE, OR DISTRIBUTION PROHIBITED
 * 
 * This file contains trade secrets and confidential information.
 * Violators will be prosecuted under trade secret law.
 * 
 * For licensing: contact@opsvanta.com
 */


import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Sparkles, FileText, Globe, Archive } from 'lucide-react';
import { getProjects } from '../api/opsvanta';
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
      // Show empty state instead of fake data
      setProjects([]);
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
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const stats = {
    total: projects.length,
    published: projects.filter((p) => p.status === 'published').length,
    aiGenerated: projects.filter((p) => p.isAiGenerated).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="bg-grid-pattern absolute inset-0 opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold">OpsVanta Website Builder</h1>
              <p className="text-lg text-white/90">Create stunning websites with AI - Powered by OpsVanta</p>
            </div>

            <button
              onClick={() => setShowNewProjectModal(true)}
              className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 shadow-lg transition-colors hover:bg-blue-50"
            >
              <Sparkles className="h-5 w-5" />
              Generate with AI
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/20 p-3">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{stats.total}</div>
                  <div className="text-sm text-white/80">Total Projects</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/20 p-3">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{stats.published}</div>
                  <div className="text-sm text-white/80">Published</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/20 p-3">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{stats.aiGenerated}</div>
                  <div className="text-sm text-white/80">AI Generated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`flex items-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-4 w-4" />
              All
            </button>

            <button
              onClick={() => setFilterStatus('published')}
              className={`rounded-lg px-4 py-3 font-medium transition-colors ${
                filterStatus === 'published'
                  ? 'bg-green-600 text-white'
                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Published
            </button>

            <button
              onClick={() => setFilterStatus('draft')}
              className={`rounded-lg px-4 py-3 font-medium transition-colors ${
                filterStatus === 'draft'
                  ? 'bg-yellow-600 text-white'
                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Draft
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="py-12 text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              {searchQuery ? (
                <Search className="h-10 w-10 text-blue-600" />
              ) : (
                <Plus className="h-10 w-10 text-blue-600" />
              )}
            </div>

            {searchQuery ? (
              <>
                <h3 className="mb-2 text-xl font-bold text-gray-900">No projects found</h3>
                <p className="mb-6 text-gray-600">Try adjusting your search or filters</p>
              </>
            ) : (
              <>
                <h3 className="mb-2 text-xl font-bold text-gray-900">No projects yet</h3>
                <p className="mb-6 text-gray-600">Create your first website with AI</p>
                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  <Sparkles className="h-5 w-5" />
                  Generate with AI
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
