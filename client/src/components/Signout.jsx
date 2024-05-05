import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Button, useTheme, useMediaQuery, IconButton } from '@mui/material'
import { auth } from "../firebase"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Signout = () => {

    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        // const storedUser = localStorage.getItem('user'); // Check for stored user data in local storage
        // console.log("stored user:", storedUser)
        // if (storedUser) {
        //     setAuthUser(JSON.parse(storedUser)); // Parse and set the user object
        // }
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const uid = user.uid;
                console.log(uid)
                console.log("user in signout page:", user)
                // localStorage.setItem('user', JSON.stringify(user)); // Store user data in local storage
                setAuthUser(user)
            } else {
                // User is signed out
                setAuthUser("");
                navigate("/signin");
            }
        })
        return () => {
            listen()
        }
    }, []);

    const userSignout = () => {
        signOut(auth).then(() => {
            console.log("sign out successfully")
        }).catch(error => console.log(error));
        // localStorage.removeItem('user'); // Clear user data on signout
        navigate("/signin");
    }

    const navigate = useNavigate();

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div>
            {/* {authUser ? <><p>{`Signed in as ${authUser.email}`}</p><Button variant="contained" onClick={userSignout}>Sign Out</Button></> : <p></p>} */}
            {
                isMatch ? (
                    <IconButton>
                        <ExitToAppIcon onClick={userSignout} fontSize="large" sx={{ color: '#5CD2E6' }} />
                    </IconButton>
                ) : (
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: 10, mt: 1, textTransform: 'none', color: 'white', borderColor: '#5CD2E6', '&:hover': {
                                backgroundColor: '#208be8', boxShadow: 'none'
                            }
                        }}
                        onClick={userSignout}>Sign Out</Button>
                )
            }

        </div >
    )
}

export default Signout
