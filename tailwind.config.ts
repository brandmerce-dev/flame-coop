import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        gold: 'var(--gold)',
        'gold-light': 'var(--gold-light)',
        'gold-faint': 'var(--gold-faint)',
        'gold-hover': 'var(--gold-hover)',
        // Background
        cream: 'var(--cream)',
        cream2: 'var(--cream2)',
        obsidian: 'var(--obsidian)',
        obsidian2: 'var(--obsidian2)',
        // Text
        'text-primary': 'var(--text)',
        'text-mid': 'var(--mid)',
        'text-light': 'var(--light)',
        'heading': 'var(--black)',
        'heading-alt': 'var(--heading-alt)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      maxWidth: {
        container: '1140px',
        narrow: '720px',
        wide: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
