import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    appType: 'spa',
    server: {
        port: 5175,
        fs: {
            // Allow importing /pill_style.css from the repository root.
            allow: ['..'],
        },
    },
})
