import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rice: '#F5F0E8',
        ink: '#2C2C2C',
        seal: '#C23B22',
        spring: { light: '#E8F5E9', accent: '#81C784' },
        summer: { light: '#FFFDE7', accent: '#FFD54F' },
        autumn: { light: '#FFF3E0', accent: '#FFB74D' },
        winter: { light: '#ECEFF1', accent: '#90A4AE' },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Noto Serif SC', 'serif'],
        brush: ['Ma Shan Zheng', 'cursive'],
      },
    },
  },
  plugins: [],
};
export default config;
