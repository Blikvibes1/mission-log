import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          DEFAULT: "#0B0F19",
          panel: "#121826",
          line: "#232B3D",
        },
        gold: {
          DEFAULT: "#E8B84B",
          dim: "#8A6E2F",
        },
        signal: {
          DEFAULT: "#4C8DFF",
          dim: "#2C4C8F",
        },
        ink: {
          DEFAULT: "#E7E9EE",
          muted: "#8992A6",
          faint: "#4B5468",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        starfield:
          "radial-gradient(1px 1px at 20px 30px, rgba(231,233,238,0.4) 50%, transparent 50%), radial-gradient(1px 1px at 90px 120px, rgba(231,233,238,0.3) 50%, transparent 50%), radial-gradient(1.5px 1.5px at 160px 60px, rgba(231,233,238,0.5) 50%, transparent 50%), radial-gradient(1px 1px at 220px 180px, rgba(231,233,238,0.3) 50%, transparent 50%)",
      },
    },
  },
  plugins: [],
};
export default config;
