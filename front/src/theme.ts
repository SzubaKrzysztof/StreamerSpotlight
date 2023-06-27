import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#363640',
        },
        secondary: {
            main: '#757575',
        },
        success: {
            main: '#aaaaaa',
        },
        warning: {
            main: '#ee7203',
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
            fontFamily: 'Recoleta Bold',
            fontSize: 120,
            fontWeight: 600,
            letterSpacing: '0em',
            '@media (max-width:600px)': {
                fontSize: 60,
            },
            color: '#363640',
            textTransform: 'none',
        },
        h2: {
            fontFamily: 'Recoleta Bold',
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: '0em',
            color: '#363640',
            textTransform: 'none',
        },
        h3: {
            fontFamily: 'Fira Sans',
            fontSize: 72,
            fontWeight: 500,
            color: '#363640',
            textTransform: 'none',
        },
        h4: {
            fontFamily: 'Fira Sans',
            fontWeight: 500,
            fontSize: 36,
            letterSpacing: '-0.01em',
            color: '#363640',
            textTransform: 'none',
        },
        h5: {
            fontFamily: 'Fira Sans',
            fontSize: 24,
            fontWeight: 500,
            color: '#363640',
            textTransform: 'none',
        },
        h6: {
            fontFamily: 'Fira Sans',
            fontWeight: 400,
            fontSize: 18,
            letterSpacing: '0em',
            lineHeight: 1.58,
            color: '#363640',
            textTransform: 'none',
        },

        subtitle1: {
            fontFamily: 'Fira Sans',
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: '0.01em',
            color: '#363640',
            textTransform: 'none',
        },
        subtitle2: {
            fontFamily: 'Fira Sans',
            fontSize: 12,
            fontWeight: 600,
            lineHeight: 1.58,
            letterSpacing: '0em',
            color: '#363640',
            textTransform: 'none',
        },
        body1: {
            fontFamily: 'Fira Sans',
            fontSize: 14,
            color: '#363640',
            textTransform: 'none',
        },
        body2: {
            fontFamily: 'Fira Sans',
            fontSize: 14,
            letterSpacing: '0em',
            color: '#363640',
            textTransform: 'none',
        },
        caption: {
            fontFamily: 'Fira Sans',
            fontSize: 14,
            letterSpacing: '0em',
            color: '#363640',
            textTransform: 'none',
        },
        button: {
            fontFamily: 'Fira Sans',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.67,
            letterSpacing: '0em',
            color: '#363640',
            textTransform: 'none',
        },
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    padding: 0,
                    margin: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    '@media (min-width: 600px)': {
                        paddingLeft: 0,
                        paddingRight: 0,
                    },
                    '@media (min-width: 1200px)': {
                        maxWidth: '1600px',
                    },
                },
            },
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;
