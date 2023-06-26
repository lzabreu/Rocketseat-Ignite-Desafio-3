/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#071422',
        brand: {
          blue: '#3294f8',
        },
        base: {
          span: '#7b96b2',
          text: '#afc2d4',
          label: '#3a536b',
          subtitle: '#c4d4e3',
          profile: '#0b1b2b',
          post: '#112131',
          input: '#040f1a',
          border: '#1c2f41',
          title: '#e7edf4',
        },
      },
      fontSize: {
        titleLarge: '1.5rem',
        titleMedium: '1.25rem',
        titleSmall: '1.125rem',
        textMedium: '1rem',
        textSmall: '0.875rem',
      },
    },
  },
  fontFamily: {
    sans: ['Nunito', 'sans-serif'],
  },

  plugins: [],
}
