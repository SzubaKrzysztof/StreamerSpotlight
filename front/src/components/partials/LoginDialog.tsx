import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, Snackbar, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { CircularProgress } from '@mui/material';
import { Alert } from '@mui/material';
import Logo from '../../assets/icons/Logo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../const/basicUrl.js';

type LoginDialogProps = {
    open: boolean;
    onClose: () => void;
};

const url: string = baseUrl.url;

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'success'>('error');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const usernameValid = validateUsername(username);
        const passwordValid = validatePassword(password);

        if (usernameValid && passwordValid) {
            setSubmitting(true);

            try {
                const response = await axios.post(
                    `${url}user/login`,
                    {
                        username: username,
                        password: password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                );
                setSubmitting(false);
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                if (response.status === 200 && response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('username', response.data.user.username);
                    navigate('/admin');
                }
            } catch (error: any) {
                setSubmitting(false);
                setSnackbarSeverity('error');
                setSnackbarMessage(error.response ? error.response.data : 'Error during login');
                setSnackbarOpen(true);
            } finally {
                onClose();
            }
        }
    };

    const validateUsername = (username: string): boolean => {
        if (username.length < 5) {
            setUsernameError('Username must be at least 5 characters long');
            return false;
        }

        setUsernameError('');
        return true;
    };

    const validatePassword = (password: string): boolean => {
        setPasswordError('');
        return true;
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <DialogTitle>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '80%',
                        }}
                    >
                        <Box>Login to your account</Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%' }}>
                            <Logo color="black" />
                        </Box>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '35px',
                            p: { xs: 2, md: 8 },
                        }}
                    >
                        <TextField
                            sx={{ minWidth: '250px', '& .MuiOutlinedInput-root': { borderRadius: '20px' } }}
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={handleUsernameChange}
                            color="primary"
                            fullWidth
                            error={!!usernameError}
                            helperText={usernameError}
                        />
                        <TextField
                            sx={{ minWidth: '250px', '& .MuiOutlinedInput-root': { borderRadius: '20px' } }}
                            label="Password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            color="primary"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={!!passwordError}
                            helperText={passwordError}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                sx={{
                                    flexGrow: 1,
                                    borderRadius: '25px',
                                    margin: 2,
                                    py: 2,
                                    '&:hover': { backgroundColor: '#3f51b5' },
                                }}
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                disabled={submitting}
                            >
                                {submitting ? <CircularProgress size={24} /> : 'Submit'}
                            </Button>

                            <Button variant="outlined" color="primary" onClick={onClose} sx={{ flexGrow: 1, borderRadius: '25px', margin: 2, py: 2 }}>
                                Close
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage} {/* Wyświetlanie wiadomości */}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LoginDialog;
