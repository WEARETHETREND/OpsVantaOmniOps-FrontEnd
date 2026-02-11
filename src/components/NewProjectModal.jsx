import { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Layout,
  ShoppingCart,
  Briefcase,
  BookOpen,
  Rocket,
} from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';
import QualityBadge from './QualityBadge';
import { generateWebsite, getGenerationProgress } from '../api/omniops';

const PROJECT_TYPES = [
  { id: 'website', name: 'Website', icon: Layout, description: 'General purpose website' },
  {
    id: 'landing',
    name: 'Landing Page',
    icon: Sparkles,
    description: 'High-converting landing page',
  },
  { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart, description: 'Online store' },
  { id: 'portfolio', name: 'Portfolio', icon: Briefcase, description: 'Showcase your work' },
  { id: 'blog', name: 'Blog', icon: BookOpen, description: 'Content-focused blog' },
  { id: 'saas', name: 'SaaS', icon: Rocket, description: 'Software as a service' },
];

const DESIGN_STYLES = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary' },
  { id: 'bold', name: 'Bold', description: 'Strong and impactful' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated and refined' },
  { id: 'playful', name: 'Playful', description: 'Fun and energetic' },
  { id: 'professional', name: 'Professional', description: 'Business-focused' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and clean' },
];

const COLOR_SCHEMES = [
  { id: 'ocean', name: 'Ocean', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'sunset', name: 'Sunset', gradient: 'from-orange-500 to-pink-500' },
  { id: 'forest', name: 'Forest', gradient: 'from-green-500 to-emerald-500' },
  { id: 'royal', name: 'Royal', gradient: 'from-purple-500 to-indigo-500' },
  { id: 'fire', name: 'Fire', gradient: 'from-red-500 to-yellow-500' },
  { id: 'lavender', name: 'Lavender', gradient: 'from-purple-300 to-pink-300' },
  { id: 'midnight', name: 'Midnight', gradient: 'from-slate-700 to-blue-900' },
  { id: 'monochrome', name: 'Monochrome', gradient: 'from-gray-700 to-gray-900' },
];

const EXAMPLE_PROMPTS = [
  'Create a modern SaaS landing page for a productivity app',
  'Build an elegant portfolio website for a photographer',
  'Design a bold e-commerce store for streetwear fashion',
  'Generate a professional blog about web development',
  "Make a playful landing page for a kids' education app",
  'Create a minimal portfolio for a UX designer',
];

export default function NewProjectModal({ isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('');
  const [designStyle, setDesignStyle] = useState('');
  const [colorScheme, setColorScheme] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedProject, setGeneratedProject] = useState(null);
  const generationCompleteRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes (setTimeout to avoid setState in effect warning)
      const timer = setTimeout(() => {
        setStep(1);
        setProjectType('');
        setDesignStyle('');
        setColorScheme('');
        setPrompt('');
        setGenerating(false);
        setProgress(0);
        setGeneratedProject(null);
        generationCompleteRef.current = false;
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleGenerate = async () => {
    setGenerating(true);
    setProgress(0);
    generationCompleteRef.current = false;

    try {
      const result = await generateWebsite({
        type: projectType,
        style: designStyle,
        colorScheme,
        prompt,
      });

      // Simulate progress tracking
      const projectId = result.id;
      const interval = setInterval(async () => {
        try {
          const progressData = await getGenerationProgress(projectId);
          setProgress(progressData.progress);

          if (progressData.progress >= 100) {
            clearInterval(interval);
            generationCompleteRef.current = true;
            setGeneratedProject(progressData.project);
            // Delay to show success message and quality score before redirecting
            setTimeout(() => {
              if (onSuccess) onSuccess(progressData.project);
            }, 1500);
          }
        } catch (err) {
          console.error('Progress check failed:', err);
          // Simulate progress if API fails
          setProgress((prev) => Math.min(prev + 10, 100));
        }
      }, 1000);

      // Fallback: stop after 30 seconds
      setTimeout(() => {
        clearInterval(interval);
        if (!generationCompleteRef.current) {
          setProgress(100);
          generationCompleteRef.current = true;
          setGeneratedProject(result);
          if (onSuccess) onSuccess(result);
        }
      }, 30000);
    } catch (err) {
      console.error('Generation failed:', err);
      alert('Failed to generate website. Please try again.');
      setGenerating(false);
      setProgress(0);
    }
  };

  const canProceed = () => {
    if (step === 1) return projectType !== '';
    if (step === 2) return designStyle !== '' && colorScheme !== '';
    if (step === 3) return prompt.trim() !== '';
    return false;
  };

  if (!isOpen) return null;

  return (
    <div className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-lg p-2 transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">Generate with AI</h2>
              <p className="mt-1 text-sm text-white/90">Create your website in 30 seconds</p>
            </div>
          </div>

          {/* Progress Steps */}
          {!generating && (
            <div className="mt-6 flex items-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-1 items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold transition-all ${
                      step >= s ? 'bg-white text-blue-600' : 'bg-white/30 text-white/70'
                    }`}
                  >
                    {s}
                  </div>
                  <span
                    className={`text-sm font-medium ${step >= s ? 'text-white' : 'text-white/70'}`}
                  >
                    {s === 1 ? 'Type' : s === 2 ? 'Style' : 'Prompt'}
                  </span>
                  {s < 3 && <div className="h-0.5 flex-1 bg-white/30" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {generating ? (
            <div className="py-12">
              <ProgressIndicator progress={progress} />

              {generatedProject && (
                <div className="animate-fadeIn mt-8 space-y-4 text-center">
                  <div className="flex justify-center">
                    <QualityBadge score={generatedProject.qualityScore || 95} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Website Generated!</h3>
                  <p className="text-gray-600">Redirecting to editor...</p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Step 1: Project Type */}
              {step === 1 && (
                <div className="animate-fadeIn space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">Choose Project Type</h3>
                  <p className="text-gray-600">What kind of website do you want to create?</p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {PROJECT_TYPES.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setProjectType(type.id)}
                          className={`rounded-xl border-2 p-4 text-left transition-all ${
                            projectType === type.id
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <Icon
                            className={`mb-2 h-8 w-8 ${projectType === type.id ? 'text-blue-600' : 'text-gray-400'}`}
                          />
                          <div className="font-semibold text-gray-900">{type.name}</div>
                          <div className="mt-1 text-sm text-gray-500">{type.description}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Design Style & Color */}
              {step === 2 && (
                <div className="animate-fadeIn space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Choose Design Style</h3>
                    <p className="text-gray-600">Select the style that fits your brand</p>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {DESIGN_STYLES.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setDesignStyle(style.id)}
                          className={`rounded-xl border-2 p-4 transition-all ${
                            designStyle === style.id
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="font-semibold text-gray-900">{style.name}</div>
                          <div className="mt-1 text-xs text-gray-500">{style.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Choose Color Scheme</h3>
                    <p className="text-gray-600">Pick colors that represent your brand</p>

                    <div className="mt-4 grid grid-cols-4 gap-3">
                      {COLOR_SCHEMES.map((scheme) => (
                        <button
                          key={scheme.id}
                          onClick={() => setColorScheme(scheme.id)}
                          className={`group relative rounded-xl border-2 p-3 transition-all ${
                            colorScheme === scheme.id
                              ? 'border-blue-500 shadow-md'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`h-16 rounded-lg bg-gradient-to-r ${scheme.gradient}`} />
                          <div className="mt-2 text-center text-sm font-medium text-gray-900">
                            {scheme.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Prompt */}
              {step === 3 && (
                <div className="animate-fadeIn space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">Describe Your Vision</h3>
                  <p className="text-gray-600">Tell us what you want your website to be about</p>

                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., Create a modern landing page for my AI-powered productivity app..."
                    className="h-32 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />

                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-700">Or try these examples:</p>
                    <div className="space-y-2">
                      {EXAMPLE_PROMPTS.map((example, idx) => (
                        <button
                          key={idx}
                          onClick={() => setPrompt(example)}
                          className="block w-full rounded-lg bg-gray-50 px-4 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-100"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!generating && (
          <div className="flex items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 p-6">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-4 py-2 font-medium text-gray-700 transition-colors hover:text-gray-900"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={!canProceed()}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                Generate Website
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
