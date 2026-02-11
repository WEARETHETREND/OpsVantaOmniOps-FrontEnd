// Autopilot Dial Component
import { useState } from 'react';

const LEVELS = [
  { level: 0, label: 'Observe Only', description: 'Monitor and report, no actions' },
  { level: 1, label: 'Advisory', description: 'Suggest actions, you approve' },
  { level: 2, label: 'Conditional', description: 'Auto-execute low-risk moves' },
  { level: 3, label: 'Sovereign + Guardrails', description: 'Full automation within limits' },
  { level: 4, label: 'Sovereign + Timebox', description: 'Actions only in time windows' },
  { level: 5, label: 'Full Sovereign', description: 'Complete autonomy (requires confirmation)' }
];

export default function AutopilotDial({ value, onChange, disabled }) {
  const [hoveredLevel, setHoveredLevel] = useState(null);
  
  const displayLevel = hoveredLevel !== null ? hoveredLevel : value;
  const currentLevel = LEVELS[displayLevel];
  
  const handleLevelClick = (level) => {
    if (disabled) return;
    
    // Level 5 requires confirmation
    if (level === 5) {
      const confirmed = window.confirm(
        'Level 5 grants full autonomous control. Are you sure you want to enable this?'
      );
      if (!confirmed) return;
    }
    
    onChange(level);
  };
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8">
      <div className="text-center mb-8">
        <div className="text-6xl font-bold text-slate-900 mb-2">
          {displayLevel}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">
          {currentLevel.label}
        </h3>
        <p className="text-sm text-slate-600">
          {currentLevel.description}
        </p>
      </div>
      
      <div className="relative">
        {/* Dial track */}
        <div className="flex items-center justify-between mb-4">
          {LEVELS.map((level) => (
            <button
              key={level.level}
              onClick={() => handleLevelClick(level.level)}
              onMouseEnter={() => setHoveredLevel(level.level)}
              onMouseLeave={() => setHoveredLevel(null)}
              disabled={disabled}
              className={`relative w-12 h-12 rounded-full font-bold transition-all ${
                level.level === value
                  ? 'bg-blue-600 text-white scale-110 shadow-lg'
                  : level.level === hoveredLevel
                  ? 'bg-blue-100 text-blue-700 scale-105'
                  : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {level.level}
            </button>
          ))}
        </div>
        
        {/* Connecting line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-slate-200 -z-10" />
        
        {/* Active segment */}
        <div 
          className="absolute top-6 left-6 h-0.5 bg-blue-600 -z-10 transition-all duration-300"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      
      <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-slate-600">
        {LEVELS.map((level) => (
          <div
            key={level.level}
            className={`p-2 rounded ${
              level.level === value ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50'
            }`}
          >
            <span className="font-bold">Level {level.level}:</span> {level.label}
          </div>
        ))}
      </div>
    </div>
  );
}
