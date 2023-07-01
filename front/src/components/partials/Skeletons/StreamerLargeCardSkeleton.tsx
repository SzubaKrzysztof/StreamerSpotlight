import { Box, Container, Skeleton } from '@mui/material';

export const StreamerLargeCardSkeleton: React.FC = () => {
    const skeletonColor = { backgroundColor: '#525262' };

    return (
        <>
            <Container>
                <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start">
                    <Skeleton variant="text" width="40%" sx={skeletonColor} height={100} />
                </Box>
            </Container>
            <Container sx={{ border: '1px solid gray', borderRadius: '15px', p: 2, backgroundColor: '#131313' }}>
                <Box display="flex" flexDirection="column" gap={2} textAlign="center" justifyContent="center" alignItems="center">
                    <Box my={2}>
                        <Skeleton variant="circular" sx={skeletonColor} width={150} height={150} />
                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Skeleton variant="rectangular" sx={skeletonColor} width={50} height={50} />
                    </Box>
                    <Box display="flex" gap={3} flexDirection="row" justifyContent="center" alignItems="center">
                        <Skeleton variant="rectangular" sx={skeletonColor} width={50} height={50} />
                        <Skeleton variant="text" sx={skeletonColor} width="80px" />
                        <Skeleton variant="rectangular" sx={skeletonColor} width={50} height={50} />
                    </Box>

                    <Box mb={3}>
                        <Skeleton variant="rectangular" sx={skeletonColor} width="120px" height="40px" />
                    </Box>
                </Box>
            </Container>
        </>
    );
};
