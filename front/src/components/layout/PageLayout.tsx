import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box, Container } from '@mui/material';

interface PageLayoutProps {
    children: ReactNode;
    title: string;
    description: string;
    keywords: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title, description, keywords }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Helmet>
            <Navbar />
            <Box
                component="main"
                sx={{
                    flex: '1',
                }}
            >
                <Container maxWidth={false} sx={{ py: 12, mx: 0 }}>
                    {children}
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default PageLayout;
