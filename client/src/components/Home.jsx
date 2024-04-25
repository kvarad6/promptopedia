import React, { useState, useEffect } from 'react'
import Signout from './Signout'
import { Typography, Grid, Button, Avatar } from '@mui/material'
import Posts from './Posts'
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
// import SearchBar from './SearchBar';

const Home = () => {

    const [copiedText, setCopiedText] = useState();

    const location = useLocation();
    console.log(location.state)

    const navigate = useNavigate()

    function gotoCreatePost() {
        navigate("/create-post", { state: { userEmail: location.state.userEmail, userName: location.state.userName, photoURL: location.state.photoURL } })
    }

    function gotoUserProfile() {
        navigate("/user-profile", { state: { userEmail: location.state.userEmail, userName: location.state.userName, photoURL: location.state.photoURL } })
    }

    const handleCopy = (copiedText) => {
        setCopiedText(copiedText)
    }

    return (
        <div>
            <Header />
            <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, mt: 10 }}>
                <Grid item xs={4}>
                    <Typography variant='h3' sx={{ color: 'white' }}>Discover & Share AI-Powered Prompts</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h6' sx={{ color: 'white' }}>Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Posts onPostCopy={handleCopy} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home
