import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // base:'/AI-Powerd-Disaster-Rescue-System/'
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})

