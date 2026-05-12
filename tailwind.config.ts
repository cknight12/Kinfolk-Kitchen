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
        navy: '#2B4A9F',
        cream: '#FAF3E0',
        peach: '#FCECD8',
        olive: '#8A8A5C',
        blush: '#F2C4BE',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        dancing: ['var(--font-dancing)', 'cursive'],
        lato: ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'stripe-olive': "repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(138,138,92,0.13) 10px, rgba(138,138,92,0.13) 11px)",
        'stripe-pink': "repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(242,196,190,0.35) 10px, rgba(242,196,190,0.35) 11px)",
      },
    },
  },
  plugins: [],
}
export default config
