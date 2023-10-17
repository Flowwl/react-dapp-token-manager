/** @type {(tailwindConfig: object) => object} */

// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        fontFamily: {
            sans: ["Roboto", "sans-serif"],
            title: ['Pixelify Sans', 'sans-serif'],
            button: ['Pixelify Sans', 'sans-serif']
        },
        extend: {
            colors: {
                "bg-900": "#141518",
                "bg-700": "#1e1f25",
                "text-deactivated": "#677096",
                "text-activated": "#cbcbca"
            }
        }
    },
    plugins: [
        require('tailwind-scrollbar')
    ]
});

