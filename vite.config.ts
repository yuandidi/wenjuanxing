/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({ open: true })],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-ventor'
            }
            if (id.includes('react-dom')) {
              return 'react-dom-ventor'
            }
            if (id.includes('react-router-dom')) {
              return 'react-router-dom-ventor'
            }
            if (id.includes('/node_modules/antd')) {
              return 'antd-ventor'
            }

            if (id.includes('/node_modules/recharts')) {
              return 'recharts-ventor'
            }

            if (id.includes('/node_modules/lodash')) {
              return 'lodash-ventor'
            }

            if (id.includes('/node_modules/@ant-design')) {
              return '@ant-design-ventor'
            }

            if (id.includes('/node_modules/@dnd-kit')) {
              return 'dnd-kit-ventor'
            }

            if (id.includes('/node_modules/d3')) {
              return 'd3-ventor'
            }
            return 'ventors'
          }
        },
      },
    },
  },
  server: {
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
