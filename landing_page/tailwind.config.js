/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Colors come from the design tokens in /pill_style.css. The raw RGB
            // triplet variables keep Tailwind's alpha modifiers (e.g. /10)
            // working for brand colors.
            colors: {
                brand: {
                    300: 'rgb(var(--brand-300-rgb) / <alpha-value>)',
                    400: 'rgb(var(--brand-400-rgb) / <alpha-value>)',
                    500: 'rgb(var(--brand-500-rgb) / <alpha-value>)',
                    600: 'rgb(var(--brand-600-rgb) / <alpha-value>)',
                },
                surface: {
                    DEFAULT: 'var(--surface)',
                    elevated: 'var(--surface-elevated)',
                    hover: 'var(--surface-hover)',
                    border: 'var(--border)',
                    'border-hover': 'var(--border-hover)',
                },
            },
            fontFamily: {
                sans: ['var(--font-sans)'],
            },
        },
    },
    plugins: [],
}
