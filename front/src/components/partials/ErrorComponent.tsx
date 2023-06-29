import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ErrorPage: React.FC<{ error: any; errorInfo: any }> = ({ error, errorInfo }) => {
    const navigate = useNavigate();
    return (
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
            <Typography variant="h1">We have ERROR</Typography>
            <Typography variant="h2"> {error && error.toString()}</Typography>
            <Typography variant="h3">{errorInfo.componentStack}</Typography>
            <Button variant="outlined" size="large" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
                Back
            </Button>
        </Box>
    );
};

export default ErrorPage;
