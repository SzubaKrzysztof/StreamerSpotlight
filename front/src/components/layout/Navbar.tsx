import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useLocation } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/icons/Logo';

const Navbar: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const location = useLocation();
    const pathname = location.pathname;
    const isHomePage = pathname === '/';

    const linkColor = 'black';

    const handleDrawer = () => {
        setOpen(!open);
    };

    const navLinks = [{ title: 'Streamers', to: '/streamers' }];

    const appBarStyles = {
        bgcolor: 'background.paper',
        boxShadow: 'none',
        transition: 'background-color 0.5s ease-in-out',
    };

    const toolbarStyles = {
        gap: '40px',
        marginTop: {
            xs: '10px',
            md: '50px',
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

                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        onClick={handleDrawer}
                        edge="end"
                        sx={{ ...(open && { display: 'none' }), marginRight: { sx: '20', md: '80px' } }}
                    >
                        <MenuIcon
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                color: linkColor,
                                '&:hover': {
                                    color: isHomePage ? 'secondary.main' : 'warning.main',
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
                <List sx={{ flexGrow: 1, height: '90vh' }}>
                    {navLinks.map((text, index) => (
                        <ListItem key={index} component={Link} to={`/${text}`} onClick={handleDrawer} sx={{ height: 'calc(90vh / 5)' }}>
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
                                            backgroundColor: 'action.hover',
                                        },
                                    },
                                }}
                            >
                                <ListItemText sx={{ color: 'primary' }} />
                            </Box>
                        </ListItem>
                    ))}
                </List>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        height: '10vh',
                        flexDirection: 'row',
                        alignItems: 'stretch',
                    }}
                >
                    <Button variant="outlined" color="primary" onClick={handleDrawer} sx={{ flexGrow: 1, borderRadius: '25px', mx: 3, mb: 2, py: 2.5 }}>
                        Close
                    </Button>
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;
