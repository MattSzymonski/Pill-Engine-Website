/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'pill-red': '#dc2626',
                'pill-red-light': '#ef4444',
                'pill-red-dark': '#991b1b',
                'rust-orange': '#ff6b35',
            }
        },
    },
    plugins: [],
}
