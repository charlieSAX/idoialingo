/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        paper2: 'var(--paper2)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        card: 'var(--card)',
        line: 'var(--line)',
        'line-d': 'var(--line-d)'
      },
      fontFamily: {
        ui: ['"Hanken Grotesk"', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
        hero: ['var(--font-hero)', 'serif'],
        han: ['"Noto Sans HK"', 'sans-serif']
      }
    }
  },
  plugins: []
};
