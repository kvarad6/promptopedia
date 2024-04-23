import React, { useState } from 'react'
import { Typography, Grid, TextField, IconButton, Input, InputLabel } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';


const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value)
    if (onSearch) { // Call onSearch prop function if provided
      onSearch(event.target.value);
    }
  };

  return (
    <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 5 }}>
      <form noValidate autoComplete="off">
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearchChange}>
                <SearchIcon />
              </IconButton>
            )
          }}
        />
      </form>
    </Grid>
  )
}

export default SearchBar