import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// @ts-ignore
// process.env = {...process.env, ...loadEnv(mode, process.cwd())};
export default defineConfig({
    plugins: [react()],
    // @ts-ignore
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './test/setup.ts',
    },
    build: {
        outDir: './build',
    },
    base: "./"
})
