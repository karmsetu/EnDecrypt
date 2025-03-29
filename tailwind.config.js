/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                pastel: {
                    blue: '#A7C7E7',
                    pink: '#FFD1DC',
                    mint: '#98FF98',
                    lavender: '#E6E6FA',
                    peach: '#FFDAB9',
                    yellow: '#FAF884',
                    coral: '#F8A488',
                    green: '#C1E1C1',
                    purple: '#C3B1E1',
                    gray: '#D3D3D3',
                    coffee: '#F1F0E8',
                    mocha: '#E5E1DA',
                    'dark-blue': '#295F98',
                },
            },
        },
    },
    plugins: [],
};
