import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material'


const SearchBar = ({ posts, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Call onSearch prop with filtered posts if provided
    if (onSearch) {
      const filteredPosts = posts.filter((post) =>
        post.prompt.toLowerCase().includes(searchTerm.toLowerCase())
      );
      onSearch(filteredPosts);
    }
  };

  return (
    <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <form>
        <TextField
          id="search"
          label="Search Posts"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white"              }
            },
            width: 500
          }}
          inputProps={{ style: { color: "white" } }}
          InputLabelProps={{
            style: { color: '#fff' },
          }}
        />
      </form>
    </Grid>
  );
};

export default SearchBar;
