import React from 'react'
import { AppBar, Toolbar, Typography, Tab, Tabs, useMediaQuery, useTheme, Button, Grid, Avatar } from '@mui/material'
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate, useLocation } from 'react-router-dom';
import Signout from './Signout';


const Header = () => {

    const location = useLocation();
    console.log(location.state)

    const navigate = useNavigate()
    //to write each header component seperately, with seperate function 
    const pages = { 'Create Post': '/create-post', 'Signout': '/signout', 'Profile': '/user-profile' }
    const [value, setValue] = React.useState();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    function autoScroll() {
        setTimeout(() => {
            window.scrollBy(0, -140);
        }, [0])
    }

    function gotoCreatePost() {
        navigate("/create-post", { state: { userEmail: location.state.userEmail, userName: location.state.userName, photoURL: location.state.photoURL } })
    }

    function gotoUserProfile() {
        navigate("/user-profile", { state: { userEmail: location.state.userEmail, userName: location.state.userName, photoURL: location.state.photoURL } })
    }

    function gotoHomePage() {
        navigate("/", { state: { userEmail: location.state.userEmail, userName: location.state.userName, photoURL: location.state.photoURL } })
    }

    return (
        <>
            <AppBar elevation={0} position='relative' sx={{ backgroundColor: 'transparent', boxShadow: 'none', mt: 5 }}>
                <Toolbar>
                    <Button onClick={gotoHomePage} sx={{ textTransform: 'none' }}>
                        <Typography sx={{ color: '#5CD2E6', fontWeight: 500, fontSize: 25, ml: 20 }}>Promptopedia</Typography>
                    </Button>
                    <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', ml: 70, gap: 5 }}>
                            <Grid item xs={4} sx={{ mt: 1 }}>
                                <Button onClick={gotoCreatePost} variant="contained" sx={{ borderRadius: 10, textTransform: 'none' }}>Create Post</Button>
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
        </>
    )
}

export default Header