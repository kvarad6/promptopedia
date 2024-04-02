import './App.css';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/Signin';
import CreatePost from './components/CreatePost';


function App() {
  return (
    <div className="background-image">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10, height: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="create-post" element={<CreatePost />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
