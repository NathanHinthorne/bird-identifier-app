import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  // base: process.env.VITE_BASE_URL,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser', // reduces size of code, thus improving performance
    terserOptions: {
      compress: { // removes console.log statements from the final build
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'], // adjust based on dependencies
        },
      },
    },
  },
  server: {
    port: parseInt(process.env.VITE_PORT) || 3000,
    strictPort: true,
    host: true,
  },
})