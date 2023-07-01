import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/icons/Logo';
import LoginDialog from '../partials/LoginDialog';
import { useAuth } from '../../Services/AuthContext';

const Navbar: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [loginMenuOpen, setLoginMenuOpen] = React.useState(false);
    const { isLogged, logout } = useAuth();
    const [user, setUser] = useState<string | null>(null);

    const linkColor = 'black';

    useEffect(() => {
        return setUser(localStorage.getItem('username'));
    }, [isLogged]);

    const handleDrawer = () => {
        setOpen(!open);
    };
    const handleLoginMenuToggle = () => {
        setLoginMenuOpen(!loginMenuOpen);
    };

    const handleLogout = () => {
        logout();
    };

    const navLinks = [
        { title: 'Home', to: '/' },
        { title: 'Streamers', to: '/streamers' },
    ];

    const appBarStyles = {
        backgroundColor: 'success.main',
        boxShadow: 'none',
    };

    const toolbarStyles = {
        gap: '40px',
        marginTop: {
            xs: '10px',
            md: '15px',
        },
    };

    const typographyStyles = {
        flexGrow: 1,
        marginLeft: { sx: '20px', md: '80px' },
    };

    const linkClasses = {
        display: { xs: 'none', sm: 'none', md: 'block' },
        textDecoration: 'none',
        marginLeft: '40px',
        cursor: 'pointer',
    };

    return (
        <>
            <AppBar sx={appBarStyles} elevation={0} position="fixed">
                <Toolbar sx={toolbarStyles}>
                    <Typography sx={typographyStyles}>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Logo color={linkColor} />
                        </Link>
                    </Typography>
                    {navLinks.map((link, index) => (
                        <Typography key={index} variant="subtitle2" component={Link} sx={linkClasses} to={link.to} color={linkColor}>
                            {link.title}
                        </Typography>
                    ))}
                    <Box>
                        <Typography variant="body2"> {isLogged ? `Welcome, ${user}` : ''}</Typography>
                    </Box>

                    <Box display={'flex'} alignContent={'center'} justifyContent={'center'} mx={2}>
                        <Button variant={'contained'} onClick={isLogged ? handleLogout : handleLoginMenuToggle}>
                            {isLogged ? 'Logout' : 'Login'}
                        </Button>
                    </Box>

                    <IconButton color="primary" aria-label="open drawer" onClick={handleDrawer} edge="end" sx={{ ...(open && { display: 'none' }) }}>
                        <MenuIcon
                            sx={{
                                marginRight: '20px',
                                display: { xs: 'block', md: 'none' },
                                color: linkColor,
                                '&:hover': {
                                    color: 'secondary.main',
                                },
                            }}
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: '90vw',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: '90vw',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    },
                }}
                anchor="right"
                open={open}
                onClose={handleDrawer}
            >
                {navLinks.map((text, index) => (
                    <ListItem key={index} component={Link} to={text.to} onClick={handleDrawer} sx={{ height: 'calc(90vh / 5)' }}>
                        <Box
                            sx={{
                                margin: 5,
                                width: '100%',
                                padding: '50px',
                                border: '2px solid',
                                borderColor: 'divider',
                                borderRadius: '25px',
                                backgroundColor: 'background.paper',
                                '@media (hover: hover)': {
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                    },
                                },
                            }}
                        >
                            <ListItemText sx={{ color: 'primary' }}>
                                <Link to={text.to} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {text.title}
                                </Link>
                            </ListItemText>
                        </Box>
                    </ListItem>
                ))}

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        height: '10vh',
                        flexDirection: 'row',
                        alignItems: 'stretch',
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={isLogged ? handleLogout : handleLoginMenuToggle}
                        sx={{ flexGrow: 1, borderRadius: '25px', mx: 3, mb: 2, py: 2.5 }}
                    >
                        {isLogged ? 'Logout' : 'Login'}
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handleDrawer} sx={{ flexGrow: 1, borderRadius: '25px', mx: 3, mb: 2, py: 2.5 }}>
                        Close
                    </Button>
                </Box>
            </Drawer>
            <LoginDialog open={loginMenuOpen} onClose={handleLoginMenuToggle} />
        </>
    );
};

export default Navbar;
