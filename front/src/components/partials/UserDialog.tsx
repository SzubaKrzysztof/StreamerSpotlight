import React, { useState } from 'react';
import { TextField, Checkbox, Box, Typography, Button, Dialog } from '@mui/material';
import { UserItem } from './UserListItem';

interface UserDialogProps {
    open: boolean;
    onClose: () => void;
    newUser: UserItem;
    setNewUser: (user: UserItem) => void;
    handleAddUser: () => void;
}

interface ErrorState {
    id?: string;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    confirmPassword?: string;
    active?: string;
}

const UserDialog: React.FC<UserDialogProps> = ({ open, onClose, newUser, setNewUser, handleAddUser }) => {
    const [errors, setErrors] = useState<ErrorState>({});
    const [confirmPassword, setConfirmPassword] = useState('');

    const validateForm = (field: keyof UserItem | 'confirmPassword') => {
        const tempErrors: ErrorState = { ...errors };

        if (!newUser[field as keyof UserItem] && field !== 'confirmPassword') {
            tempErrors[field as keyof UserItem] = 'This field cannot be empty';
        } else if (field === 'confirmPassword' && !confirmPassword) {
            tempErrors.confirmPassword = 'This field cannot be empty';
        } else {
            switch (field) {
                case 'username':
                    if (!newUser.username.trim()) {
                        tempErrors.username = 'Username cannot be empty';
                    } else {
                        delete tempErrors.username;
                    }
                    break;
                case 'email':
                    if (!/\S+@\S+\.\S+/.test(newUser.email)) {
                        tempErrors.email = 'Email must contain @';
                    } else {
                        delete tempErrors.email;
                    }
                    break;
                case 'firstName':
                    if (!newUser.firstName.trim()) {
                        tempErrors.firstName = 'First name cannot be empty';
                    } else {
                        delete tempErrors.firstName;
                    }
                    break;
                case 'lastName':
                    if (!newUser.lastName.trim()) {
                        tempErrors.lastName = 'Last name cannot be empty';
                    } else {
                        delete tempErrors.lastName;
                    }
                    break;
                case 'password':
                    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(newUser.password)) {
                        tempErrors.password = 'Password must have at least 8 characters, include a capital letter and a number';
                    } else {
                        delete tempErrors.password;
                    }
                    break;
                case 'confirmPassword':
                    if (newUser.password !== confirmPassword) {
                        tempErrors.confirmPassword = 'Passwords must match';
                    } else {
                        delete tempErrors.confirmPassword;
                    }
                    break;
                default:
                    break;
            }
        }

        setErrors(tempErrors);
    };

    const handleInputChange = (field: keyof UserItem) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [field]: event.target.value });
    };

    const handleInputBlur = (field: keyof UserItem | 'confirmPassword') => (event: React.FocusEvent<HTMLInputElement>) => {
        validateForm(field);
    };

    const handleActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, active: event.target.checked });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Box p={2} minWidth={300}>
                <Typography variant="h6" gutterBottom>
                    Create User
                </Typography>
                <TextField label="Username" value={newUser.username} onChange={handleInputChange('username')} fullWidth margin="normal" />
                <TextField
                    label="Email"
                    value={newUser.email}
                    error={!!errors.email}
                    helperText={errors.email}
                    onChange={handleInputChange('email')}
                    onBlur={handleInputBlur('email')}
                    fullWidth
                    margin="normal"
                />
                <TextField label="First Name" value={newUser.firstName} onChange={handleInputChange('firstName')} fullWidth margin="normal" />
                <TextField label="Last Name" value={newUser.lastName} onChange={handleInputChange('lastName')} fullWidth margin="normal" />
                <TextField
                    label="Password"
                    value={newUser.password}
                    error={!!errors.password}
                    helperText={errors.password}
                    onChange={handleInputChange('password')}
                    onBlur={handleInputBlur('password')}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Confirm Password"
                    value={confirmPassword}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    onBlur={() => validateForm('confirmPassword')}
                    fullWidth
                    margin="normal"
                />
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="body1">Active:</Typography>
                    <Checkbox checked={newUser.active === true} onChange={handleActiveChange} />
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <Button onClick={onClose} color="primary" variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleAddUser} color="primary" variant="contained" style={{ marginLeft: 16 }} disabled={Object.keys(errors).length > 0}>
                        Save
                    </Button>
                    {Object.keys(errors).length > 0 && (
                        <p style={{ margin: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Please fix all errors before saving.</p>
                    )}
                </Box>
            </Box>
        </Dialog>
    );
};

export default UserDialog;
