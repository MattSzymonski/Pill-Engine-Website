/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Theme-aware colors (automatically switch with light/dark)
                'pill-primary': 'var(--pill-primary)',
                'pill-primary-light': 'var(--pill-primary-light)',
                'pill-primary-dark': 'var(--pill-primary-dark)',
                'pill-accent': 'var(--pill-accent)',

                // Legacy names for backward compatibility
                'pill-red': 'var(--pill-primary)',
                'pill-red-light': 'var(--pill-primary-light)',
                'pill-red-dark': 'var(--pill-primary-dark)',
                'pill-blue': 'var(--pill-primary)',
                'pill-blue-light': 'var(--pill-primary-light)',
                'pill-blue-dark': 'var(--pill-primary-dark)',
                'rust-orange': 'var(--pill-accent)',
            }
        },
    },
    plugins: [],
}
