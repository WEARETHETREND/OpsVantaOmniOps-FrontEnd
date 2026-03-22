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

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToSlide = useCallback(
    (index) => {
      setCurrentIndex(Math.min(index, maxIndex));
    },
    [maxIndex]
  );

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Trusted by Service Professionals
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-white/90">
            OpsVanta is growing fast — customer reviews coming soon
          </p>
        </div>

        {/* Trusted By Bar */}
        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">Growing Fast</div>
            <div className="text-sm text-white/80">Early Adopters Onboarding</div>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">Nationwide</div>
            <div className="text-sm text-white/80">Coverage Expanding</div>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">Built for Ops</div>
            <div className="text-sm text-white/80">Field Service Teams</div>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">Beta Phase</div>
            <div className="text-sm text-white/80">Actively Onboarding</div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        {testimonials.length > 0 ? (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="region"
            aria-label="Customer testimonials carousel"
          >
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:bg-gray-100 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600 focus:outline-none md:-translate-x-12"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-purple-600" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 z-10 translate-x-4 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:bg-gray-100 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600 focus:outline-none md:translate-x-12"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-purple-600" />
            </button>

            {/* Testimonials Grid */}
            <div className="overflow-hidden px-2">
              <div
                className="grid gap-6 transition-transform duration-500 ease-in-out"
                style={{
                  gridTemplateColumns: `repeat(${itemsPerView}, minmax(0, 1fr))`,
                }}
              >
                {visibleTestimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TestimonialCard {...testimonial} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dot Indicators */}
            <div
              className="mt-8 flex justify-center gap-2"
              role="tablist"
              aria-label="Testimonial navigation"
            >
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 w-3 rounded-full transition-all focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600 focus:outline-none ${
                    index === currentIndex ? 'w-8 bg-white' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  role="tab"
                  aria-selected={index === currentIndex}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/20 bg-white/10 p-12 text-center backdrop-blur-sm">
            <p className="text-xl font-semibold text-white">Customer reviews coming soon</p>
            <p className="mt-2 text-white/70">
              We&apos;re just getting started — be among the first to share your experience.
            </p>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-xl transition-all hover:scale-105 hover:shadow-2xl focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600 focus:outline-none">
            <Zap className="h-5 w-5" />
            Get Early Access
          </button>
        </div>
      </div>
    </section>
  );
}
