/** @type {import('tailwindcss').Config} */
module.exports = 
{
  darkMode: 'class',
  content: 
  [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: 
  {
    extend:
    {
      perspective:
      {
        '1': '1px',
      },
      keyframes:
      {
        // Slides a doubled list by one copy for a seamless infinite loop.
        marquee:
        {
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation:
      {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
      },
      fontFamily:
      {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Menlo", "monospace"],
      },
      colors:
      {
        custom: 
        {
          colorPrimary: "var(--color-primary)",
          colorSecondary: "var(--color-secondary)",
          background: "var(--background)",
          textPrimary: "var(--text-primary)",
          textSecondary: "var(--text-secondary)"
        }
      }
    },
  },
  plugins: 
  [
    require("@tailwindcss/typography"),
  ],
}
