import React from 'react'
import { Typography, Grid, CardHeader, CardContent, Card, Avatar, Button, IconButton, ImageList } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import SearchBar from './SearchBar';


const Posts = ({ onPostCopy }) => {
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
            <Typography variant="h4" align='center' sx={{ color: "white" }}>
                Posts
            </Typography>
            {/* <SearchBar /> */}
            <ImageList variant="masonry" cols={3} gap={20} sx={{ rowGap: 10 }}>
                {posts.map((post) => (
                    <Card key={post.id} sx={{ width: '300px', minHeight: '100px', mb: "1rem" }}>
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
                                    <Typography variant="body2">Tags: {post.tags.join(', ')}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
            </ImageList>
        </>

    );
};

export default Posts