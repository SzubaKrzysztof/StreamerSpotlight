import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';

interface PageLayoutProps {
    children: ReactNode;
    title: string;
    description: string;
    keywords: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title, description, keywords }) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Helmet>
            <Navbar />

            <main>
                <Box sx={{ position: 'relative', top: 0, left: 0 }}>
                    {children}
                    <Footer />
                </Box>
            </main>
        </>
    );
};

export default PageLayout;
