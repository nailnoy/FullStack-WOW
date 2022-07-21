import React from "react";
import Footer from './Footer';
import Nav from './Nav';

import '../../Font.css';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const AppLayout = ({ children }) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Nav />
                {children}
                <Footer />
            </ThemeProvider>
        </>
    );
};


export default AppLayout;