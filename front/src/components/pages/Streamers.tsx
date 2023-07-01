import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { StreamerSmallCard } from '../partials/StreamerSmallCard';
import { useFetch } from '../../helpers/useFetch';
import { Streamer } from '../types';
import PageLayout from '../layout/PageLayout';
import StreamerDialog from '../partials/StreamerDialog';
import LoadingPage from './LoadingPage';

const Streamers: React.FC = () => {
    const [streamerMenuOpen, setStreamerMenuOpen] = React.useState(false);
    const [streamers, setStreamers] = useState<Streamer[]>([]);

    const { data, loading, error, refetch } = useFetch('streamers');

    useEffect(() => {
        if (data) {
            setStreamers(data);
        }
    }, [data]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetch();
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, [refetch]);

    const handleStreamerMenuToggle = () => {
        setStreamerMenuOpen(!streamerMenuOpen);
    };

    if (loading) {
        return <LoadingPage pageName={'streamerList'} />;
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
                    {streamers.map((streamer: Streamer) => (
                        <StreamerSmallCard key={streamer.id} streamer={streamer} />
                    ))}
                </Box>

                <Box>
                    <Button onClick={handleStreamerMenuToggle} variant="contained" color="primary" sx={{ textTransform: 'none', mt: 2 }}>
                        Submit new Streamer
                    </Button>
                </Box>
                <StreamerDialog open={streamerMenuOpen} onClose={handleStreamerMenuToggle} setStreamers={setStreamers} />
            </Container>
        </PageLayout>
    );
};

export default Streamers;
