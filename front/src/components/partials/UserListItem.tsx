import { Box, Typography, Checkbox, IconButton, Dialog, Button, TextField, Snackbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { formatError } from '../../helpers/errorUtils';
import axios from 'axios';
import { baseUrl } from '../../const/baseUrl';
interface User {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    active: boolean;
    username: string;
}
interface UserListItemProps {
    user: User;
}
export interface UserItem extends User {
    id: string;
    active: boolean;
}

const url: string = baseUrl.url;

export const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
    const [items, setItems] = useState<UserItem[]>([]);
    const [open, setOpen] = useState(false);

    const [editedUser, setEditedUser] = useState<UserItem>({ ...user, id: user.username, active: user.active });
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        setEditedUser({ ...user, id: user.username, active: user.active });
    }, [user]);

    const handleSave = async () => {
        const loggedInUsername = localStorage.getItem('username');
        if (loggedInUsername === user.username) {
            // Użytkownik próbuje zmienić swoją własną nazwę
            setSnackbarMessage(`Nie możesz zmienić swojej własnej nazwy użytkownika.`);
            setSnackbarOpen(true);
            setOpen(false);
        } else {
            try {
                // Użyj pierwotnej nazwy użytkownika (user.username) do zidentyfikowania użytkownika na serwerze
                const urlNew = `${url}user/${user.username}`;
                const token = localStorage.getItem('token');

                const response = await axios.put(urlNew, editedUser, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Sprawdź status odpowiedzi
                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const itemIndex = items.findIndex(item => 'username' in item && item.username === user.username);
                const newItems = [...items];
                newItems[itemIndex] = { ...editedUser, active: editedUser.active === true, id: editedUser.username };
                setItems(newItems);
                setSnackbarMessage(`Zmiany w użytkowniku ${editedUser.username} zostały zastosowane.`);
                setSnackbarOpen(true);

                setOpen(false);
            } catch (error) {
                console.error('Błąd podczas aktualizacji elementu:', error);
                setSnackbarMessage(formatError(error));
                setSnackbarOpen(true);
            } finally {
                setOpen(false);
            }
        }
    };

    const handleClose = () => {
        setSnackbarOpen(false);
    };

    const handleOpen = () => {
        setOpen(!open);
        setEditedUser({ ...user, id: user.username, active: user.active });
    };

    return (
        <Box display="flex" alignItems="center" sx={{ border: '1px solid gray', borderRadius: '15px', px: 2 }} mb={2}>
            <Typography variant="h6" flexGrow={1}>
                {editedUser.username}
            </Typography>
            <Box display="flex" mr={2} alignItems="center">
                <Typography variant="h6" flexGrow={1}>
                    is Active
                </Typography>
                <Checkbox
                    checked={editedUser?.active === true}
                    onChange={e => {
                        setEditedUser({ ...editedUser, active: e.target.checked });
                        handleSave();
                    }}
                />
            </Box>
            <Box display="flex" mr={2} alignItems="center">
                <Typography variant="h6" flexGrow={1}>
                    Delete
                </Typography>
                <IconButton sx={{ color: 'red' }}>
                    <DeleteIcon />
                </IconButton>
            </Box>

            <Box display="flex" onClick={handleOpen} mr={2} alignItems="center">
                <Typography variant="h6" onClick={handleOpen} flexGrow={1}>
                    Edit
                </Typography>
                <IconButton sx={{ color: 'darkblue' }}>
                    <EditIcon />
                </IconButton>
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <Box p={2} minWidth={300}>
                    <Typography variant="h6" gutterBottom>
                        Edit User
                    </Typography>
                    <Typography variant="h6" flexGrow={1}>
                        {editedUser?.username}
                    </Typography>
                    <TextField
                        label="Username"
                        value={editedUser?.username}
                        fullWidth
                        margin="normal"
                        onChange={e => setEditedUser({ ...editedUser, username: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        value={editedUser.email}
                        onChange={e => setEditedUser({ ...editedUser, email: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="First Name"
                        value={editedUser.firstName}
                        onChange={e => setEditedUser({ ...editedUser, firstName: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        value={editedUser.lastName}
                        onChange={e => setEditedUser({ ...editedUser, lastName: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        value={editedUser.password}
                        onChange={e => setEditedUser({ ...editedUser, password: e.target.value })}
                        fullWidth
                        margin="normal"
                    />

                    <Box display="flex" justifyContent="flex-end">
                        <Button onClick={handleOpen} color="primary" variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary" variant="contained" style={{ marginLeft: 16 }}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Dialog>

            <Box>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={snackbarMessage}
                    action={
                        <>
                            <Button color="secondary" size="small" onClick={handleClose}>
                                UNDO
                            </Button>
                        </>
                    }
                />
            </Box>
        </Box>
    );
};
