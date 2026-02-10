import { Star } from 'lucide-react';

export default function QualityBadge({ score }) {
  const getColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
      <Star className={`w-4 h-4 ${getColor(score)} text-white fill-current`} />
      <span className="text-sm font-semibold text-white">{score}/100</span>
      <span className="text-xs text-white/80">{getLabel(score)}</span>
    </div>
  );
}
