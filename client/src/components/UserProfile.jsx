import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import Signout from './Signout'

const UserProfile = () => {
  return (
    <>
      <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', ml: 20, mr: 15, mt: 5 }}>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 25, color: 'white' }}>Promptopedia</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', gap: 5 }}>
          <Grid item xs={6}>
            {/* <CreatePost /> */}
            {/* need to be handled */}
            <Link to="/create-post">
              <Button variant="contained" sx={{ borderRadius: 10 }}>Create Post</Button>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Signout />
          </Grid>
        </Grid>
      </Grid>

      <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 5, ml: 10, gap: 5 }}>
        <Grid item>
          <Typography variant='h2' sx={{ color: 'white' }}>My Profile</Typography>
        </Grid>
        <Grid item>
          <Typography variant='h6' sx={{ color: 'white' }}>Welcome to your personalized profile page!</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default UserProfile