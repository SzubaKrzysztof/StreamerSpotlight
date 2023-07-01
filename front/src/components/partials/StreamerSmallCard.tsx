import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import localImage from '../../../src/assets/images/streamer.png';
import SocialMediaIcon from './Small/SocialMediaIcon';
import { Streamer } from '../types';
import { useIsSmallScreen } from '../../helpers/useScreenSize';

interface StreamerSmallCardProps {
    streamer: Streamer;
}

export const StreamerSmallCard: React.FC<StreamerSmallCardProps> = ({ streamer }) => {
    const isSmallScreen = useIsSmallScreen();

    const variant = isSmallScreen ? 'body1' : 'h6';
    const imageSize = isSmallScreen ? '70px' : '100px';
    const boxPadding = isSmallScreen ? 1 : 2;

    return (
        <Box display="flex" alignItems="center" sx={{ border: '1px solid gray', borderRadius: '15px', p: boxPadding }} mb={isSmallScreen ? 1 : 2}>
            <Box>
                <img src={streamer?.img || localImage} alt={streamer.name} style={{ borderRadius: '50%', width: imageSize, height: imageSize }} />
            </Box>
            <Box ml={isSmallScreen ? 1 : 2} mr="auto">
                <Typography variant={isSmallScreen ? 'h6' : 'h5'}>{streamer.name}</Typography>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography sx={{ mr: 1 }} variant="body1">
                        {streamer.platform}
                    </Typography>
                    <SocialMediaIcon service={streamer.platform} />
                </Box>
            </Box>

            <Typography ml={isSmallScreen ? 1 : 2} variant={variant}>
                Votes
            </Typography>
            <Box mx={isSmallScreen ? 2 : 4}>
                <Typography variant={variant}>{streamer.votes}</Typography>
            </Box>

            <Link to={`/streamer/${streamer.id}`}>
                <Button variant="contained" color="warning" size={isSmallScreen ? 'small' : 'large'}>
                    See Details
                </Button>
            </Link>
        </Box>
    );
};
