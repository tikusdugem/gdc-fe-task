import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Vitest reads this file in preference to vite.config.ts. It is intentionally
// kept separate (and out of the tsconfig include) so the project's Vite 8 build
// config stays clean, away from Vitest's bundled (older) Vite types.
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
