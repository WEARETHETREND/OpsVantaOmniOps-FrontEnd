// Command Bus - Natural language command interface (Cmd+K)
import { useEffect, useState } from 'react';
import { Search, Zap, X } from 'lucide-react';

export default function CommandBus({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // This will toggle in parent
      }
      
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  // Generate suggestions based on query
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions(getDefaultSuggestions());
      return;
    }
    
    const filtered = getAllCommands().filter(cmd =>
      cmd.text.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setSuggestions(filtered.slice(0, 5));
  }, [query]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // TODO: Actually execute command
    console.log('Execute command:', query);
    alert(`Command executed: ${query}\n\nThis would send the command to the autopilot system.`);
    setQuery('');
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400" />
          <form onSubmit={handleSubmit} className="flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What would you like me to do?"
              className="w-full text-lg bg-transparent border-none outline-none placeholder-slate-400"
              autoFocus
            />
          </form>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Suggestions */}
        <div className="max-h-96 overflow-y-auto">
          {suggestions.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No matching commands found
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(suggestion.text);
                    // Auto-submit
                    setTimeout(() => {
                      handleSubmit({ preventDefault: () => {} });
                    }, 100);
                  }}
                  className="w-full text-left p-4 hover:bg-slate-50 transition-colors flex items-start gap-3"
                >
                  <div className="mt-1">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900 mb-1">
                      {suggestion.text}
                    </div>
                    <div className="text-sm text-slate-600">
                      {suggestion.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span>Press <kbd className="px-2 py-1 bg-white rounded border border-slate-300">Enter</kbd> to execute</span>
            <span>Press <kbd className="px-2 py-1 bg-white rounded border border-slate-300">Esc</kbd> to close</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getDefaultSuggestions() {
  return [
    {
      text: 'Fix the failing build in omniops-backend',
      description: 'Analyze CI logs, identify issue, create fix PR'
    },
    {
      text: 'Deploy ContentSpark to production',
      description: 'Run tests, create backup, deploy with monitoring'
    },
    {
      text: 'Scale up database for high traffic',
      description: 'Increase RDS instance size, monitor performance'
    },
    {
      text: 'Send upgrade prompts to power users',
      description: 'Identify users hitting limits, send personalized emails'
    },
    {
      text: 'Pause low-converting ad campaigns',
      description: 'Analyze campaign performance, pause CAC > $100'
    }
  ];
}

function getAllCommands() {
  return [
    ...getDefaultSuggestions(),
    {
      text: 'Create new GitHub repository for microservice',
      description: 'Set up repo with CI/CD, standard structure'
    },
    {
      text: 'Update dependencies across all repos',
      description: 'Check for updates, create PRs, run tests'
    },
    {
      text: 'Analyze revenue trends and send report',
      description: 'Pull Stripe data, generate insights, email to team'
    },
    {
      text: 'Review and merge approved PRs',
      description: 'Check PR status, run final tests, merge if passing'
    },
    {
      text: 'Optimize database queries',
      description: 'Analyze slow queries, add indexes, measure improvement'
    }
  ];
}
