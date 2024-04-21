import React, { useState, useEffect } from 'react'
import { Button, Grid, Typography, Card, CardHeader, Avatar, CardContent } from '@mui/material'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Signout from './Signout'
import axios from 'axios';


const UserProfile = () => {

  const [posts, setPosts] = useState([]);

  // const navigate = useNavigate();
  // const location = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://0.0.0.0:8000/items/');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // function gotoCreatePost() {
  //   navigate("/create-post", { state: { userEmail: location.state.userEmail, userName: location.state.userName, photoURL: location.state.photoURL } })
  // }

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

      <Typography variant="h4" align='center' sx={{ color: "white" }}>
        Posts
      </Typography>
      <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'space-evenly', flexWrap: 'wrap', mt: 5, gap: 10, ml: 25 }}>
        {posts.map((post) => (
          <Card key={post.id} sx={{ width: '300px' }}>
            <CardHeader

              avatar={
                <Avatar src={post.photo} sx={{ bgcolor: "black" }} aria-label="recipe">

                </Avatar>
              }
              title={post.name}
              subheader={post.email}

            />

            {/* Add CardMedia if you have image URLs in your data */}
            {/* <CardMedia image={post.imageUrl} title={post.prompt} /> */}
            <CardContent>
              <Typography variant="body1">{post.prompt}</Typography>
              <Typography variant="body2">Tags: {post.tags.join(', ')}</Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </>
  )
}

export default UserProfile