/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0f19', /* Very dark navy/black background */
        card: '#151a27', /* Slightly lighter card background */
        border: '#1e293b', /* Borders for cards */
        textPrimary: '#ffffff',
        textSecondary: '#94a3b8',
        primary: '#4338ca', /* Deep indigo/blue for accents */
        primaryHighlight: '#5b51e0',
        success: '#10b981', 
        successBg: 'rgba(16, 185, 129, 0.1)',
        danger: '#ef4444',
        dangerBg: 'rgba(239, 68, 68, 0.1)',
      }
    },
  },
  plugins: [],
}
