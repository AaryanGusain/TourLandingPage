/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'primary': '#e3e1d5',
                'accent': '#ffffff',
                'background-light': '#f6f8f8',
                'background-dark': '#000000',
                'beige-text': '#e3e1d5',
                'beige-dim': '#a3a195',
                'surface-dark': '#0a0a0a',
                'border-beige': '#383835',
            },
            fontFamily: {
                'display': ['Inter', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '0.25rem',
                'lg': '0.5rem',
                'xl': '0.75rem',
                'full': '9999px',
            },
        },
    },
    plugins: [],
}
