import { Skeleton } from '@mui/lab';
import React from 'react';
import PageLayout from '../layout/PageLayout';
import { HeroBanner } from '../partials/HeroBanner';
import { Box, Grid } from '@mui/material';
import { useFetch } from '../../helpers/useFetch';

const Home: React.FC = () => {
    const { data, loading, error } = useFetch(`/streamers`);

    return (
        <PageLayout title={'Streamer Spotlight'} description={'Here you can vote for your favorite streamer'} keywords={'streamer, vote, fun'}>
            {data ? (
                <>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container justifyContent="center">
                            <Grid item xs={12}>
                                <HeroBanner
                                    heroTitle={'Streamer Spotlight'}
                                    heroSubtitle={'Vote for your favorite streamer'}
                                    heroDescription={'Streamer Spotlight is a website where you can vote for your favorite streamer.'}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </>
            ): loading ? (
                <>
                    <Skeleton variant="rectangular" width="95vw" height="90vh" />
                </>
            )
            : error ? (
                <>
                    <p>Error</p>
                </>
            ) : null

            }
        </PageLayout>
    );
};

export default Home;
