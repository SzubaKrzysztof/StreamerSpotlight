import { Box, Typography, IconButton, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import localImage from '../../../src/assets/images/streamer.png';
import SocialMediaIcon from './Small/SocialMediaIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Streamer } from '../types';
import VoteButton from './Small/VoteButton';

interface StreamerLargeCardProps {
    streamer: Streamer;
    refetch: () => void;
}

export const StreamerLargeCard: React.FC<StreamerLargeCardProps> = ({ streamer, refetch }) => {
    const navigate = useNavigate();
    return (
        <Container sx={{ border: '1px solid gray', borderRadius: '15px', px: 2 }}>
            <Box display="flex" flexDirection="column" gap={3} textAlign="center">
                <Box my={2}>
                    <img src={streamer?.img || localImage} alt={streamer.name} style={{ borderRadius: '50%', width: '200px', height: '200px' }} />
                    <Typography mt={2} variant="h4">
                        {streamer.name}
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center">
                    <SocialMediaIcon large service={streamer.platform} />
                </Box>
                <Box display="flex" gap={3} flexDirection="row" justifyContent="center" alignItems="center">
                    <VoteButton streamerId={streamer.id} voteType="upVote" refetch={refetch} />
                    <Typography variant="h4">{streamer.votes}</Typography>
                    <VoteButton streamerId={streamer.id} voteType="downVote" refetch={refetch} />
                </Box>
                <Typography variant="h6">{streamer.description}</Typography>
                <Box mb={3}>
                    <Button variant="outlined" size="large" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
