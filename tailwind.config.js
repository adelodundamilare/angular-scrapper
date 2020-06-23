module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        primary: "#4ad295",
        primaryDark: "#0b2239",
        accent: "#ffb229",
      },
      height: {
        banner: "600px",
        "85vh": "85vh",
        "15vh": "15vh",
      },
      maxWidth: {
        wrap: "1400px",
      },
      screens: {
        sm: { max: "640px" },
        md: { min: "641px", max: "768px" },
        lg: { min: "769px", max: "1024px" },
        xl: { min: "1025px", max: "1280px" },
      },
    },
  },
  variants: {},
  plugins: [],
};
