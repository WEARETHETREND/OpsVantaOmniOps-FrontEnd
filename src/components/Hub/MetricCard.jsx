// Metric Card Component
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricCard({ label, value, change, format = 'number', icon: Icon }) {
  const isPositive = change > 0;
  const isNegative = change < 0;
  
  const formatValue = (val) => {
    if (format === 'currency') {
      return `$${val.toLocaleString()}`;
    }
    if (format === 'percent') {
      return `${val}%`;
    }
    return val.toLocaleString();
  };
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        {Icon && <Icon className="w-5 h-5 text-slate-400" />}
      </div>
      
      <p className="text-3xl font-bold text-slate-900 mb-2">
        {formatValue(value)}
      </p>
      
      {change !== undefined && change !== null && (
        <div className="flex items-center gap-1">
          {isPositive && <TrendingUp className="w-4 h-4 text-green-600" />}
          {isNegative && <TrendingDown className="w-4 h-4 text-red-600" />}
          <span className={`text-sm font-medium ${
            isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-slate-600'
          }`}>
            {isPositive && '+'}{change}%
          </span>
          <span className="text-xs text-slate-500 ml-1">vs last period</span>
        </div>
      )}
    </div>
  );
}
