import { useQuery } from '@tanstack/react-query';
import * as hubApi from '../../lib/hubApi';
import { AlertTriangle, TrendingUp, Clock, DollarSign, Shield } from 'lucide-react';

export default function Today() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['hub-today'],
    queryFn: hubApi.getToday,
    refetchInterval: 30000
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error loading Hub data: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Alerts */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wide">
          🚨 Needs Attention
        </h2>
        {!data?.alerts?.length ? (
          <div className="bg-white rounded-xl border p-8 text-center text-slate-500">
            ✅ All clear! No alerts right now.
          </div>
        ) : (
          <div className="space-y-3">
            {data.alerts.map(alert => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        )}
      </section>

      {/* Moves */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wide">
          ✅ Recommended Moves
        </h2>
        {!data?.moves?.length ? (
          <div className="bg-white rounded-xl border p-8 text-center text-slate-500">
            No recommendations right now.
          </div>
        ) : (
          <div className="space-y-3">
            {data.moves.map(move => (
              <MoveCard key={move.id} move={move} />
            ))}
          </div>
        )}
      </section>

      {/* Autopilot Log */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wide">
          📋 What Autopilot Did (Last 24h)
        </h2>
        {!data?.autopilotLog?.length ? (
          <div className="bg-white rounded-xl border p-8 text-center text-slate-500">
            No autonomous actions yet.
          </div>
        ) : (
          <div className="space-y-3">
            {data.autopilotLog.map(log => (
              <LogCard key={log.id} log={log} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// Alert Card Component
function AlertCard({ alert }) {
  const severityColors = {
    critical: 'border-red-500 bg-red-50',
    high: 'border-orange-500 bg-orange-50',
    medium: 'border-yellow-500 bg-yellow-50',
    low: 'border-blue-500 bg-blue-50'
  };

  return (
    <div className={`bg-white rounded-xl border-2 p-4 ${severityColors[alert.severity] || 'border-slate-200'}`}>\n      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-bold text-slate-900">{alert.title}</h3>
          </div>
          
          <p className="text-sm text-slate-600 mb-3">{alert.one_line_why}</p>
          
          <div className="flex gap-4 text-xs text-slate-500">
            {alert.money_impact && (
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span>${Math.abs(alert.money_impact)}</span>
              </div>
            )}
            {alert.confidence && (
              <div>Confidence: {alert.confidence}%</div>
            )}
            {alert.deadline && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{new Date(alert.deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Move Card Component
function MoveCard({ move }) {
  const riskColors = {
    low: 'text-green-600 bg-green-50',
    medium: 'text-yellow-600 bg-yellow-50',
    high: 'text-red-600 bg-red-50'
  };

  return (
    <div className="bg-white rounded-xl border p-4 hover:border-blue-500 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-slate-900">{move.title}</h3>
          </div>
          
          {move.one_line_why && (
            <p className="text-sm text-slate-600 mb-2">{move.one_line_why}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3 mb-4 text-xs">
        {move.expected_impact && (
          <div className="font-semibold text-green-600">
            {move.expected_impact}
          </div>
        )}
        {move.confidence && (
          <div className="text-slate-600">Confidence: {move.confidence}%</div>
        )}
        {move.risk && (
          <div className={`px-2 py-1 rounded ${riskColors[move.risk] || 'bg-slate-100'}`}>\n            <Shield className="w-3 h-3 inline mr-1" />
            {move.risk} risk
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
          Approve
        </button>
        <button className="px-4 py-2 border text-sm rounded-lg hover:bg-slate-50">
          Reject
        </button>
        <button className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900">
          Customize
        </button>
      </div>
    </div>
  );
}

// Log Card Component
function LogCard({ log }) {
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500">{timeAgo(log.created_at)}</span>
          </div>
          
          <p className="font-semibold text-slate-900 mb-1">{log.action}</p>
          <p className="text-sm text-slate-600">{log.one_line_why}</p>
          
          {log.money_impact && (
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <DollarSign className="w-3 h-3" />
              <span>{log.money_impact}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}