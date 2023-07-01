import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const name = 'Christopher';

    return (
        <Container sx={{ mx: 0, px: 0 }} maxWidth={false}>
            <Box
                component="footer"
                sx={{
                    backgroundColor: 'success.main',
                    position: 'relative',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                }}
                textAlign="center"
            >
                <Box id="wrapper" sx={{ display: 'flex', flexDirection: 'column', width: '100%', px: { xs: 2.5, lg: 5 } }}>
                    <Box
                        id="main"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 5,
                            width: '100%',
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{ fontSize: { xs: '10px', md: '16px' } }}
                        >{`${day}.${month}.${year} - ${name} | © All rights NOT reserved :)`}</Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Footer;
