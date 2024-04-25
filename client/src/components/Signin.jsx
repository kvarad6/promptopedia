import React, { useState, useContext } from 'react'
import { Grid, Avatar, IconButton, Typography } from '@mui/material'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";
import signinwithgoogle from "../static/images/avatars/signinwithgoogle.png"
import CreatePost from './CreatePost';
// import { NavigationContainer } from '@react-navigation/native'; // For React Navigation


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
                console.log("userEmail:", user.email);

                // Navigate to Posts component, passing user data in props
                // navigate('/create-post', {
                //     profilePicUrl: user.photoURL,
                //     userEmail: user.email,
                //     userName: user.displayName,
                // });
                // console.log('Profile picture URL:', profilePicUrl);
                navigate("/", { state: { userEmail: user.email, userName: user.displayName, photoURL: user.photoURL } });
                // navigate("/");
                // navigate("/create-post");

                // ...
            }).catch((error) => {
                // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                console.log("error", error)
                // ...
            });
    }

    return (
        <div className='background-image'>
            <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 30, mr: 30, mt: 25, gap: 5 }}>
                <Grid item xs={4}>
                    <Typography variant='h1' sx={{ color: 'white' }}>Promptopedia</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: 'white' }}>
                        <Typography variant='h4'>Discover & Share AI-Powered Prompts</Typography>
                        <Typography variant='h8' sx={{ textAlign: 'center' }}>Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <IconButton>
                        <Avatar src={signinwithgoogle} variant="square" sx={{ width: 175, height: 40 }} onClick={() => signIn(true)} />
                    </IconButton>
                </Grid>

                {/* <Button type="button" variant="contained" sx={{ width: 405 }} onClick={() => signIn(true)}>Sign in with Google</Button> */}
            </Grid>
        </div>
    )
}

export default Signin
