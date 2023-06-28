import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Dialog, TextField } from '@mui/material';
import axios from 'axios';
import { UserListItem } from './UserListItem';
import UserDialog from './UserDialog';
import { formatError } from '../../../helpers/errorUtils';

interface DataFetcherProps {
    activeContent: string;
}

export interface UserItem {
    id: string;
    active: boolean;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
}

export interface ArticleItem {
    id: string;
    active: boolean;
    title: string;
    content: string;
    category?: Category;
    imageUrl: string;
    tags: Record<string, Tag>;
}

interface Category {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}

type Item = UserItem | ArticleItem;

export const DataFetcher: React.FC<DataFetcherProps> = ({ activeContent }) => {
    const [items, setItems] = useState<(UserItem | ArticleItem)[]>([]);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [userDeleted, setUserDeleted] = useState(false);
    const [refetchData, setRefetchData] = useState(false);
    const [userAdded, setUserAdded] = useState(false);
    const [articleDeleted, setArticleDeleted] = useState(false);
    const [articleAdded, setArticleAdded] = useState(false);
    const [newUser, setNewUser] = useState({
        id: '',
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        active: true,
    });
    const [newArticle, setNewArticle] = useState({
        id: '',
        title: '',
        content: '',
        imageUrl: '',
        tags: {},
        active: true,
    });

    const handleAddUserDialogOpen = () => {
        setAddDialogOpen(true);
    };

    const handleAddArticleDialogOpen = () => {
        setAddDialogOpen(true);
    };
    const handleAddArticleDialogClose = () => {
        setAddDialogOpen(false);
    };

    const handleAddUserDialogClose = () => {
        setAddDialogOpen(false);
    };
    const handleUserDeleted = () => {
        setRefetchData(!refetchData);
    };
    const handleArticleDeleted = () => {
        setRefetchData(!refetchData);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}${activeContent}`);
                const data = response.data;
                // Przekształć obiekt na tablicę
                const itemsArray = Object.entries(data as Record<string, Item>).map(([id, value]) => ({
                    ...value, // Spread operator to copy all user fields
                    id,
                    active: value.active === true,
                }));

                setItems(itemsArray);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', formatError(error));
            }
        };

        fetchData();
    }, [activeContent, refetchData]);

    const handleAddUser = async () => {
        try {
            const token = localStorage.getItem('token');
            // Sprawdź czy taki użytkownik już istnieje

            const response = await axios.post(`${url}user/register`, newUser, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.status.toString().startsWith('2')) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const user = response.data;
            if (response.status === 201) {
                setSnackbarMessage(`Użytkownik ${newUser.username} został utworzony.`);
                setItems(prevItems => [...prevItems, user]);
            } else {
                setSnackbarMessage(`Otrzymano odpowiedź HTTP: ${response.status}.`);
            }
        } catch (error) {
            console.error('Błąd podczas tworzenia użytkownika:', formatError(error));
            setSnackbarMessage(formatError(error));
            setSnackbarOpen(true);
        } finally {
            handleAddUserDialogClose();
            setRefetchData(!refetchData);
            setNewUser({
                id: '',
                username: '',
                password: '',
                email: '',
                firstName: '',
                lastName: '',
                active: true,
            });
        }
    };

    const handleAddArticle = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${url}}/news`, newArticle, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.status.toString().startsWith('2')) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const article = response.data;
            if (response.status === 201) {
                setItems(prevItems => [...prevItems, article]);
                setSnackbarMessage(`Artykuł ${article.title} został utworzony.`);
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage(`Otrzymano odpowiedź HTTP: ${response.status}.`);
            }
        } catch (error) {
            console.error('Błąd podczas tworzenia artykułu:', error);
            setSnackbarMessage(`Błąd podczas tworzenia artykułu: ${formatError(error)}`);
            setSnackbarOpen(true);
        } finally {
            handleAddArticleDialogClose();
            setRefetchData(!refetchData);
            setNewArticle({
                id: '',
                title: '',
                content: '',
                imageUrl: '',
                tags: {},
                active: true,
            });
        }
    };

    return (
        <>
            <Box mb={4}>
                <Box display="flex" alignItems="center" mb={8}>
                    <Typography variant="h4" sx={{ mx: 'auto', textTransform: 'uppercase' }} flexGrow={0}>
                        List of {activeContent}
                    </Typography>
                </Box>

                {items.map(item => (
                    <Box key={item.id}>
                        <UserListItem user={item as UserItem} />
                    </Box>
                ))}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => {
                        if (activeContent === 'users') {
                            handleAddUserDialogOpen();
                        } else if (activeContent === 'news') {
                            handleAddArticleDialogOpen();
                        }
                    }}
                >
                    Add streamer
                </Button>
            </Box>
            {activeContent === 'users' && (
                <UserDialog open={addDialogOpen} onClose={handleAddUserDialogClose} newUser={newUser} setNewUser={setNewUser} handleAddUser={handleAddUser} />
            )}
        </>
    );
};
