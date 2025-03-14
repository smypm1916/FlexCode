import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    host: "0.0.0.0",
    // port: 5173,
    // strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        // target: 'http://127.0.0.1:8080',
        // rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
        secure: false,
        ws: true
      }
    },
  },
});
