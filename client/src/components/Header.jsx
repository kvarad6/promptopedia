import React from 'react'
import { AppBar, Toolbar, Typography, Tab, Tabs, useMediaQuery, useTheme, Button, Grid, Avatar, IconButton } from '@mui/material'
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import Signout from './Signout';
import CreateIcon from '@mui/icons-material/Create';


const Header = () => {

    const location = useLocation();
    console.log(location.state)

    const navigate = useNavigate()
    //to write each header component seperately, with seperate function 
    const pages = { 'Create Post': '/create-post', 'Signout': '/signout', 'Profile': '/user-profile' }

    function gotoCreatePost() {
        navigate("/create-post", { state: { userEmail: location.state.userEmail, userName: location.state.userName, photoURL: location.state.photoURL } })
    }

    function gotoUserProfile() {
        navigate("/user-profile", { state: { userEmail: location.state.userEmail, userName: location.state.userName, photoURL: location.state.photoURL } })
    }

    function gotoHomePage() {
        navigate("/", { state: { userEmail: location.state.userEmail, userName: location.state.userName, photoURL: location.state.photoURL } })
    }

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            {
                isMatch ? (
                    <AppBar elevation={0} position='relative' sx={{ backgroundColor: 'transparent', boxShadow: 'none', mt: 5 }}>
                        <Toolbar>
                            <Button onClick={gotoHomePage} sx={{ textTransform: 'none', ml: { xs: 5, md: 15, lg: 20 } }}>
                                <Typography sx={{ color: '#5CD2E6', fontWeight: 500, fontSize: { xs: 22, md: 25, lg: 25 } }}>Promptopedia</Typography>
                            </Button>
                            <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', ml: { xs: 6, md: 50, lg: 70 }, gap: { xs: 1, md: 5, lg: 5 } }}>
                                    <Grid item xs={4}>
                                        <IconButton>
                                            <CreateIcon onClick={gotoCreatePost} fontSize="large" sx={{ color: '#5CD2E6' }} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Signout />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button onClick={gotoUserProfile}><Avatar src={location.state.photoURL}></Avatar></Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                ) : (
                    <AppBar elevation={0} position='relative' sx={{ backgroundColor: 'transparent', boxShadow: 'none', mt: 5 }}>
                        <Toolbar>
                            <Button onClick={gotoHomePage} sx={{ textTransform: 'none', ml: { xs: 5, md: 15, lg: 20 } }}>
                                <Typography sx={{ color: '#5CD2E6', fontWeight: 500, fontSize: { xs: 18, md: 25, lg: 25 } }}>Promptopedia</Typography>
                            </Button>
                            <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', ml: { xs: 6, md: 50, lg: 70 }, gap: { xs: 1, md: 5, lg: 5 } }}>
                                    <Grid item xs={4} sx={{ mt: 1 }}>
                                        <Button
                                            onClick={gotoCreatePost}
                                            variant="contained"
                                            sx={{
                                                borderRadius: 10, textTransform: 'none', bgcolor: '#5CD2E6', color: 'black', '&:hover': {
                                                    backgroundColor: '#208be8', boxShadow: 'none'
                                                },
                                            }}>
                                            Create Post
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Signout />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button onClick={gotoUserProfile}><Avatar src={location.state.photoURL}></Avatar></Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                )
            }

        </>
    )
}

export default Header