import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    // Gzip/Brotli compression for JS/CSS/HTML
    viteCompression({
      threshold: 1024,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    viteCompression({
      threshold: 1024,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Lossless image optimizations (PNG/JPEG/WebP/SVG)
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      optipng: { optimizationLevel: 5 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.75, 0.9], speed: 3 },
      svgo: {
        plugins: [{ name: 'removeViewBox', active: false }],
      },
    }),
    // Bundle analyzer (only generated when ANALYZE env var is set)
    visualizer({
      filename: 'dist/bundle-stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    cssCodeSplit: true,
    minify: 'terser',
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['motion'],
        },
      },
    },
  },
});
