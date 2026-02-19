import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Derived from #FCDAD9 (warm blush) ──
        bg:       '#FCDAD9',
        surface:  '#FAEAE9',
        border:   '#F5C0BE',
        selected: '#FDEEED',
        accent:   '#B5302A',
        accent2:  '#D94F48',
        accent3:  '#F07470',
        deep:     '#2C0A09',
        ink:      '#3D1614',
        muted:    '#8C4F4C',
        subtle:   '#C49A98',
        gold:     '#D4943A',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        mono:     ['DM Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50':        { transform: 'translateY(-30px) scale(1.05)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          from: { opacity: '0', transform: 'translateY(-16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        confettiFall: {
          from: { opacity: '1', transform: 'translateY(0) rotate(0deg) scale(1)' },
          to:   { opacity: '0', transform: 'translateY(120px) rotate(360deg) scale(0.3)' },
        },
        shakeX: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%':     { transform: 'translateX(-6px)' },
          '40%':     { transform: 'translateX(6px)' },
          '60%':     { transform: 'translateX(-4px)' },
          '80%':     { transform: 'translateX(4px)' },
        },
      },
      animation: {
        float:        'float 12s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out 4s infinite',
        'float-gold': 'float 12s ease-in-out 7s infinite',
        slideUp:      'slideUp 0.5s ease both',
        fadeDown:     'fadeDown 0.6s ease both',
        shakeX:       'shakeX 0.3s ease',
      },
      boxShadow: {
        card:   '0 4px 32px rgba(44,10,9,0.07), 0 1px 6px rgba(44,10,9,0.04)',
        teaser: '0 4px 32px rgba(44,10,9,0.08)',
        btn:    '0 4px 16px rgba(181,48,42,0.25)',
        'btn-hover': '0 10px 24px rgba(181,48,42,0.32)',
        notify: '0 4px 14px rgba(181,48,42,0.25)',
        opt:    '0 4px 16px rgba(181,48,42,0.10)',
      },
    },
  },
  plugins: [],
}

export default config
