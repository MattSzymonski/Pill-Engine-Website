/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#fff5f5',
                    100: '#ffe0e0',
                    200: '#ffc2c2',
                    300: '#ff9494',
                    400: '#ff6363',
                    500: '#ff4444',
                    600: '#e62e2e',
                    700: '#c41c1c',
                    800: '#a31818',
                    900: '#871919',
                },
                surface: {
                    DEFAULT: '#0A0A0A',
                    elevated: '#111111',
                    hover: '#1A1A1A',
                    border: 'rgba(255,255,255,0.06)',
                    'border-hover': 'rgba(255,255,255,0.12)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
