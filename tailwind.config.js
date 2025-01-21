/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontSize: {
      title: [
        "120px",
        {
          lineHeight: "100px",
          letterSpacing: "16px",
          fontWeight: "700",
        },
      ],
    },
  },
  plugins: [],
};
