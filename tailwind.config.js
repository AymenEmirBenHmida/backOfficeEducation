module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "767px" }, // Custom breakpoint for 430px and lower
      },
    },
  },
  plugins: [],
};
