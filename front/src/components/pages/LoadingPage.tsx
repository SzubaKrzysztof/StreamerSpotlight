import * as React from 'react';
import PageLayout from '../layout/PageLayout';
import DefaultSkeleton from '../partials/Skeletons/DefaultSkeleton';
import { StreamerListSkeleton } from '../partials/Skeletons/StreamerListSkeleton';
import { StreamerLargeCardSkeleton } from '../partials/Skeletons/StreamerLargeCardSkeleton';

interface LoadingPageProps {
    pageName: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ pageName }) => {
    const renderSkeleton = () => {
        if (pageName === 'streamerList') {
            return <StreamerListSkeleton />;
        } else if (pageName === 'streamerDetail') {
            return <StreamerLargeCardSkeleton />;
        } else {
            return <DefaultSkeleton />;
        }
    };

    return (
        <PageLayout title={'Loading'} description={'Loading page'} keywords={'loading'}>
            {renderSkeleton()}
        </PageLayout>
    );
};

export default LoadingPage;
