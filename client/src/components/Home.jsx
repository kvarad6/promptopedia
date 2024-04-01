import React from 'react'
import Signout from './Signout'
import { Typography, Grid } from '@mui/material'
import SearchBar from './SearchBar'
import CreatePost from './CreatePost'
import UserProfile from './UserProfile'
import Posts from './Posts'

const Home = () => {
  return (
    <div>
        <Grid sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', ml: 20, mr: 15, mt: 5}}>
            <Grid Item xs={6}>
                <Typography sx={{fontSize: 25}}>Promptopedia</Typography>
            </Grid>
            <Grid Item xs={6} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', gap: 5}}>
                <Grid Item xs={4}>
                    <CreatePost />
                </Grid>
                <Grid Item xs={4}>
                    <Signout />
                </Grid>
                <Grid Item xs={4}>
                    <UserProfile />
                </Grid>
            </Grid>
        </Grid>
        <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mt: 20 }}>
            <Typography sx={{ fontSize: 20 }}>Discover & Share AI-Powered Prompts</Typography>
            <Typography>Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts</Typography>
        </Grid>
        <SearchBar />
        <Posts />
    </div>
  )
}

export default Home
