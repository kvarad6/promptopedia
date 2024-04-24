import { Button, Typography, Grid, TextField, FormControl, FormLabel, Alert, Avatar } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios';
import Signout from './Signout';
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

    function gotoUserProfile() {
        navigate("/user-profile", { state: { userEmail: location.state.userEmail, userName: location.state.userName, photoURL: location.state.photoURL } })
    }

    function gotoHomePage() {
        navigate("/", { state: { userEmail: location.state.userEmail, userName: location.state.userName, photoURL: location.state.photoURL } })
    }

    return (
        <div>
            {/* <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', ml: 20, mr: 15, mt: 5 }}>
                <Grid item xs={6}>
                    <Typography sx={{ fontSize: 25, color: 'white' }}>Promptopedia</Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', gap: 5 }}>
                    <Grid item xs={4}>
                        <Button onClick={gotoHomePage} variant="contained" sx={{ borderRadius: 10 }}>Home</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={gotoUserProfile}><Avatar src={location.state.photoURL}></Avatar></Button>
                    </Grid>

                    <Grid item xs={4}>
                        <Signout />
                    </Grid>
                </Grid>
            </Grid> */}
            <Header />

            <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 20, ml: 20, gap: 5 }}>
                <Grid item>
                    <Typography variant='h2' sx={{ color: 'white' }}>Create Post</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h6' sx={{ color: 'white' }}>Create and share amazing prompts with the world and let your imagination run wild with any AI-powered platform.</Typography>
                </Grid>
            </Grid>

            <form onSubmit={handleSubmit}>
                <FormControl sx={{ display: 'flex', flexDirection: 'column', mb: 2, ml: 20, mr: 10, mt: 5, width: 400, gap: 3 }}>
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
                            width:600
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
                            },
                            width: 600
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
