import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, Snackbar, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { CircularProgress } from '@mui/material';
import Logo from '../../assets/icons/Logo';
import { baseUrl } from '../../const/baseUrl';
import { useAuth } from '../../Services/AuthContext';
import { useSnackbar } from 'notistack';

type LoginDialogProps = {
    open: boolean;
    onClose: () => void;
};

const url: string = baseUrl;

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const { login } = useAuth();

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async () => {
        setSubmitting(true);

        try {
            await login(username, password);
            enqueueSnackbar('Logged in successfully', { variant: 'success' });
            onClose();
        } catch (error: any) {
            enqueueSnackbar(error.response ? error.response.data : 'Error during login', { variant: 'error' });
        } finally {
            setSubmitting(false);
            onClose();
        }

        setSubmitting(false);
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
        </Box>
    );
};

export default LoginDialog;
