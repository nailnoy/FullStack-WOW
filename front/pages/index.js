import CssBaseline from '@mui/material/CssBaseline';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Main from '../components/Main';
import MainClubCard from '../components/MainClubCard';
import Footer from '../components/Footer';
import Nav from '../components/Nav';



const theme = createTheme();

const Home = () => {
	return (
		<ThemeProvider theme={theme}>
		<CssBaseline />
    <Nav/>
		<main>
        <Main/>
        <MainClubCard/>
      </main>
      <Footer/>
    </ThemeProvider>
	
	);
};


export default Home;

