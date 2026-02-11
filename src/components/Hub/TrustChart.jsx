// Trust Chart Component - Simple line chart for trust score over time
export default function TrustChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
        No trust history available
      </div>
    );
  }
  
  // Find min/max for scaling
  const scores = data.map(d => d.score);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const range = maxScore - minScore || 1;
  
  // Calculate points for SVG path
  const width = 600;
  const height = 200;
  const padding = 20;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;
  
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((d.score - minScore) / range) * chartHeight;
    return { x, y, score: d.score, date: d.date };
  });
  
  // Create SVG path
  const pathD = points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ');
  
  // Create area fill path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`;
  
  const currentScore = scores[scores.length - 1];
  const previousScore = scores[scores.length - 2] || currentScore;
  const scoreDiff = currentScore - previousScore;
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Trust Score
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-slate-900">
              {Math.round(currentScore)}%
            </span>
            <span className={`text-sm font-medium ${
              scoreDiff > 0 ? 'text-green-600' : scoreDiff < 0 ? 'text-red-600' : 'text-slate-600'
            }`}>
              {scoreDiff > 0 && '+'}
              {scoreDiff.toFixed(1)}%
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-slate-500">Last 30 days</div>
          <div className="text-sm font-medium text-slate-700">
            Range: {Math.round(minScore)}% - {Math.round(maxScore)}%
          </div>
        </div>
      </div>
      
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-40"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        <line
          x1={padding}
          y1={padding + chartHeight / 2}
          x2={width - padding}
          y2={padding + chartHeight / 2}
          stroke="#e2e8f0"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        
        {/* Area fill */}
        <path
          d={areaD}
          fill="url(#trustGradient)"
          opacity="0.2"
        />
        
        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#2563eb"
            stroke="white"
            strokeWidth="2"
          >
            <title>{`${new Date(point.date).toLocaleDateString()}: ${Math.round(point.score)}%`}</title>
          </circle>
        ))}
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="trustGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>{new Date(data[0]?.date).toLocaleDateString()}</span>
        <span>{new Date(data[data.length - 1]?.date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
