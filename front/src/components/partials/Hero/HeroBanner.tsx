import { Box, Button, Grid, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import './Hero.css';
import Logo from '../../../assets/icons/Logo';
import { Link } from 'react-router-dom';

type HeroSectionProps = {
    heroTitle: string | undefined;
    heroSubtitle: string;
};

export const HeroBanner: FunctionComponent<HeroSectionProps> = ({ heroTitle, heroSubtitle }) => {
    return (
        <Box
            sx={{
                backgroundColor: 'secondary.main',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100vw',
            }}
        >
            <Box>
                <Typography className="gradient">by Christopher Szuba</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: { md: '15px', sm: '30px' },
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Box display="flex" className="wrapper" justifyContent="center" alignContent="center">
                                <Box sx={{ fontSize: { sm: '30px', md: '40px' } }} className="rotating">
                                    <Typography color="white" sx={{ fontSize: { sm: '30px', md: '40px' } }}>
                                        {heroSubtitle}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid display="flex" justifyContent="center" alignContent="center" item xs={12} md={4}>
                            <Link to={'./streamers'}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{
                                        padding: '10px',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Typography sx={{ mr: 2, color: 'white', fontSize: { sm: '14px', md: '20px' } }}>Streamers</Typography>
                                    <Logo color="black" />
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};
