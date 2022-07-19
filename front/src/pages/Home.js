import React from "react";
import Main from '../components/Main';
import MainClubCard from '../components/MainClubCard';
import MainPostCard from '../components/MainPostCard';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

import './Font.css';
import CssBaseline from '@mui/material/CssBaseline';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Home = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
		      <CssBaseline />
      <Nav />
        <Main />
        <MainClubCard />
        <MainPostCard />
      <Footer />
      </ThemeProvider>
    </>
  );
};


export default Home;

