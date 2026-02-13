// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/app/**/*.{js,jsx,ts,tsx}",
//     "./src/components/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//         colors: {
//                         primary: '#2563eb',
//                         secondary: '#db2777',
//                         dark: '#0f172a',
//                         surface: '#f8fafc'
//                     },
//                     fontFamily: {
//                         sans: ['Inter', 'sans-serif'],
//                         heading: ['Poppins', 'sans-serif'],
//                     }
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors: {
                        primary: '#2563eb',
                        secondary: '#db2777',
                        dark: '#0f172a',
                        surface: '#f8fafc'
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        heading: ['Poppins', 'sans-serif'],
                    }
    },
  },
  plugins: [],
}