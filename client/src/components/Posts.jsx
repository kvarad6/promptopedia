import React from 'react'
import { Typography, Grid, CardHeader, CardMedia, CardContent, Card, Avatar } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios';


const Posts = () => {
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
                                <Avatar src = {post.photo} sx={{ bgcolor: "black" }} aria-label="recipe">
                                    
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
    );

};

export default Posts