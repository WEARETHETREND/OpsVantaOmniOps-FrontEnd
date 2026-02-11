/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 * 
 * © 2026 WEARETHETREND / OpsVanta LLC
 * ALL RIGHTS RESERVED
 * 
 * UNAUTHORIZED USE PROHIBITED
 * 
 * This file contains trade secrets. Violators will be prosecuted.
 * See COPYRIGHT.md for terms.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { SparklesIcon, XIcon } from 'lucide-react';

export default function NewProjectModal({ onClose, onSuccess }) {
  const [prompt, setPrompt] = useState('');
  const [projectType, setProjectType] = useState('website');
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState('');
  const navigate = useNavigate();

  const examples = [
    'A modern landing page for a SaaS productivity tool with pricing tiers',
    'Portfolio website for a freelance photographer with gallery',
    'Restaurant website with menu, reservations, and contact form',
    'E-commerce store for handmade jewelry with product catalog',
    'Personal blog about travel and adventure with featured posts',
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
            generateImages: true,
          },
        }),
      });

      setProgress('✅ Website generated!');

      setTimeout(() => {
        onSuccess();
        navigate(`/builder/editor/${result.project.id}`);
      }, 1000);
    } catch (error) {
      console.error('Generation failed:', error);
      setProgress('');
      setGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <SparklesIcon size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Generate with AI</h2>
              <p className="text-sm text-gray-600">Describe your website and let AI build it</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={generating}
            className="rounded-lg p-2 hover:bg-gray-100"
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
                <label className="mb-2 block text-sm font-medium text-gray-700">Project Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'website', label: '🌐 Website', desc: 'Multi-page site' },
                    { value: 'landing-page', label: '🚀 Landing Page', desc: 'Single page' },
                    { value: 'portfolio', label: '💼 Portfolio', desc: 'Showcase work' },
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setProjectType(type.value)}
                      className={`rounded-lg border-2 p-3 text-left transition-all ${
                        projectType === type.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-sm font-medium">{type.label}</div>
                      <div className="mt-1 text-xs text-gray-500">{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Input */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Describe Your Website
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., A modern landing page for a SaaS product with pricing, testimonials, and a contact form. Use a blue and white color scheme with a tech-forward design."
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
                <p className="mt-2 text-xs text-gray-500">
                  Be specific! Include details about pages, features, colors, and style.
                </p>
              </div>

              {/* Examples */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Example Prompts
                </label>
                <div className="space-y-2">
                  {examples.map((example, i) => (
                    <button
                      key={i}
                      onClick={() => setPrompt(example)}
                      className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
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
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-medium text-white hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <SparklesIcon size={20} />
                Generate Website with AI
              </button>
            </>
          ) : (
            <div className="py-12 text-center">
              <div className="mb-4 inline-flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <SparklesIcon size={32} className="text-white" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{progress}</h3>
              <p className="mb-6 text-sm text-gray-600">This usually takes 10-30 seconds...</p>
              <div className="mx-auto h-2 w-full max-w-xs overflow-hidden rounded-full bg-gray-200">
                <div className="animate-progress h-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
