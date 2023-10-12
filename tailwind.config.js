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
        },
        extend: {
            colors: {
                bg: "#141518"
            }
        }
    },
    plugins: []
});

