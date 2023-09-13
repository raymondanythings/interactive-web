/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      base: ['Fjalla One', 'Noto Sans KR', 'sans-serif'],
    },
    extend: {
      colors: {
        border: 'var(--color-border)',
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
      },
      maxWidth: {
        base: '1920px',
      },
      border: {
        base: 'var(--border01)',
      },
    },
  },
  plugins: [],
}
