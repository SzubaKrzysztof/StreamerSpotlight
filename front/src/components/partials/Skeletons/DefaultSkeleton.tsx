import React from 'react';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';

const DefaultSkeleton: React.FC = () => {
    return (
        <Box padding={2}>
            <Skeleton variant="text" height={40} />
            <Skeleton variant="rectangular" width={'100%'} height={200} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
        </Box>
    );
};

export default DefaultSkeleton;
