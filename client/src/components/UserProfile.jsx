import React, { useState, useEffect } from 'react'
import { Grid, Typography, Card, CardHeader, Avatar, CardContent, IconButton, ImageList, useTheme, useMediaQuery, Button, CircularProgress } from '@mui/material'
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
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const email = location.state.userEmail;

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const baseUrl = 'http://0.0.0.0:8000/get_items_by_email';
        const baseUrl = 'https://promptopedia.onrender.com/get_items_by_email';
        const url = `${baseUrl}?email=${email}`; // Use template literals for string concatenation
        const response = await axios.get(url);
        if (response.data.error) { // Check for specific error property
          setPosts({ error: response.data.error }); // Set posts to an object with the error message
        } else {
          setPosts(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const HandleDelete = async (postId) => {
    try {
      // const baseUrl = 'http://0.0.0.0:8000/delete_post';
      const baseUrl = 'https://promptopedia.onrender.com/delete_post'
      const url = `${baseUrl}?postId=${postId}`;
      const response = await axios.delete(url);
      console.log("response:", response);

      // Optimistic Update (Optional): Remove the post from UI
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));

    } catch (error) {
      console.error('Error in deleting the data:', error);
    }
  };

  const HandleEdit = async (postId, oldPrompt, oldTags) => {
    try {
      navigate("/edit-post", { state: { postId: postId, userEmail: location.state.userEmail, userName: location.state.userName, photoURL: location.state.photoURL, oldPrompt: oldPrompt, oldTags: oldTags } });
    } catch (error) {
      console.log("Error in editing the post")
    }
  }

  const handleCopy = (copiedText) => {
    setCopiedText(copiedText)
  }

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className='background-image'>
      <Header />

      <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 5, ml: { xs: 5, md: 30, lg: 30 }, mt: 10 }}>
        <Grid item xs={3}>
          <Typography sx={{ color: 'white', fontSize: { xs: 40, md: 50, lg: 70 } }}>My Profile</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ color: 'white', fontSize: { xs: 16, md: 20, lg: 23 }, mb: 4 }}>Welcome to your personalized profile page!</Typography>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Typography align='center' sx={{ color: "white", fontSize: { xs: 25, md: 35, lg: 35 } }}>
          Posts
        </Typography>
      </Grid>
      {loading ? (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
          <CircularProgress sx={{ color: 'white' }} />
        </Grid>
      ) : (
        <Grid item xs={3}>
          <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, mt: 5 }}>
            {
              isMatch ? (
                <Grid item>
                  {posts.error && (
                    <Typography variant="h6" align='center' sx={{ color: "white" }}>
                      No posts found for your email.
                    </Typography>
                  )}
                  {posts.length > 0 && (
                    <ImageList variant="masonry" cols={1} gap={20} sx={{ rowGap: 10 }}>
                      {posts.map((post) => (
                        <Card key={post.id} sx={{
                          width: { xs: 320, md: 300, lg: 300 }, minHeight: '100px', mb: "1rem", backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)"
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
                                <Typography sx={{ fontSize: 15 }}>{post.prompt}</Typography>
                              </Grid>
                              <Grid item xs={4} sx={{ display: 'flex', gap: 1 }}>
                                {/* <Typography variant="body2"> */}
                                {/* Tags: {post.tags.join(', ')}
                              {post.tags.map((tag) => (
                                <span key={tag}>#  {tag} </span>
                              ))} */}
                                {/* </Typography> */}

                                {post.tags.map((tag) => (
                                  <Button
                                    variant='contained'
                                    disableElevation
                                    sx={{
                                      borderRadius: 12,
                                      textTransform: 'none',
                                      color: 'black',
                                      borderColor: 'gray',
                                      backgroundColor: '#8abbeb',
                                      '&:hover': {
                                        backgroundColor: '#8abbeb',
                                        boxShadow: 'none',
                                      }
                                    }}
                                    key={tag}>{tag}
                                  </Button>
                                ))}
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
                                    <EditIcon onClick={() => HandleEdit(post.id, post.prompt, post.tags)} />
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
              ) : (
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
                              <Grid item xs={4} sx={{ display: 'flex', gap: 1 }}>
                                {/* <Typography variant="body2">
                              {/* Tags: {post.tags.join(', ')}
                              {post.tags.map((tag) => (
                                <span key={tag}>#  {tag} </span>
                              ))} */}
                                {/* </Typography> */}
                                {post.tags.map((tag) => (
                                  <Button
                                    variant='contained'
                                    disableElevation
                                    sx={{
                                      borderRadius: 12,
                                      textTransform: 'none',
                                      color: 'black',
                                      borderColor: 'gray',
                                      backgroundColor: '#8abbeb',
                                      '&:hover': {
                                        backgroundColor: '#8abbeb',
                                        boxShadow: 'none',
                                      }
                                    }}
                                    key={tag}>{tag}
                                  </Button>
                                ))}

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
                                    <EditIcon onClick={() => HandleEdit(post.id, post.prompt, post.tags)} />
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
              )
            }
          </Grid>
        </Grid>)}
    </div>
  )
}

export default UserProfile