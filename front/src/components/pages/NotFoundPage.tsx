import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageLayout from '../layout/PageLayout';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <PageLayout title="Not found" description={''} keywords={''}>
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        justifyContent: 'center',
                        height: '100vh',
                    }}
                >
                    <Typography variant="h1">404</Typography>
                    <Typography variant="h4">Not Found</Typography>
                    <Button variant="outlined" size="large" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Box>
            </Container>
        </PageLayout>
    );
};

export default NotFoundPage;
