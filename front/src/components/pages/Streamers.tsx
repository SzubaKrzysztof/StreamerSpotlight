import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { StreamerSmallCard } from '../partials/StreamerSmallCard';
import { useFetch } from '../../helpers/useFetch';
import { Streamer } from '../types';
import PageLayout from '../layout/PageLayout';
import StreamerDialog from '../partials/StreamerDialog';

const Streamers: React.FC = () => {
    const [streamerMenuOpen, setStreamerMenuOpen] = React.useState(false);
    const { data, loading, error } = useFetch('streamers');

    const handleStreamerMenuToggle = () => {
        setStreamerMenuOpen(!streamerMenuOpen);
    };

    if (loading) {
        return <Typography variant="h4">Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h4">Error: {error.message}</Typography>;
    }

    return (
        <PageLayout title={'Streamer Spotlight'} description={'List of streamers'} keywords={'streamer, vote, fun'}>
            <Container>
                <Typography variant="h2" sx={{ mt: 2, mb: 2 }}>
                    Streamers list
                </Typography>
                <Box>
                    {data?.map((streamer: Streamer) => (
                        <StreamerSmallCard key={streamer.id} streamer={streamer} />
                    ))}
                </Box>

                <Box>
                    <Button onClick={handleStreamerMenuToggle} variant="contained" size="large" color="primary" sx={{ textTransform: 'none', mt: 2 }}>
                        Submit new Streamer
                    </Button>
                </Box>
                <StreamerDialog open={streamerMenuOpen} onClose={handleStreamerMenuToggle} />
            </Container>
        </PageLayout>
    );
};

export default Streamers;
