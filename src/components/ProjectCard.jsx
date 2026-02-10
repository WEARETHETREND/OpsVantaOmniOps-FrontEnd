import { Eye, Edit, Globe, FileText, Sparkles } from 'lucide-react';
import QualityBadge from './QualityBadge';

export default function ProjectCard({ project, onEdit, onView }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Preview Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
        {project.thumbnail ? (
          <img 
            src={project.thumbnail} 
            alt={project.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <FileText className="w-16 h-16 text-gray-300" />
          </div>
        )}
        
        {/* AI Badge */}
        {project.isAiGenerated && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500 text-white text-xs font-semibold shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            AI
          </div>
        )}

        {/* Status Badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full border text-xs font-semibold ${getStatusColor(project.status)}`}>
          {project.status || 'draft'}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onView && onView(project)}
            className="p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            title="View"
          >
            <Eye className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => onEdit && onEdit(project)}
            className="p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            title="Edit"
          >
            <Edit className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 truncate">
          {project.name}
        </h3>

        {/* Description */}
        {project.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>{project.pageCount || 1} page{project.pageCount !== 1 ? 's' : ''}</span>
          </div>
          
          {project.domain && (
            <div className="flex items-center gap-1 text-blue-600">
              <Globe className="w-4 h-4" />
              <span className="truncate max-w-[120px]">{project.domain}</span>
            </div>
          )}
        </div>

        {/* Quality Score */}
        {project.qualityScore && (
          <div className="pt-2">
            <QualityBadge score={project.qualityScore} />
          </div>
        )}

        {/* Updated Date */}
        <div className="pt-2 text-xs text-gray-400">
          Updated {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : 'recently'}
        </div>
      </div>
    </div>
  );
}
