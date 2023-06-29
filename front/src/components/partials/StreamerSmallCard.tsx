import { Box, Typography, IconButton, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Link } from 'react-router-dom';
import localImage from '../../../src/assets/images/streamer.png';
import SocialMediaIcon from './Small/SocialMediaIcon';
import { Streamer } from '../types';

interface StreamerSmallCardProps {
    streamer: Streamer;
}

export const StreamerSmallCard: React.FC<StreamerSmallCardProps> = ({ streamer }) => {
    return (
        <Box display="flex" alignItems="center" sx={{ border: '1px solid gray', borderRadius: '15px', px: 2 }} mb={2}>
            <Box>
                <img src={streamer?.img || localImage} alt={streamer.name} style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
            </Box>
            <Box ml={2} mr="auto">
                <Typography variant="h5">{streamer.name}</Typography>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography sx={{ mr: 2 }} variant="body1">
                        {streamer.platform}
                    </Typography>
                    <SocialMediaIcon service={streamer.platform} />
                </Box>
            </Box>

            <Typography variant="h6">Votes</Typography>
            <Box mx={4}>
                <Typography variant="h6">{streamer.votes}</Typography>
            </Box>

            <Link to={`/streamer/${streamer.id}`}>
                <Typography variant="h6" mx={2}>
                    <Button variant="contained" color="warning" size="large">
                        See Details
                    </Button>
                </Typography>
            </Link>
        </Box>
    );
};
