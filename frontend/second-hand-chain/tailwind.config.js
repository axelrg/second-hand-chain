module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],  
  
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: ["halloween"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
