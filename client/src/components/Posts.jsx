import React from 'react'
import { Typography, Grid, CardHeader, CardContent, Card, Avatar, IconButton, ImageList } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import SearchBar from './SearchBar';


const Posts = ({ onPostCopy, copiedText }) => {
    //destructuring prop

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://0.0.0.0:8000/items');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Grid sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <Grid item>
                    <Typography variant="h4" align='center' sx={{ color: "white" }}>
                        Posts
                    </Typography>
                </Grid>
                {/* <SearchBar /> */}
                <Grid item>
                    <ImageList variant="masonry" cols={3} gap={20} sx={{ rowGap: 10 }}>
                        {posts.map((post) => (
                            <Card key={post.id} sx={{ width: '300px', minHeight: '100px', mb: "1rem", backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" }}>
                                <CardHeader
                                    avatar={
                                        <Avatar src={post.photo} sx={{ bgcolor: "black" }} aria-label="recipe">
                                        </Avatar>
                                    }
                                    title={post.name}
                                    subheader={post.email}
                                    action={
                                        <CopyToClipboard text={post.prompt} onCopy={() => onPostCopy(post.prompt)} >
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
                </Grid>
            </Grid>
        </>

    );
};

export default Posts