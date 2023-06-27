import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
            }}
            textAlign="center"
        >
            <Box id="wrapper" sx={{ display: 'flex', flexDirection: 'column', width: '100%', mx: { xs: 2.5, lg: 5 } }}>
                <Box
                    id="main"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 5,
                        width: '100%',
                    }}
                >
                    <Typography variant="subtitle2">About us</Typography>
          
                </Box>
                <Box
                    id="first"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'space-between',
                        gap: 5,
                    }}
                >
                    <Box id="second" sx={{ display: 'flex', gap: 5, opacity: '0.5' }}>
                        <Typography variant="subtitle2">EU Projects</Typography>

                    </Box>
                    <Box id="last" sx={{ display: 'flex', gap: 3.25 }}>
                        <Typography variant="subtitle2">Facebook</Typography>

                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
