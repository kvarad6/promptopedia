import React, { useState, useEffect } from 'react'
import { Grid, Avatar, IconButton, Typography } from '@mui/material'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";
import signinwithgoogle from "../static/images/avatars/signinwithgoogle.png"


const Signin = () => {

    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const signIn = (e) => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);

                // const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("user:", user);
                if (user) {
                    setProfilePicUrl(user.photoURL);
                    setUserEmail(user.email);
                    setUserName(user.displayName);

                }
                localStorage.setItem('user', JSON.stringify({
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                }));
                console.log("userEmail:", user.email);

                navigate("/", { state: { userEmail: user.email, userName: user.displayName, photoURL: user.photoURL } });

            }).catch((error) => {
                console.log("error", error)
                // ...
            });
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setProfilePicUrl(user.photoURL);
            setUserEmail(user.email);
            setUserName(user.displayName);
            // Perform actions based on stored user data (optional)
        }
    }, []);

    return (
        <div className='background-image'>
            <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 30, mr: 30, mt: 25, gap: 5 }}>
                <Grid item xs={4}>
                    <Typography variant='h1' sx={{ color: 'white' }}>Promptopedia</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: 'white' }}>
                        <Typography variant='h4'>Discover & Share AI-Powered Prompts</Typography>
                        <Typography variant='h8' sx={{ textAlign: 'center' }}>Promptopedia is an AI prompting tool for modern world to discover, create and share creative prompts</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <IconButton>
                        <Avatar src={signinwithgoogle} variant="square" sx={{ width: 175, height: 40 }} onClick={() => signIn(true)} />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}

export default Signin
