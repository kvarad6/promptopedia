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
            <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: { xs: 10, md: 15, lg: 30 }, mr: { xs: 10, md: 15, lg: 30 }, mt: { xs: 18, md: 25, lg: 25 }, gap: { xs: 5, md: 10, lg: 5 } }}>
                <Grid item xs={4}>
                    <Typography sx={{ color: 'white', fontSize: {xs: 45, md:95, lg:105} }}>Promptopedia</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: 4, md: 8, lg: 4 }, color: 'white' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: { xs: 25, md: 45, lg: 45 } }}>Discover & Share AI-Powered Prompts</Typography>
                        <Typography sx={{ textAlign: 'center', fontSize: { xs: 15, md: 25, lg: 20 } }}>Promptopedia is an AI prompting tool for modern world to discover, create and share creative prompts</Typography>
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
