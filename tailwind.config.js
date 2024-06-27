module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1976D2",
        secondary: "#1556A0",
        accent: "#fff", // Example accent color
      },
      screens: {
        xs: { max: "767px" }, // Custom breakpoint for 430px and lower
      },
    },
  },
  plugins: [],
};
