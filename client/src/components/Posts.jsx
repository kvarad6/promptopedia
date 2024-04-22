import React from 'react'
import { Typography, Grid, CardHeader, CardContent, Card, Avatar, Button, IconButton } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';



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
                        <CardContent>
                            <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between', gap: 2 }}>
                                <Grid item xs={4}>
                                    <Typography variant="body1">{post.prompt}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body2">Tags: {post.tags.join(', ')}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <CopyToClipboard text={post.prompt} onCopy={() => onPostCopy(post.prompt)}>
                                        {/* <Button variant="contained" size="small" sx={{ mt: 3, borderRadius: 20 }}>
                                            Copy
                                        </Button> */}
                                        <IconButton>
                                            <ContentCopyRoundedIcon />
                                        </IconButton>
                                    </CopyToClipboard>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </>

    );
};

export default Posts