import './App.css';
import { Box } from '@mui/material';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';


function App() {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10, backgroundColor: '#389194', height:"100vh"}}>
        <Header />
        <Body />
        <Footer />
      </Box>
    </>
  );
}

export default App;
