module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      height: {
        header: '2.5rem',
        content: 'calc(100vh - 2.5rem)',
      },
    },
  },
  plugins: [],
};
