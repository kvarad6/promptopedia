import './App.css';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/Signin';


function App() {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10, backgroundColor: '#389194', height:"100vh"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<Signin />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
