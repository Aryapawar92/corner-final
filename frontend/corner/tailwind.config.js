/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        appear: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      fontFamily: {
        poppins: ["Poppins"],
        roboto: ["Roboto"],
        space: ["Space Grotesk"],
        poly: ["Poly"],
        redhat: ["Red Hat Display"],
      },
      animation: {
        appear: "appear 1s ease-in-out forwards",
      },
    },
  },
  plugins: [require("daisyui")],
};
