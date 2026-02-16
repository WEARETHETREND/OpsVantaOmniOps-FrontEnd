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
    
    // Generate sourcemaps for production debugging
    sourcemap: false,
    
    // Chunk size warnings at 500kb
    chunkSizeWarningLimit: 500,
    
    // Rollup options for optimized builds
    rollupOptions: {
      output: {
        // Manual chunks for better code splitting
        manualChunks: {
          // Vendor chunk for React and related libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // Supabase chunk
          'supabase-vendor': ['@supabase/supabase-js'],
          
          // Icons chunk
          'icons-vendor': ['lucide-react'],
        },
        
        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2|ttf|otf|eot/i.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        
        // Chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        
        // Entry file naming
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
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
