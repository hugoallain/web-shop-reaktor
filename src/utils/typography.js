import Typography from 'typography';

const typography = new Typography({
    baseLineHeight: 1.2,
    googleFonts: [
        {
            name: 'Poppins',
            styles: [100, 200, 300, 400, 500, 600, 700, 800, 900]
        }
    ],
    headerFontFamily: ['Poppins', 'Helvetica', 'sans-serif'],
    bodyFontFamily: ['Poppins', 'Helvetica', 'sans-serif']
});

export default typography;
