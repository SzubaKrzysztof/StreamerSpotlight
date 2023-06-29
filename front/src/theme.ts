import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#d9524a',
        },
        secondary: {
            main: '#2e2e31',
        },
        success: {
            main: '#cccccc',
        },
        warning: {
            main: '#76768c',
        },
        info: {
            main: '#ffe600',
        },
        text: {
            primary: '#363640',
        },
    },
    typography: {
        h1: {
            fontSize: 120,
            fontWeight: 600,
            letterSpacing: '0em',
            '@media (max-width:600px)': {
                fontSize: 60,
            },
            color: '#cccccc',
            textTransform: 'none',
        },
        h2: {
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: '0em',
            color: '#cccccc',
            textTransform: 'none',
        },
        h3: {
            fontSize: 72,
            fontWeight: 500,
            color: '#cccccc',
            textTransform: 'none',
        },
        h4: {
            fontWeight: 500,
            fontSize: 36,
            letterSpacing: '-0.01em',
            color: '#cccccc',
            textTransform: 'none',
        },
        h5: {
            fontSize: 24,
            fontWeight: 500,
            color: '#cccccc',
            textTransform: 'none',
        },
        h6: {
            fontWeight: 400,
            fontSize: 18,
            letterSpacing: '0em',
            lineHeight: 1.58,
            color: '#cccccc',
            textTransform: 'none',
        },

        subtitle1: {
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: '0.01em',
            color: '#363640',
            textTransform: 'none',
        },
        subtitle2: {
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 1.58,
            letterSpacing: '0em',
            color: '#363640',
            textTransform: 'none',
        },
        body1: {
            fontSize: 14,
            color: '#cccccc',
            textTransform: 'none',
        },
        body2: {
            fontSize: 14,
            letterSpacing: '0em',
            color: '#363640',
            textTransform: 'none',
        },
        caption: {
            fontSize: 14,
            letterSpacing: '0em',
            color: '#363640',
            textTransform: 'none',
        },
        button: {
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.67,
            letterSpacing: '0em',
            color: '#363640',
            textTransform: 'none',
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;
