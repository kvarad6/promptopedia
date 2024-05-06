import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Typography, TextField, Button, FormControl, FormLabel } from '@mui/material'


const EditPost = () => {
    const navigate = useNavigate();

    const [postData, setPostData] = useState({
        prompt: '',
        tags: [],
    });

    const location = useLocation();
    console.log(location.state)
    const postId = location.state.postId;
    const oldPrompt = location.state.oldPrompt;
    const oldTags = location.state.oldTags;


    const handleChange = (event) => {
        console.log("inside handleChange")
        setPostData({ ...postData, [event.target.name]: event.target.value });
    };

    const handleEditPost = async (event) => {
        console.log("inside handleEditPost")
        event.preventDefault(); // Prevent default form submission behavior
        console.log("postId in handleEditPost:", postId)
        try {
            // const baseUrl = 'http://0.0.0.0:8000/update_post';
            const baseUrl = 'https://promptopedia.onrender.com/update_post'; // deployed url
            const url = `${baseUrl}?postId=${postId}`;

            const updatedData = {
                prompt: postData.prompt, 
                tags: postData.tags, 
            };

            const response = await axios.put(url, updatedData);

            // const response = await axios.put(url, postData); // Send updated post data
            console.log('Post updated successfully:', response.data);

            // Navigate back to user profile after successful edit
            navigate('/user-profile', { state: { userEmail: location.state.userEmail, userName: location.state.userName, photoURL: location.state.photoURL } });
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };


    return (
        <>
            <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 10, ml: { xs: 5, md: 20, lg: 20 } }}>
                <Grid item>
                    <Typography sx={{ color: 'white', fontSize: { xs: 40, md: 50, lg: 70 } }}>Update Post</Typography>
                </Grid>
            </Grid>
            <form onSubmit={handleEditPost}>
                <FormControl sx={{ display: 'flex', flexDirection: 'column', mb: 2, ml: { xs: 5, md: 20, lg: 20 }, mr: { xs: 0, md: 10, lg: 10 }, width: { xs: 300, md: 300, lg: 400 }, gap: 4 }}>
                    <FormLabel sx={{ color: 'white', fontSize: { xs: 20, md: 20, lg: 25 } }}>
                        Prompt
                    </FormLabel>
                    <TextField
                        type="text"
                        name="prompt"
                        variant="outlined"
                        multiline
                        rows={4}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "white"
                                }
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '& label.Mui-focused': {
                                color: 'white',
                            },
                            width: { xs: 300, md: 500, lg: 600 }
                        }}
                        inputProps={{ style: { color: "white" } }}
                        // value={postData.prompt}
                        onChange={handleChange}
                        defaultValue={oldPrompt}
                        required
                    />
                    <FormLabel sx={{ color: 'white', fontSize: { xs: 20, md: 20, lg: 25 } }}>
                        Tags*
                    </FormLabel>
                    <TextField
                        type="text"
                        name="tags"
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "white"
                                }
                            },
                            width: { xs: 300, md: 500, lg: 600 }
                        }}
                        inputProps={{ style: { color: "white" } }}
                        // value={postData.tags}
                        defaultValue={oldTags}
                        onChange={(event) => {
                            setPostData({ ...postData, tags: event.target.value.split(',') }); // Split comma-separated string back into array
                        }}
                        required
                    />
                    <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Grid item xs={6}>
                            <Button type='submit' variant='contained' sx={{ width: 150, textTransform: 'none' }}>
                                Update
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ color: 'white', fontSize: 12}}>*Comma seperated</Typography>
                        </Grid>
                    </Grid>
                </FormControl>
            </form>
        </>
    );
}

export default EditPost;