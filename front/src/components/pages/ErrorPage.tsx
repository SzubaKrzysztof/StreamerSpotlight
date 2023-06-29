import * as React from 'react';
import ErrorComponent from '../partials/ErrorComponent';
import PageLayout from '../layout/PageLayout';

const ErrorPage: React.FC<{ error: any; errorInfo: any }> = ({ error, errorInfo }) => {
    return (
        <PageLayout title={'Error'} description={'Error page'} keywords={'error'}>
            <ErrorComponent error={error} errorInfo={errorInfo} />
        </PageLayout>
    );
};

export default ErrorPage;
