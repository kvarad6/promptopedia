import React from 'react'
import { Typography, Grid, CardHeader, CardContent, Card, Avatar, IconButton, ImageList, useTheme, useMediaQuery } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import SearchBar from './SearchBar';


const Posts = ({ onPostCopy, copiedText }) => {
    //destructuring prop

    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]); // State for filtered posts

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get('http://0.0.0.0:8000/posts');
                const response = await axios.get('https://promptopedia.onrender.com/posts')
                setPosts(response.data);
                setFilteredPosts(response.data); // Set initial filteredPosts to all posts
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (filteredData) => {
        setFilteredPosts(filteredData);
    };
    //adjusting theme based on screen size
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <>
            <Grid sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <Grid item>
                    <Typography align='center' sx={{ color: "white", fontSize: { xs: 23, md: 30, lg: 38 } }}>
                        Posts
                    </Typography>
                </Grid>
                <SearchBar posts={posts} onSearch={handleSearch} />
                <Grid item>
                    {
                        isMatch ? (
                            // for smaller screen size | col={1}
                            <ImageList variant="masonry" cols={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {filteredPosts.map((post) => (
                                    // ... map over filteredPosts to display posts
                                    <Card key={post.id} sx={{ width: { xs: 320, md: 300, lg: 300 }, minHeight: '100px', mb: "1rem", backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar src={post.photo} sx={{ bgcolor: "black" }} aria-label="recipe">
                                                </Avatar>
                                            }
                                            title={post.name}
                                            subheader={post.email}
                                            action={
                                                <CopyToClipboard text={post.prompt} onCopy={() => onPostCopy(post.prompt)}>
                                                    <IconButton>
                                                        <ContentCopyRoundedIcon />
                                                    </IconButton>
                                                </CopyToClipboard>
                                            }
                                        />
                                        <CardContent>
                                            <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between', gap: 2 }}>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontSize: 15 }}>{post.prompt}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2">
                                                        {/* {post.tags.join(', ')} */}
                                                        {post.tags.map((tag) => (
                                                            <span key={tag}>#  {tag} </span>
                                                        ))}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                ))}
                            </ImageList>
                        ) : (
                            // for larger screen size | col={3}
                            <ImageList variant="masonry" cols={3} gap={20} sx={{ rowGap: 10 }}>
                                {filteredPosts.map((post) => (
                                    // ... map over filteredPosts to display posts
                                    <Card key={post.id} sx={{ width: { xs: 200, md: 250, lg: 300 }, minHeight: '100px', mb: "1rem", backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar src={post.photo} sx={{ bgcolor: "black" }} aria-label="recipe">
                                                </Avatar>
                                            }
                                            title={post.name}
                                            subheader={post.email}
                                            action={
                                                <CopyToClipboard text={post.prompt} onCopy={() => onPostCopy(post.prompt)}>
                                                    <IconButton>
                                                        <ContentCopyRoundedIcon />
                                                    </IconButton>
                                                </CopyToClipboard>
                                            }
                                        />
                                        <CardContent>
                                            <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between', gap: 2 }}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1">{post.prompt}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2">
                                                        {/* {post.tags.join(', ')} */}
                                                        {post.tags.map((tag) => (
                                                            <span key={tag}>#  {tag} </span>
                                                        ))}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                ))}
                            </ImageList>
                        )
                    }
                </Grid>
            </Grid>
        </>
    );
};

export default Posts;