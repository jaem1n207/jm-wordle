/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  screens: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      gray: [
        '#f7fafc',
        '#edf2f7',
        '#e2e8f0',
        '#cbd5e0',
        '#a0aec0',
        '#718096',
        '#4a5568',
        '#2d3748',
        '#1a202c',
        '#3A3A3C',
      ],
      red: [
        '#fff5f5',
        '#fed7d7',
        '#feb2b2',
        '#fc8181',
        '#f56565',
        '#e53e3e',
        '#c53030',
        '#9b2c2c',
        '#742a2a',
      ],
      orange: [
        '#fffaf0',
        '#feebc8',
        '#fbd38d',
        '#f6ad55',
        '#ed8936',
        '#dd6b20',
        '#c05621',
        '#9c4221',
        '#7b341e',
      ],
      yellow: [
        '#fffff0',
        '#fefcbf',
        '#faf089',
        '#f6e05e',
        '#ecc94b',
        '#d69e2e',
        '#b7791f',
        '#975a16',
        '#744210',
      ],
      green: [
        '#f0fff4',
        '#c6f6d5',
        '#9ae6b4',
        '#68d391',
        '#48bb78',
        '#38a169',
        '#2f855a',
        '#276749',
        '#22543d',
      ],
      teal: [
        '#e6fffa',
        '#b2f5ea',
        '#81e6d9',
        '#4fd1c5',
        '#38b2ac',
        '#319795',
        '#2c7a7b',
        '#285e61',
        '#234e52',
      ],
      blue: [
        '#ebf8ff',
        '#bee3f8',
        '#90cdf4',
        '#63b3ed',
        '#4299e1',
        '#3182ce',
        '#2b6cb0',
        '#2c5282',
        '#2a4365',
      ],
      indigo: [
        '#ebf4ff',
        '#c3dafe',
        '#a3bffa',
        '#7f9cf5',
        '#667eea',
        '#5a67d8',
        '#4c51bf',
        '#434190',
        '#3c366b',
      ],
      purple: [
        '#faf5ff',
        '#e9d8fd',
        '#d6bcfa',
        '#b794f4',
        '#9f7aea',
        '#805ad5',
        '#6b46c1',
        '#553c9a',
        '#44337a',
      ],
      pink: {
        100: '#fff5f7',
        200: '#fed7e2',
        300: '#fbb6ce',
        400: '#f687b3',
        500: '#ed64a6',
        600: '#d53f8c',
        700: '#b83280',
        800: '#97266d',
        900: '#702459',
      },
      grayDark: '#2d3748',
      text: '#2d3748',
      background: '#fff',
      primary: '#2b6cb0',
      primaryHover: '#2c5282',
      secondary: '#718096',
      muted: '#e2e8f0',
      success: '#9ae6b4',
      info: '#63b3ed',
      warning: '#faf089',
      danger: '#feb2b2',
      light: '#f7fafc',
      dark: '#181818',
      textMuted: '#718096',
      fail: '#a0aec0',
      half: '#ecc94b',
      borderGray: '#3A3A3C',
    },
  },
  extend: {
    theme: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.light'),
            h1: {
              fontWeight: '700',
              margin: 0,
            },
            h2: {
              fontWeight: '700',
            },
            h3: {
              fontWeight: '700',
              margin: 0,
            },
            h4: {
              fontWeight: '700',
              margin: 0,
            },
            h5: {
              fontWeight: '700',
              margin: 0,
            },
            h6: {
              fontWeight: '700',
              margin: 0,
            },
            p: {
              fontWeight: '400',
              margin: 0,
            },
            a: {
              color: theme('colors.primary'),
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.primaryHover'),
              },
            },
          },
        },
      }),
      transitions: {
        property: {
          none: 'none',
          all: 'all',
          default:
            'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
          colors: 'background-color, border-color, color, fill, stroke',
          opacity: 'opacity',
          shadow: 'box-shadow',
          transform: 'transform',
        },
        timingFunction: {
          linear: 'linear',
          in: 'cubic-bezier(0.4, 0, 1, 1)',
          out: 'cubic-bezier(0, 0, 0.2, 1)',
          'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
        duration: {
          75: '75ms',
          100: '100ms',
          150: '150ms',
          200: '200ms',
          300: '300ms',
          500: '500ms',
          700: '700ms',
          1000: '1000ms',
        },
      },
      scale: {
        0: '0',
        50: '.5',
        75: '.75',
        90: '.9',
        95: '.95',
        100: '1',
        105: '1.05',
        110: '1.1',
        125: '1.25',
        150: '1.5',
      },
      shadow: {
        toast: 'box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.12)',
        card: 'box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07)',
        popup: 'box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.2)',
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
      },
      borderRadius: {
        0: '0',
        2: '2px',
        4: '4px',
        8: '8px',
        16: '16px',
        px: '1px',
      },
      height: {
        header: '3rem',
        content: 'calc(100vh - 2.5rem)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
};
