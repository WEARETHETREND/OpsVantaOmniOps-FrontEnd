/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 * 
 * © 2026 WEARETHETREND / OpsVanta LLC
 * ALL RIGHTS RESERVED
 * 
 * UNAUTHORIZED ACCESS, USE, OR DISTRIBUTION PROHIBITED
 * 
 * This file contains trade secrets and confidential information.
 * Violators will be prosecuted under trade secret law.
 * 
 * For licensing: young.monte@omniops-ai.com
 */


import { Loader2, Sparkles, Palette, Code } from 'lucide-react';

export default function ProgressIndicator({ progress, stage }) {
  const stages = [
    { name: 'Thinking', icon: Sparkles, range: [0, 33] },
    { name: 'Designing', icon: Palette, range: [34, 66] },
    { name: 'Generating', icon: Code, range: [67, 100] },
  ];

  const currentStage =
    stage || stages.find((s) => progress >= s.range[0] && progress <= s.range[1]);
  const StageIcon = currentStage?.icon || Loader2;

  return (
    <div className="space-y-4">
      {/* Stage Indicator */}
      <div className="flex items-center justify-center gap-3">
        <div className="relative">
          <StageIcon className="h-6 w-6 animate-pulse text-blue-500" />
        </div>
        <span className="text-lg font-semibold text-gray-700">
          {currentStage?.name || 'Processing'}...
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 animate-pulse bg-white/30" />
        </div>
      </div>

      {/* Progress Percentage */}
      <div className="text-center">
        <span className="text-2xl font-bold text-gray-800">{progress}%</span>
      </div>

      {/* Stage Steps */}
      <div className="flex justify-between pt-2">
        {stages.map((s, idx) => {
          const isActive = progress >= s.range[0];
          const isCurrent = currentStage?.name === s.name;

          return (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                  isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
                } ${isCurrent ? 'ring-2 ring-blue-300 ring-offset-2' : ''}`}
              >
                <s.icon className="h-4 w-4" />
              </div>
              <span
                className={`text-xs font-medium ${isActive ? 'text-gray-700' : 'text-gray-400'}`}
              >
                {s.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
