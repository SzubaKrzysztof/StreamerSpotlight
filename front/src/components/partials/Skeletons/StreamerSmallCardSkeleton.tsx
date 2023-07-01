import { Box, Skeleton, Container } from '@mui/material';
import { useIsSmallScreen } from '../../../helpers/useScreenSize';

export const StreamerSmallCardSkeleton: React.FC = () => {
    const isSmallScreen = useIsSmallScreen();

    const skeletonColor = { backgroundColor: '#525262' };
    const imageSize = isSmallScreen ? '50px' : '80px';
    const boxPadding = isSmallScreen ? 1 : 2;
    const skeletonWidth = isSmallScreen ? '40%' : '80px';
    const buttonWidth = isSmallScreen ? '100px' : '120px';
    const buttonHeight = isSmallScreen ? '30px' : '40px';

    return (
        <Container>
            <Box
                display="flex"
                alignItems="center"
                sx={{ backgroundColor: '#131313', border: '1px solid gray', borderRadius: '15px', p: boxPadding }}
                mb={isSmallScreen ? 1 : 2}
            >
                <Box>
                    <Skeleton variant="circular" sx={skeletonColor} width={imageSize} height={imageSize} />
                </Box>
                <Box ml={isSmallScreen ? 1 : 2} mr="auto">
                    {/* <Skeleton variant="text" sx={skeletonColor} width="80%" /> */}
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Skeleton variant="text" sx={skeletonColor} width={isSmallScreen ? '10px' : '20px'} />
                    </Box>
                </Box>

                <Skeleton variant="text" sx={skeletonColor} width={skeletonWidth} />
                <Box mx={isSmallScreen ? 2 : 4}>
                    <Skeleton variant="text" sx={skeletonColor} width={isSmallScreen ? '30px' : '40px'} />
                </Box>

                <Skeleton variant="rectangular" sx={skeletonColor} width={buttonWidth} height={buttonHeight} />
            </Box>
        </Container>
    );
};
