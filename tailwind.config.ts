import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Kenny Swaga custom colors
        obsidian: {
          DEFAULT: "hsl(var(--obsidian))",
          light: "hsl(var(--obsidian-light))",
        },
        champagne: {
          DEFAULT: "hsl(var(--champagne))",
          light: "hsl(var(--champagne-light))",
        },
        ivory: "hsl(var(--ivory))",
        platinum: "hsl(var(--platinum))",
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "text-reveal": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-15px) rotate(1deg)" },
          "75%": { transform: "translateY(15px) rotate(-1deg)" },
        },
        "tilt": {
          "0%, 100%": { transform: "rotateX(0) rotateY(0)" },
          "25%": { transform: "rotateX(2deg) rotateY(2deg)" },
          "75%": { transform: "rotateX(-2deg) rotateY(-2deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "fade-in-left": "fade-in-left 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "fade-in-right": "fade-in-right 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "scale-in": "scale-in 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "slide-up": "slide-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "text-reveal": "text-reveal 1s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "line-grow": "line-grow 1s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "float": "float 8s ease-in-out infinite",
        "tilt": "tilt 6s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
