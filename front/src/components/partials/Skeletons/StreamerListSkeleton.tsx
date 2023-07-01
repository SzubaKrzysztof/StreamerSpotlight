import React from 'react';
import { Box, Container, Skeleton } from '@mui/material';
import { StreamerSmallCardSkeleton } from './StreamerSmallCardSkeleton';

export const StreamerListSkeleton: React.FC = () => {
    const skeletonColor = { backgroundColor: '#525262' };
    return (
        <Container>
            <Container>
                <Box display="flex" flexDirection="column" justifyContent="start" alignItems="start">
                    <Skeleton variant="text" width={'40%'} sx={skeletonColor} height={70} />
                </Box>
            </Container>
            <Box display="flex" flexDirection="column" gap={2}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <StreamerSmallCardSkeleton key={i} />
                ))}
            </Box>
        </Container>
    );
};
