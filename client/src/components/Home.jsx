import React, { useState, useEffect } from 'react'
import Signout from './Signout'
import { Typography, Grid, Button, Avatar } from '@mui/material'
import Posts from './Posts'
import { useNavigate, useLocation } from 'react-router-dom';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

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
            <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', ml: 20, mr: 15, mt: 5 }}>
                <Grid item xs={6}>
                    <Typography sx={{ fontSize: 25, color: 'white' }}>Promptopedia</Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', gap: 5 }}>
                    <Grid item xs={4}>
                        <Button onClick={gotoCreatePost} variant="contained" sx={{ borderRadius: 10 }}>Create Post</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Signout />
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={gotoUserProfile}><Avatar src={location.state.photoURL}></Avatar></Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, mt: 20 }}>
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
            {/* <SearchBar /> */}
        </div>
    )
}

export default Home
