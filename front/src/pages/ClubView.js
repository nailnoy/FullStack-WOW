import React from "react";
import Main from "../components/clubPage/view/Main";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const ClubView = (props) =>{
    return(
        <>
        <Nav />
        <Main {...props} />
        <Footer />
        </>
    );
};

export default ClubView;