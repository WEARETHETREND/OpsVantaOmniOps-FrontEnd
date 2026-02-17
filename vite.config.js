/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 *
 * © 2026 WEARETHETREND / OpsVanta LLC
 * ALL RIGHTS RESERVED
 *
 * UNAUTHORIZED ACCESS, USE, COPYING, OR DISTRIBUTION PROHIBITED
 *
 * This file contains trade secrets and confidential information.
 * Violators will be prosecuted under trade secret law.
 *
 * Authorized use only. See COPYRIGHT.md for terms.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Output directory
    outDir: 'dist',
    
    // Chunk size warnings at 500kb
    chunkSizeWarningLimit: 500,
    
    // Rollup options for optimized builds
    rollupOptions: {
      output: {
        // Manual chunks for better code splitting
        manualChunks: (id) => {
          // Define vendor packages
          const reactPackages = /node_modules\/(react|react-dom|react-router-dom)/;
          const supabasePackages = /node_modules\/@supabase/;
          const iconPackages = /node_modules\/lucide-react/;
          
          // Vendor chunk for React and related libraries
          if (reactPackages.test(id)) {
            return 'react-vendor';
          }
          
          // Supabase chunk
          if (supabasePackages.test(id)) {
            return 'supabase-vendor';
          }
          
          // Icons chunk
          if (iconPackages.test(id)) {
            return 'icons-vendor';
          }
        },
      },
    },
    
    // Target modern browsers for smaller bundle size
    target: 'esnext',
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js', 'lucide-react'],
  },
  
  // Server configuration for development
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: false,
  },
});
