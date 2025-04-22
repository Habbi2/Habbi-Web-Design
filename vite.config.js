import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { splitVendorChunkPlugin } from 'vite'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable fastRefresh for better development experience
      fastRefresh: true,
      // Add JSX runtime for better performance
      jsxRuntime: 'automatic',
    }),
    splitVendorChunkPlugin(),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
  ],
  build: {
    cssCodeSplit: true,
    reportCompressedSize: false, // Improves build performance
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['gsap', 'framer-motion', 'three'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increased warning limit for larger chunks
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB
  },
  // Ensure Helmet is included in optimized dependencies
  optimizeDeps: {
    include: ['react-helmet']
  },
  // Add server options for better SEO
  server: {
    // Pre-transform templates with metadata
    preTransformRequests: true
  },
})
