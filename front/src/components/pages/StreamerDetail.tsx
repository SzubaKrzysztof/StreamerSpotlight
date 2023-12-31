import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useFetch } from '../../helpers/useFetch';
import PageLayout from '../layout/PageLayout';
import { StreamerLargeCard } from '../partials/StreamerLargeCard';
import LoadingPage from './LoadingPage';

const StreamerDetail: React.FC = () => {
    let params = useParams<Record<string, string | undefined>>();

    const [streamerId, setStreamerId] = useState<string | undefined>(params.streamerId);

    useEffect(() => {
        setStreamerId(params.streamerId);
    }, [params.streamerId]);
    const { data, loading, error, refetch } = useFetch(`streamer/`, streamerId);

    if (loading) {
        return <LoadingPage pageName={'streamerDetail'} />;
    }
    if (error) {
        return <Typography variant="h4">Error: {error.message}</Typography>;
    }
    if (!data) {
        return <Typography variant="h4">No data</Typography>;
    }
    return (
        <PageLayout title={data.name} description={''} keywords={''}>
            <Container>
                <Typography variant="h2" sx={{ mt: 2, mb: 2 }}>
                    Streamer Details
                </Typography>
                <StreamerLargeCard streamer={data} refetch={refetch} />
            </Container>
        </PageLayout>
    );
};

export default StreamerDetail;
