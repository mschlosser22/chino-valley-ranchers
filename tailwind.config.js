module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    zIndex: {
      '0': 0,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50,
      '60': 60,
      'auto': 'auto',
    },
    extend: {
      fontFamily: {
        'ultra': ['Ultra'],
        'lato': ['Lato'],
        'din': ['din-condensed', 'sans-serif'],
      },
      colors: {
        'chinored': '#b01116',
        'chinoyellow': '#f9a115',
        'chinoblue': '#00608b',
        'chinodarkblue': '#303c4b',
        'chinoorange': '#f9a115',
        'chinogray': '#9f9f9f',
        'chinodarkgray': '#b6afa9',
        'chinodarkorange': '#f9a115',
        'chinobrown': '#5c311b',
        'ctagray': '#1a1818',
        'ctablue': '#004f76',
        'chinotan': '#f5e5c8',
        'chinolightblue': '#004f76',
      },
      lineHeight: {
        'body': '2.75rem',
        'heading-lh': '5.313rem',
        'heading-mobile': '4rem'
      },
      fontSize: {
        'heading': '4.969rem',
      },
      screens: {
        // 'xs': '475px',
        '2xl': '1280px',
        '3xl': '1664px',
      },
      backgroundImage: {
        'scratchBanner': "url('/images/scratchBanner.png')",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}