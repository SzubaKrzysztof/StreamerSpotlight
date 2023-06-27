import { Box, Grid, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

type HeroSectionProps = {
    heroTitle: string | undefined;
    heroSubtitle?: string;
    heroDescription?: string;
    heroBackground?: string;
    heroGraphic?: JSX.Element;
};

export const HeroBanner: FunctionComponent<HeroSectionProps> = ({ heroTitle, heroSubtitle, heroDescription, heroGraphic }) => {
    return (
        <div>
            <Box
                sx={{
                    background: '#2e2e31',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <Grid container sx={{ mb: 0 }}>
                    <Grid item xs={12} lg={8}>
                        <Box>
                            <Typography
                                sx={{
                                    mx: { xs: 2.5, md: 0 },
                                    ml: { md: 10, xl: 20 },
                                    mb: 5,
                                }}
                                color="white"
                                variant="h1"
                            >
                                {heroTitle}
                            </Typography>

                            {heroSubtitle ? (
                                <Typography sx={{ mx: { xs: 2.5, md: 0 }, ml: { md: 10, xl: 20 } }} color="white" variant="h5">
                                    {heroSubtitle}
                                </Typography>
                            ) : null}
                        </Box>
                    </Grid>
                    <Grid sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }} item xs={12} lg={4}>
                        <Box sx={{ ml: { xs: 2, md: 10, xl: 20 }, my: { xs: 2.5, lg: 'auto' } }}>
                            <Typography>{heroGraphic}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};
