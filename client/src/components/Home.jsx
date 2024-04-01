import React from 'react'
import Signout from './Signout'
import { Typography } from '@mui/material'
import SearchBar from './SearchBar'

const Home = () => {
  return (
    <div>
        <Typography>This is home page</Typography>
        <Signout />
        <Typography>Discover & Share AI-Powered Prompts</Typography>
        <Typography>Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts</Typography>
        <SearchBar />
    </div>
  )
}

export default Home
