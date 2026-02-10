import { useState } from 'react';
import { api } from '../../lib/api';
import { SparklesIcon, XIcon } from 'lucide-react';

export default function NewProjectModal({ onClose, onSuccess }) {
  const [prompt, setPrompt] = useState('');
  const [projectType, setProjectType] = useState('website');
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState('');

  const examples = [
    "A modern landing page for a SaaS productivity tool with pricing tiers",
    "Portfolio website for a freelance photographer with gallery",
    "Restaurant website with menu, reservations, and contact form",
    "E-commerce store for handmade jewelry with product catalog",
    "Personal blog about travel and adventure with featured posts"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setGenerating(true);
    setProgress('🤖 AI is thinking...');

    try {
      setTimeout(() => setProgress('🎨 Designing layout...'), 1000);
      setTimeout(() => setProgress('✍️ Generating content...'), 3000);
      setTimeout(() => setProgress('🖼️ Creating visuals...'), 5000);

      const result = await api.fetch('/api/builder/generate', {
        method: 'POST',
        body: JSON.stringify({
          prompt,
          options: {
            type: projectType,
            generateImages: true
          }
        })
      });

      setProgress('✅ Website generated!');
      
      setTimeout(() => {
        onSuccess();
        window.location.href = `/builder/editor/${result.project.id}`;
      }, 1000);

    } catch (error) {
      console.error('Generation failed:', error);
      alert('Generation failed: ' + error.message);
      setGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <SparklesIcon size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Generate with AI
              </h2>
              <p className="text-sm text-gray-600">
                Describe your website and let AI build it
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={generating}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!generating ? (
            <>
              {/* Project Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'website', label: '🌐 Website', desc: 'Multi-page site' },
                    { value: 'landing-page', label: '🚀 Landing Page', desc: 'Single page' },
                    { value: 'portfolio', label: '💼 Portfolio', desc: 'Showcase work' }
                  ].map(type => (
                    <button
                      key={type.value}
                      onClick={() => setProjectType(type.value)}
                      className={`p-3 border-2 rounded-lg text-left transition-all ${
                        projectType === type.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-sm">{type.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe Your Website
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., A modern landing page for a SaaS product with pricing, testimonials, and a contact form. Use a blue and white color scheme with a tech-forward design."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Be specific! Include details about pages, features, colors, and style.
                </p>
              </div>

              {/* Examples */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Example Prompts
                </label>
                <div className="space-y-2">
                  {examples.map((example, i) => (
                    <button
                      key={i}
                      onClick={() => setPrompt(example)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <SparklesIcon size={20} />
                Generate Website with AI
              </button>
            </>
          ) : (
            <div className="py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4 animate-pulse">
                <SparklesIcon size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {progress}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                This usually takes 10-30 seconds...
              </p>
              <div className="w-full max-w-xs mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-progress"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
