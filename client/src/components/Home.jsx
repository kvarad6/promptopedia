import React from 'react'
import Signout from './Signout'
import { Typography, Grid, Button } from '@mui/material'
import SearchBar from './SearchBar'
import CreatePost from './CreatePost'
import UserProfile from './UserProfile'
import Posts from './Posts'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', ml: 20, mr: 15, mt: 5 }}>
                <Grid item xs={6}>
                    <Typography sx={{ fontSize: 25, color: 'white' }}>Promptopedia</Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', gap: 5 }}>
                    <Grid item xs={4}>
                        {/* <CreatePost /> */}
                        {/* need to be handled */}
                        <Link to="/create-post">
                            <Button variant="contained" sx={{ borderRadius: 10 }}>Create Post</Button>
                        </Link>

                    </Grid>
                    <Grid item xs={4}>
                        <Signout />
                    </Grid>
                    <Grid item xs={4}>
                        <UserProfile />
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mt: 20 }}>
                <Typography variant='h3' sx={{ color: 'white' }}>Discover & Share AI-Powered Prompts</Typography>
                <Typography variant='h6' sx={{ color: 'white' }}>Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts</Typography>
            </Grid>
            <SearchBar />
            <Posts />
        </div>
    )
}

export default Home
