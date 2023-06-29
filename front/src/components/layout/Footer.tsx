import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const name = 'Christopher';

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'success.main',
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
                    <Typography variant="subtitle1">{`${day}.${month}.${year} - ${name} | © All rights NOT reserved :)`}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
