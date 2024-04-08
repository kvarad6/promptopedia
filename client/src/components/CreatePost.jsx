import { Button, Typography, Grid, TextField, Box, FormControl, InputLabel, FormLabel, Alert } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { createContext } from 'react';
import axios from 'axios';



const CreatePost = (props) => {
    const { profilePicUrl, userEmail, userName } = props;
    const [formData, setFormData] = useState({
        prompt: '',
        tags: ''
    });

    const [showAlert, setShowAlert] = useState(false);

    // const [prompt, setPrompt] = useState('');
    // const [tags, setTags] = useState('');

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log(formData.prompt)
    //     console.log(formData.tags)
    //     const response = await fetch('/api/submit-data', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(formData),
    //     });

    //     if (!response.ok) {
    //         console.error('Error submitting form:', response.statusText);
    //         // Handle errors appropriately (e.g., display error message to user)
    //     } else {
    //         console.log('Form data submitted successfully!');
    //         // Clear form data or perform other actions after successful submission
    //         setFormData({ prompt: '', tags: '' });
    //     }
    // };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowAlert(false); // Reset alert visibility before submission

        // console.log('Prompt:', formData.prompt);
        // console.log('Tags:', formData.tags);
        console.log('formData:', formData);

        try {
            const response = await axios.post('http://0.0.0.0:8000/items', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            // const data = {
            //     ...formData,
            //     profilePicUrl,
            //     userEmail,
            //     userName,
            // };
            // console.log("data:", data)
            // const response = await axios.post('http://0.0.0.0:8000/items', data, {
            //     headers: { 'Content-Type': 'application/json' },
            // });

            if (response.status === 200) { // Check for successful response
                console.log('Form data submitted successfully!');
                setFormData({ prompt: '', tags: '' });
                setShowAlert(true); // Show success alert on successful submission
            } else {
                console.error('Error submitting form:', response.statusText);
                // Display error message to user (add logic here)
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Display error message to user (add logic here)
        }
    };

    function handleChange(event) {
        setFormData((prevState) => {
            const { name, value } = event.target;
            return {
                ...prevState,
                [name]: value
            };
        });
    }

    // Handle alert auto-dismissal
    useEffect(() => {
        if (showAlert) {
            const timeoutId = setTimeout(() => {
                setShowAlert(false);
            }, 3000); // Adjust timeout value (currently 3 seconds)

            return () => clearTimeout(timeoutId); // Cleanup function to clear timeout on unmount
        }
    }, [showAlert]); // Dependency array: only re-run when showAlert changes


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

            <form onSubmit={handleSubmit}>
                <FormControl sx={{ display: 'flex', flexDirection: 'column', mb: 2, ml: 10, mr: 10, mt: 5, width: 400, gap:3 }}>
                    <FormLabel sx={{ color: 'white', fontSize:25 }}>
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
                            }
                        }}
                        inputProps={{ style: { color: "white" } }}
                        value={formData.prompt}
                        onChange={handleChange}
                        required
                    // sx={{ input: { color: 'white' } }} 
                    />
                    <FormLabel sx={{ color: 'white', fontSize: 25 }}>
                        Tags
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
                            }
                        }}
                        inputProps={{ style: { color: "white" } }}
                        value={formData.tags}
                        onChange={handleChange}
                        required
                    />
                    <Button type='submit' variant='contained' sx={{ width: 150 }}>
                        Submit
                    </Button>
                </FormControl>
            </form>
            {showAlert && <Alert severity="success" sx={{ width: '400px', margin: '0 auto' }}>Your prompt has been submitted successfully!</Alert>}
        </div>
    )
}

export default CreatePost
