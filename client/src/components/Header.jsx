import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import React from 'react'

function Header() {
    return (
        <div>
            <Grid sx={{display:'flex', flexDirection: 'row', justifyContent:'space-between', ml:20, mr: 20, mt:5}}>
                <Grid item xs={6}>
                    <Typography>Promptopedia</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" sx={{borderRadius: 10, backgroundColor: 'black'}}>Sign In</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Header
