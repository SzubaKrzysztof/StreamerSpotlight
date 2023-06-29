import React, { createContext, useState, useContext } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { baseUrl } from '../const/baseUrl';

interface AuthContextProps {
    isLogged: boolean;
    setIsLogged: (value: boolean) => void;
    user: string | null;
    setUser: (value: string | null) => void;
    login: (username: string, password: string) => Promise<any>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [isLogged, setIsLogged] = useState<boolean>(() => {
        return localStorage.getItem('token') !== null;
    });

    const [user, setUser] = useState<string | null>(() => {
        return localStorage.getItem('username');
    });

    const login = async (username: string, password: string) => {
        try {
            debugger;
            const response = await axios.post(
                `${baseUrl}user/login`,
                { username, password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            if (response.status === 200 && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                setIsLogged(true);
                setUser(response.data.username);

                enqueueSnackbar('You have successfully logged in!', { variant: 'success' });
            }

            return response;
        } catch (error) {
            enqueueSnackbar('An error occurred during login', { variant: 'error' });
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLogged(false);
        setUser(null);

        enqueueSnackbar('You have successfully logged out!', { variant: 'success' });
    };

    return <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
