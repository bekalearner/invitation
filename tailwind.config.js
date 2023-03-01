/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.{ejs,html}"],
  theme: {
    fontFamily: {
      display: ['Marmelad', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'invitation-pattern': `url('../images/bg.png')`,
        'invitation-background': `url('../images/background.jpg')`
      }
    },
  },
  plugins: [],
}
