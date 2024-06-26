import './App.css';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/Signin';
import CreatePost from './components/CreatePost';
import Posts from './components/Posts'
import UserProfile from './components/UserProfile';
import EditPost from './components/EditPost';


function App() {
  return (
    <div className="background-image">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10, height: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/edit-post" element={<EditPost />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
