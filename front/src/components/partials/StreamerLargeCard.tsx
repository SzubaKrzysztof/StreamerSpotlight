import { Box, Typography, IconButton, Button, Container } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Link, useNavigate } from 'react-router-dom';
import localImage from '../../../src/assets/images/streamer.png';
import SocialMediaIcon from './Small/SocialMediaIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Streamer } from '../types';

interface StreamerLargeCardProps {
    streamer: Streamer;
}

export const StreamerLargeCard: React.FC<StreamerLargeCardProps> = ({ streamer }) => {
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
                    <Button variant="outlined">
                        <ArrowUpwardIcon sx={{ color: 'green' }} />
                    </Button>
                    <Typography variant="h6">{streamer.votes}</Typography>
                    <Button variant="outlined">
                        <ArrowDownwardIcon sx={{ color: 'red' }} />
                    </Button>
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
