/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 * 
 * © 2026 WEARETHETREND / OpsVanta LLC
 * ALL RIGHTS RESERVED
 * 
 * UNAUTHORIZED USE PROHIBITED
 * 
 * This file contains trade secrets. Violators will be prosecuted.
 * See COPYRIGHT.md for terms.
 */

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
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      {/* Preview Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <FileText className="h-16 w-16 text-gray-300" />
          </div>
        )}

        {/* AI Badge */}
        {project.isAiGenerated && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-purple-500 px-2.5 py-1 text-xs font-semibold text-white shadow-lg">
            <Sparkles className="h-3.5 w-3.5" />
            AI
          </div>
        )}

        {/* Status Badge */}
        <div
          className={`absolute top-3 left-3 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusColor(project.status)}`}
        >
          {project.status || 'draft'}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={() => onView && onView(project)}
            className="rounded-lg bg-white p-3 transition-colors hover:bg-gray-100"
            title="View"
          >
            <Eye className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={() => onEdit && onEdit(project)}
            className="rounded-lg bg-white p-3 transition-colors hover:bg-gray-100"
            title="Edit"
          >
            <Edit className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        {/* Title */}
        <h3 className="truncate text-lg font-bold text-gray-900">{project.name}</h3>

        {/* Description */}
        {project.description && (
          <p className="line-clamp-2 text-sm text-gray-600">{project.description}</p>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>
              {project.pageCount || 1} page{project.pageCount !== 1 ? 's' : ''}
            </span>
          </div>

          {project.domain && (
            <div className="flex items-center gap-1 text-blue-600">
              <Globe className="h-4 w-4" />
              <span className="max-w-[120px] truncate">{project.domain}</span>
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
          Updated{' '}
          {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : 'recently'}
        </div>
      </div>
    </div>
  );
}
