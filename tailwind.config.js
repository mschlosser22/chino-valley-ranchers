module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'ultra': ['ultraregular'],
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
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
