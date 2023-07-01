import { FC } from 'react';
import { YouTube, Twitter, Instagram, Facebook } from '@mui/icons-material';
import { FaTwitch, FaTiktok } from 'react-icons/fa';
import { ServiceName } from '../../types';

interface SocialMediaIconProps {
    service: ServiceName | string;
    large?: boolean;
}

const SocialMediaIcon: FC<SocialMediaIconProps> = ({ service, large }) => {
    const baseIconSize = 24;
    const iconSize = large ? baseIconSize * 2 : baseIconSize;

    const getServiceIcon = (service: ServiceName) => {
        switch (service) {
            case 'YouTube':
                return <YouTube style={{ color: 'red', fontSize: iconSize }} />;
            case 'Twitter':
                return <Twitter style={{ color: '#00acee', fontSize: iconSize }} />;
            case 'Instagram':
                return <Instagram style={{ color: '#C13584', fontSize: iconSize }} />;
            case 'Facebook':
                return <Facebook style={{ color: '#3b5998', fontSize: iconSize }} />;
            case 'Twitch':
                return <FaTwitch style={{ color: '#6441A4', fontSize: iconSize }} />;
            case 'TikTok':
                return <FaTiktok style={{ color: '#000000', fontSize: iconSize }} />;
            default:
                return null;
        }
    };

    return <div>{getServiceIcon(service)}</div>;
};

export default SocialMediaIcon;
