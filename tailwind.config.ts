import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Slate-based dark palette used throughout the dashboard
        surface: {
          DEFAULT: "#0f172a",  // slate-900
          card: "#1e293b",     // slate-800
          border: "#334155",   // slate-700
          muted: "#475569",    // slate-600
        },
        brand: {
          DEFAULT: "#6366f1",  // indigo-500
          hover: "#818cf8",    // indigo-400
          muted: "#312e81",    // indigo-900
        },
        status: {
          healthy: "#22c55e",   // green-500
          degraded: "#f59e0b",  // amber-500
          down: "#ef4444",      // red-500
          unknown: "#6b7280",   // gray-500
        },
      },
    },
  },
  plugins: [],
};

export default config;
