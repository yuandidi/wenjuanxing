import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import vitePluginImp from 'vite-plugin-imp'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: name => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
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
