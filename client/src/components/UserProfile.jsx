import React, { useState, useEffect } from 'react'
import { Grid, Typography, Card, CardHeader, Avatar, CardContent, IconButton, ImageList } from '@mui/material'
import { useNavigate, useLocation, } from 'react-router-dom';
import axios from 'axios';
import { CopyToClipboard } from "react-copy-to-clipboard";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import Header from './Header';


const UserProfile = () => {

  const [posts, setPosts] = useState([]);
  const [copiedText, setCopiedText] = useState();

  const location = useLocation();
  const email = location.state.userEmail;

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = 'http://0.0.0.0:8000/get_items_by_email';
        const url = `${baseUrl}?email=${email}`; // Use template literals for string concatenation
        console.log("url:", url)
        const response = await axios.get(url);
        console.log("response.data:", response.data)
        console.log("response.data[0].id:", response.data[0].id)
        if (response.data.error) { // Check for specific error property
          setPosts({ error: response.data.error }); // Set posts to an object with the error message
        } else {
          setPosts(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const HandleDelete = async (postId) => {
    try {
      const baseUrl = 'http://0.0.0.0:8000/delete_post';
      const url = `${baseUrl}?postId=${postId}`;
      console.log("url:", url);
      const response = await axios.delete(url);
      console.log("response:", response);

      // Optimistic Update (Optional): Remove the post from UI
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));

    } catch (error) {
      console.error('Error in deleting the data:', error);
    }
  };

  const handleCopy = (copiedText) => {
    setCopiedText(copiedText)
  }
  return (
    <>
      <Header />

      <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 5, ml: 30 }}>
        <Grid item xs={6}>
          <Typography variant='h2' sx={{ color: 'white' }}>My Profile</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' sx={{ color: 'white' }}>Welcome to your personalized profile page!</Typography>
        </Grid>
      </Grid>

      <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
        <Grid item>
          <Typography variant="h4" align='center' sx={{ color: "white" }}>
            Posts
          </Typography>
        </Grid>
        <Grid item>
          {posts.error && (
            <Typography variant="h6" align='center' sx={{ color: "white" }}>
              No posts found for your email.
            </Typography>
          )}
          {posts.length > 0 && (
            <ImageList variant="masonry" cols={3} gap={20} sx={{ rowGap: 10 }}>
              {posts.map((post) => (
                <Card key={post.id} sx={{
                  width: '300px', minHeight: '100px', mb: "1rem", backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)"
 }}>
                  <CardHeader
                    avatar={
                      <Avatar src={post.photo} sx={{ bgcolor: "black" }} aria-label="recipe"></Avatar>
                    }
                    title={post.name}
                    subheader={post.email}
                  />

                  {/* Add CardMedia if you have image URLs in your data */}
                  {/* <CardMedia image={post.imageUrl} title={post.prompt} /> */}
                  <CardContent>
                    <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between', gap: 2 }}>
                      <Grid item xs={4}>
                        <Typography variant="body1">{post.prompt}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2">
                          {/* Tags: {post.tags.join(', ')} */}
                          {post.tags.map((tag) => (
                            <span key={tag}>#  {tag} </span>
                          ))}
                          </Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Grid item xs={4}>
                          <CopyToClipboard text={post.prompt} onCopy={() => handleCopy(post.prompt)}>
                            <IconButton>
                              <ContentCopyRoundedIcon />
                            </IconButton>
                          </CopyToClipboard>
                        </Grid>
                        <Grid item xs={4}>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={4}>
                          <IconButton>
                            <DeleteIcon onClick={() => HandleDelete(post.id)} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </ImageList>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default UserProfile