module.exports = {
  mode: 'jit',
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: [
        /data-theme$/,
      ]
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'light': {
          "primary": "#5c7f67",
          "primary-focus": "#48614f",
          "primary-content": "#ffffff",
          "secondary": "#ecf4e7",
          "secondary-focus": "#cde2c1",
          "secondary-content": "#24331a",
          "accent": "#fae5e5",
          "accent-focus": "#f4bebe",
          "accent-content": "#322020",
          "neutral": "#5d5656",
          "neutral-focus": "#2a2727",
          "neutral-content": "#e9e7e7",
          "base-100": "#e3d9d3",
          "base-200": "#d1cccc",
          "base-300": "#b9b1b1",
          "base-content": "#100f0f",
          "info": "#2094f3",
          "success": "#009485",
          "warning": "#ff9900",
          "error": "#ff5724",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem"
        }
      },
      {
        'dark': {
          "primary": "#1eb854",
          "primary-focus": "#178c40",
          "primary-content": "#ffffff",
          "secondary": "#1fd65f",
          "secondary-focus": "#18aa4b",
          "secondary-content": "#ffffff",
          "accent": "#d99330",
          "accent-focus": "#b57721",
          "accent-content": "#ffffff",
          "neutral": "#110e0e",
          "neutral-focus": "#060404",
          "neutral-content": "#ffffff",
          "base-100": "#171212",
          "base-200": "#110e0e",
          "base-300": "#060404",
          "base-content": "#ffffff",
          "--rounded-btn": "1.9rem",
          "info": "#66c6ff",
          "success": "#87d039",
          "warning": "#e2d562",
          "error": "#ff6f6f"
        }
      }
    ],
  }
}
