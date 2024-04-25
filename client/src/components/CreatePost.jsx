import { Button, Typography, Grid, TextField, FormControl, FormLabel, Alert } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import axios from 'axios';
import Header from './Header';


const CreatePost = () => {
    const [formData, setFormData] = useState({
        prompt: '',
        tags: ''
    });

    const [showAlert, setShowAlert] = useState(false);

    const location = useLocation();
    console.log(location.state)
    const email = location.state.userEmail;
    const name = location.state.userName;
    const photo = location.state.photoURL;

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowAlert(false); // Reset alert visibility before submission

        console.log('formData:', formData);

        try {
            // const response = await axios.post('http://0.0.0.0:8000/items', formData, {
            //     headers: { 'Content-Type': 'multipart/form-data' },
            // });
            const data = {
                ...formData,
                email,
                name,
                photo,
            };
            console.log("data:", data)
            const response = await axios.post('http://0.0.0.0:8000/items', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) { // Check for successful response
                console.log('Form data submitted successfully!');
                setFormData({ prompt: '', tags: '' });
                setShowAlert(true); // Show success alert on successful submission
                navigate("/", { state: { userEmail: location.state.userEmail, userName: location.state.userName, photoURL: location.state.photoURL } })
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
        <div className='background-image'>
            <Header />

            <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 10, ml: 20, gap: 5 }}>
                <Grid item>
                    <Typography variant='h2' sx={{ color: 'white' }}>Create Post</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h6' sx={{ color: 'white' }}>Create and share amazing prompts with the world and let your imagination run wild with any AI-powered platform.</Typography>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
                <FormControl sx={{ display: 'flex', flexDirection: 'column', mb: 2, ml: 20, mr: 10, mt: 5, width: 400, gap: 4 }}>
                    <FormLabel sx={{ color: 'white', fontSize: 25 }}>
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
                            width: 600
                        }}
                        inputProps={{ style: { color: "white" } }}
                        value={formData.prompt}
                        onChange={handleChange}
                        required
                    />
                    <FormLabel sx={{ color: 'white', fontSize: 25 }}>
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
                            width: 600
                        }}
                        inputProps={{ style: { color: "white" } }}
                        value={formData.tags}
                        onChange={handleChange}
                        required
                    />
                    <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Grid item xs={6}>
                            <Button type='submit' variant='contained' sx={{ width: 150, textTransform: 'none' }}>
                                Create
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ color: 'white', fontSize: 12, mr: 15 }}>*Comma seperated</Typography>
                        </Grid>
                    </Grid>
                </FormControl>
            </form>
            {showAlert && <Alert severity="success" sx={{ width: '400px', margin: '0 auto' }}>Your prompt has been submitted successfully!</Alert>}
        </div>
    )
}

export default CreatePost
