import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, Snackbar } from '@mui/material';

import Logo from '../../assets/icons/Logo';
import { Link } from 'react-router-dom';
import UsersIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { UserListItem, UserItem } from '../partials/UserListItem';

const AdminPage: React.FC = () => {
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const sidebarLinkClasses = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textDecoration: 'none',
        padding: '5px 20px',
        borderRadius: '5px',

        cursor: 'pointer',

        marginBottom: '15px',
        '&:hover': {
            backgroundColor: '#777777',
        },
    };

    const iconButtonStyles = (isActive: boolean) => ({
        marginRight: 1,
        padding: '10px',

        color: isActive ? '#ffe600' : 'white',
        '&:hover': {
            color: '#ffe600',
        },
    });
    const typographyStyles = (isActive: boolean) => ({
        my: 'auto',
        color: isActive ? '#ffe600' : 'white',
    });

    return (
        <Box display="flex">
            <Box
                sx={{
                    backgroundColor: '#363640',
                    color: 'white',
                    minHeight: '100vh',
                    minWidth: '15vw',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ margin: 2 }}>
                    <Typography sx={{ backgroundColor: 'transparent', my: 9 }} variant="h4" gutterBottom>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                <Logo color="white" />
                            </Box>
                        </Link>
                    </Typography>
                </Box>

                <Box sx={{ margin: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            padding: '5px 20px',
                            mb: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ color: '#ee7203', textAlign: 'center' }} gutterBottom component="span">
                            You are logged in as{' '}
                            <Typography variant="h6" component="span" sx={{ color: 'lightblue' }}>
                                {localStorage.getItem('username')}
                            </Typography>
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 5, width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'end' }}>
                        <Button variant="contained" color="secondary">
                            <AccountBoxIcon sx={{ mr: 2 }} />
                            Logout
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
            <Container sx={{ my: 8, mx: 4 }}>
                <UserListItem user={item as UserItem} />
            </Container>
        </Box>
    );
};

export default AdminPage;
