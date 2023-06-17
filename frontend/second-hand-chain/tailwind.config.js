module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],  
  
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: [{
      mytheme: {
      
"primary": "#3ccc37",
      
"secondary": "#acfc16",
      
"accent": "#6d8ce0",
      
"neutral": "#17151e",
      
"base-100": "#363636",
      
"info": "#2ba9e9",
      
"success": "#48d58c",
      
"warning": "#c27114",
      
"error": "#f9151d",
      },
    },],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
