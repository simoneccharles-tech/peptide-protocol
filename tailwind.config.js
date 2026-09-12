/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f2eee6',
        charcoal: '#281c18',
        terracotta: {
          DEFAULT: '#c76749',
          deep: '#a04130',
        },
        sage: {
          DEFAULT: '#c7d7c0',
          deep: '#607a60',
        },
        clay: '#edd1bf',
        paper: '#fdfaf4',
        ink: '#64544c',
        line: '#dbd3c6',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(67, 37, 26, 0.05), 0 12px 40px -16px rgba(67, 37, 26, 0.18)',
      },
      backgroundImage: {
        'hero-wash':
          'linear-gradient(180deg, #f2eee6 0%, color-mix(in oklab, #c7d7c0 35%, #f2eee6) 100%)',
      },
    },
  },
  plugins: [],
}
