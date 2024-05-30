/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./source/**/*.{html,ts}"],
    theme: {
        extend: {
            colors: {
                "c-1": "#86c8e0",
                "c-1.1": "#679aab",
                customBlue: 'rgb(107, 160, 179)',
            },
        },
    },
    plugins: [],
};
