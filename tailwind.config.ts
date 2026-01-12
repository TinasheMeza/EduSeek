import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        // EduSeek Primary Colors
        primary: {
          DEFAULT: "hsl(197 71% 47%)", // #2196B4
          50: "hsl(197 71% 95%)",
          100: "hsl(197 71% 90%)",
          200: "hsl(197 71% 80%)",
          300: "hsl(197 71% 70%)",
          400: "hsl(197 71% 60%)",
          500: "hsl(197 71% 50%)",
          600: "hsl(197 71% 47%)", // Primary
          700: "hsl(197 71% 40%)",
          800: "hsl(197 71% 35%)",
          900: "hsl(197 71% 30%)",
        },
        accent: {
          DEFAULT: "hsl(142 76% 36%)", // emerald-600 #10B981
          50: "hsl(142 76% 95%)",
          100: "hsl(142 76% 90%)",
          200: "hsl(142 76% 80%)",
          300: "hsl(142 76% 70%)",
          400: "hsl(142 76% 50%)",
          500: "hsl(142 76% 45%)",
          600: "hsl(142 76% 36%)", // Accent
          700: "hsl(142 76% 30%)",
          800: "hsl(142 76% 25%)",
          900: "hsl(142 76% 20%)",
        },
        // Status colors
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 98%)",
        },
        success: {
          DEFAULT: "hsl(142 76% 36%)",
          foreground: "hsl(0 0% 98%)",
        },
        warning: {
          DEFAULT: "hsl(43 96% 56%)", // amber-400
          foreground: "hsl(0 0% 98%)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, hsl(197 71% 47%), hsl(142 76% 36%))',
        'gradient-card': 'linear-gradient(to bottom right, hsl(197 71% 95%), hsl(142 76% 95%))',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
};
export default config;
