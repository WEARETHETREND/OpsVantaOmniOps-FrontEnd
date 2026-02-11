// Playbook Card Component
import { Play, ToggleLeft, ToggleRight, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function PlaybookCard({ playbook, onExecute, onToggle }) {
  const statusColor = playbook.enabled ? 'text-green-600' : 'text-slate-400';
  const StatusIcon = playbook.enabled ? ToggleRight : ToggleLeft;
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-slate-900">{playbook.name}</h3>
            <button
              onClick={() => onToggle?.(playbook.id)}
              className={`${statusColor} hover:opacity-80 transition-opacity`}
              title={playbook.enabled ? 'Disable playbook' : 'Enable playbook'}
            >
              <StatusIcon className="w-6 h-6" />
            </button>
          </div>
          <p className="text-sm text-slate-600 mb-3">{playbook.description}</p>
        </div>
      </div>
      
      {/* Trigger info */}
      <div className="flex items-center gap-4 mb-4 text-xs text-slate-600">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span className="capitalize">{playbook.trigger_type}</span>
        </div>
        
        {playbook.execution_count > 0 && (
          <>
            <div>Executed {playbook.execution_count}x</div>
            <div className="flex items-center gap-1">
              {playbook.success_rate >= 90 ? (
                <CheckCircle className="w-3 h-3 text-green-600" />
              ) : playbook.success_rate >= 70 ? (
                <CheckCircle className="w-3 h-3 text-yellow-600" />
              ) : (
                <XCircle className="w-3 h-3 text-red-600" />
              )}
              <span>{playbook.success_rate}% success</span>
            </div>
          </>
        )}
      </div>
      
      {/* Action steps preview */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-slate-500 mb-2 uppercase">Steps</div>
        <div className="space-y-1">
          {playbook.actions.slice(0, 3).map((action) => (
            <div key={action.step} className="text-xs text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 font-mono">{action.step}.</span>
              <span>{action.action}</span>
            </div>
          ))}
          {playbook.actions.length > 3 && (
            <div className="text-xs text-slate-400">
              +{playbook.actions.length - 3} more steps
            </div>
          )}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onExecute?.(playbook.id)}
          disabled={!playbook.enabled}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            playbook.enabled
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Play className="w-4 h-4" />
          Execute Now
        </button>
        
        <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          View Details
        </button>
      </div>
      
      {/* Last execution */}
      {playbook.last_execution && (
        <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
          Last executed {new Date(playbook.last_execution).toLocaleDateString()} • 
          Avg time: {playbook.avg_execution_time}
        </div>
      )}
    </div>
  );
}
