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

  // Build optimizations
  build: {
    // Output directory
    outDir: 'dist',

    // Generate source maps for debugging (disable in production if needed)
    sourcemap: false,

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,

    // Rollup options for code splitting and optimization
    rollupOptions: {
      output: {
        // Simplified asset and chunk file naming for better caching
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },

    // CSS code splitting
    cssCodeSplit: true,
  },

  // Server configuration for development
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    open: false,
  },

  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
    open: false,
  },

  // Dependency optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js', 'lucide-react'],
  },
});
