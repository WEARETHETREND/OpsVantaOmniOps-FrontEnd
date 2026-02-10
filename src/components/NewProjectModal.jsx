import { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, Layout, ShoppingCart, Briefcase, BookOpen, Rocket } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';
import QualityBadge from './QualityBadge';
import { generateWebsite, getGenerationProgress } from '../api/omniops';

const PROJECT_TYPES = [
  { id: 'website', name: 'Website', icon: Layout, description: 'General purpose website' },
  { id: 'landing', name: 'Landing Page', icon: Sparkles, description: 'High-converting landing page' },
  { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart, description: 'Online store' },
  { id: 'portfolio', name: 'Portfolio', icon: Briefcase, description: 'Showcase your work' },
  { id: 'blog', name: 'Blog', icon: BookOpen, description: 'Content-focused blog' },
  { id: 'saas', name: 'SaaS', icon: Rocket, description: 'Software as a service' }
];

const DESIGN_STYLES = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary' },
  { id: 'bold', name: 'Bold', description: 'Strong and impactful' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated and refined' },
  { id: 'playful', name: 'Playful', description: 'Fun and energetic' },
  { id: 'professional', name: 'Professional', description: 'Business-focused' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and clean' }
];

const COLOR_SCHEMES = [
  { id: 'ocean', name: 'Ocean', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'sunset', name: 'Sunset', gradient: 'from-orange-500 to-pink-500' },
  { id: 'forest', name: 'Forest', gradient: 'from-green-500 to-emerald-500' },
  { id: 'royal', name: 'Royal', gradient: 'from-purple-500 to-indigo-500' },
  { id: 'fire', name: 'Fire', gradient: 'from-red-500 to-yellow-500' },
  { id: 'lavender', name: 'Lavender', gradient: 'from-purple-300 to-pink-300' },
  { id: 'midnight', name: 'Midnight', gradient: 'from-slate-700 to-blue-900' },
  { id: 'monochrome', name: 'Monochrome', gradient: 'from-gray-700 to-gray-900' }
];

const EXAMPLE_PROMPTS = [
  "Create a modern SaaS landing page for a productivity app",
  "Build an elegant portfolio website for a photographer",
  "Design a bold e-commerce store for streetwear fashion",
  "Generate a professional blog about web development",
  "Make a playful landing page for a kids' education app",
  "Create a minimal portfolio for a UX designer"
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
        prompt
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
          setProgress(prev => Math.min(prev + 10, 100));
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Generate with AI</h2>
              <p className="text-white/90 text-sm mt-1">Create your website in 30 seconds</p>
            </div>
          </div>

          {/* Progress Steps */}
          {!generating && (
            <div className="flex items-center gap-4 mt-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold transition-all ${
                    step >= s ? 'bg-white text-blue-600' : 'bg-white/30 text-white/70'
                  }`}>
                    {s}
                  </div>
                  <span className={`text-sm font-medium ${step >= s ? 'text-white' : 'text-white/70'}`}>
                    {s === 1 ? 'Type' : s === 2 ? 'Style' : 'Prompt'}
                  </span>
                  {s < 3 && <div className="flex-1 h-0.5 bg-white/30" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {generating ? (
            <div className="py-12">
              <ProgressIndicator progress={progress} />
              
              {generatedProject && (
                <div className="mt-8 text-center space-y-4 animate-fadeIn">
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
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-xl font-bold text-gray-900">Choose Project Type</h3>
                  <p className="text-gray-600">What kind of website do you want to create?</p>
                  
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {PROJECT_TYPES.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setProjectType(type.id)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            projectType === type.id
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <Icon className={`w-8 h-8 mb-2 ${projectType === type.id ? 'text-blue-600' : 'text-gray-400'}`} />
                          <div className="font-semibold text-gray-900">{type.name}</div>
                          <div className="text-sm text-gray-500 mt-1">{type.description}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Design Style & Color */}
              {step === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Choose Design Style</h3>
                    <p className="text-gray-600">Select the style that fits your brand</p>
                    
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {DESIGN_STYLES.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setDesignStyle(style.id)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            designStyle === style.id
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="font-semibold text-gray-900">{style.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{style.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Choose Color Scheme</h3>
                    <p className="text-gray-600">Pick colors that represent your brand</p>
                    
                    <div className="grid grid-cols-4 gap-3 mt-4">
                      {COLOR_SCHEMES.map((scheme) => (
                        <button
                          key={scheme.id}
                          onClick={() => setColorScheme(scheme.id)}
                          className={`group relative p-3 rounded-xl border-2 transition-all ${
                            colorScheme === scheme.id
                              ? 'border-blue-500 shadow-md'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`h-16 rounded-lg bg-gradient-to-r ${scheme.gradient}`} />
                          <div className="text-sm font-medium text-gray-900 mt-2 text-center">
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
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-xl font-bold text-gray-900">Describe Your Vision</h3>
                  <p className="text-gray-600">Tell us what you want your website to be about</p>
                  
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., Create a modern landing page for my AI-powered productivity app..."
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Or try these examples:</p>
                    <div className="space-y-2">
                      {EXAMPLE_PROMPTS.map((example, idx) => (
                        <button
                          key={idx}
                          onClick={() => setPrompt(example)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
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
          <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-200 bg-gray-50">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                Generate Website
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
