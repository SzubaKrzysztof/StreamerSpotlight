import React from 'react';
import PageLayout from '../layout/PageLayout';
import { HeroBanner } from '../partials/Hero/HeroBanner';
import { Box } from '@mui/material';

const Home: React.FC = () => {
    return (
        <PageLayout title={'Streamer Spotlight'} description={'Here you can vote for your favorite streamer'} keywords={'streamer, vote, fun'}>
            {
                <>
                    <Box>
                        <HeroBanner heroTitle={'Welcome to'} heroSubtitle={'Streamer Spotlight'} />
                    </Box>
                </>
            }
        </PageLayout>
    );
};

export default Home;
