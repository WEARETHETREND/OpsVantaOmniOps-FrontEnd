// Inbox Card Component
import { AlertTriangle, CheckCircle, XCircle, Edit3 } from 'lucide-react';

const PRIORITY_COLORS = {
  high: 'border-red-200 bg-red-50',
  medium: 'border-yellow-200 bg-yellow-50',
  low: 'border-blue-200 bg-blue-50'
};

const RISK_COLORS = {
  high: 'text-red-600 bg-red-100',
  medium: 'text-yellow-600 bg-yellow-100',
  low: 'text-green-600 bg-green-100'
};

export default function InboxCard({ item, onApprove, onReject, onCustomize }) {
  const priorityClass = PRIORITY_COLORS[item.priority] || 'border-slate-200 bg-white';
  const riskClass = RISK_COLORS[item.risk_level] || 'text-slate-600 bg-slate-100';
  
  const timeAgo = (dateStr) => {
    const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };
  
  return (
    <div className={`rounded-xl border-2 p-6 ${priorityClass}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
          </div>
          <p className="text-sm text-slate-700 mb-2">{item.description}</p>
        </div>
      </div>
      
      {/* Metadata */}
      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        <span className={`px-2 py-1 rounded font-medium ${riskClass}`}>
          {item.risk_level} risk
        </span>
        <span className="px-2 py-1 rounded bg-slate-100 text-slate-600">
          {item.type}
        </span>
        <span className="px-2 py-1 rounded bg-slate-100 text-slate-600">
          {item.product}
        </span>
        {item.priority && (
          <span className={`px-2 py-1 rounded font-medium ${
            item.priority === 'high' ? 'bg-red-200 text-red-800' :
            item.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
            'bg-blue-200 text-blue-800'
          }`}>
            {item.priority} priority
          </span>
        )}
      </div>
      
      {/* Impact */}
      {item.estimated_impact && (
        <div className="mb-4 p-3 bg-white/50 rounded-lg border border-slate-200">
          <div className="text-xs font-semibold text-slate-500 mb-1">Estimated Impact</div>
          <div className="text-sm font-bold text-green-700">{item.estimated_impact}</div>
        </div>
      )}
      
      {/* Required actions */}
      {item.actions_required && item.actions_required.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-500 mb-2">Required Actions</div>
          <ul className="space-y-1">
            {item.actions_required.map((action, idx) => (
              <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Action buttons */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => onApprove?.(item.id)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          Approve
        </button>
        
        <button
          onClick={() => onReject?.(item.id)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          <XCircle className="w-4 h-4" />
          Reject
        </button>
        
        {item.can_customize && (
          <button
            onClick={() => onCustomize?.(item.id)}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-white transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Customize
          </button>
        )}
      </div>
      
      {/* Footer */}
      <div className="pt-3 border-t border-slate-200 text-xs text-slate-500">
        <div className="flex items-center justify-between">
          <span>Requested by {item.requested_by}</span>
          <span>{timeAgo(item.requested_at)}</span>
        </div>
      </div>
    </div>
  );
}
