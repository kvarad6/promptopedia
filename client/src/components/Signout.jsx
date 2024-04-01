import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Button } from '@mui/material'
import { auth } from "../firebase"

const Signout = () => {

    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const uid = user.uid;
                console.log(uid)
                setAuthUser(user)
            } else {
                // User is signed out
                setAuthUser(null);
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
        navigate("/signin");
    }

    const navigate = useNavigate();

    return (
        <div>
                {/* {authUser ? <><p>{`Signed in as ${authUser.email}`}</p><Button variant="contained" onClick={userSignout}>Sign Out</Button></> : <p></p>} */}
                <Button variant="contained" sx={{ borderRadius: 10 }} onClick={userSignout}>Sign Out</Button>
        </div>
    )
}

export default Signout