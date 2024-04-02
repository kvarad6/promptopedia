import { Button, Typography, Grid, TextField, Box, FormControl, InputLabel, FormLabel } from '@mui/material'
import React, { useState } from 'react'
import { Link } from "react-router-dom"

const CreatePost = () => {
    // const [formData, setFormData] = useState({
    //     prompt: '',
    //     tags: ''
    // });

    const [prompt, setPrompt] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(prompt)
        console.log(tags)
    }

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData((prevData) => ({ ...prevData, [name]: value }));
    // };


    return (
        <div>
            <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 20, ml: 5, gap: 5 }}>
                <Grid item>
                    <Typography variant='h2' sx={{ color: 'white' }}>Create Post</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h6' sx={{ color: 'white' }}>Create and share amazing prompts with the world and let your imagination run wild with any AI-powered platform.</Typography>
                </Grid>
            </Grid>

            <form onSubmit={handleSubmit} action={<Link to="/" />}>
                <FormControl sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                    <FormLabel sx={{ color: 'white' }}>
                        Prompt
                    </FormLabel>
                    <TextField
                        type="text"
                        varient="outlined"
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        required
                    />
                    <FormLabel sx={{ color: 'white' }}>
                        Tags
                    </FormLabel>
                    <TextField
                        type="text"
                        varient="outlined"
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                        required
                    />
                    <Button type='submit' variant='contained'>
                        Submit
                    </Button>
                </FormControl>
            </form>
        </div>
    )
}

export default CreatePost
