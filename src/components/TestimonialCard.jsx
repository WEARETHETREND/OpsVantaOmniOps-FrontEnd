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

import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({
  name,
  role,
  company,
  avatar,
  rating,
  testimonial,
  metrics,
}) {
  return (
    <div className="group relative h-full rounded-2xl border border-white/20 bg-white/95 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-10">
        <Quote className="h-16 w-16 text-purple-600" />
      </div>

      {/* Rating Stars */}
      <div className="relative z-10 mb-4 flex gap-1">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="relative z-10 mb-6 text-lg leading-relaxed text-gray-700">{testimonial}</p>

      {/* Metric Badge */}
      {metrics && (
        <div className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white">
          <span className="text-lg">{metrics.value}</span>
          <span className="opacity-90">{metrics.label}</span>
        </div>
      )}

      {/* Author Info */}
      <div className="relative z-10 flex items-center gap-4 border-t border-gray-200 pt-6">
        <img
          src={avatar}
          alt={name}
          className="h-14 w-14 rounded-full border-2 border-purple-200 object-cover"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=128`;
          }}
        />
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  );
}
