import React from "react";
import ClubPostView from "../components/clubPage/view/clubPostView";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const ClubPostViewPage = () =>{
    return(
        <>
        <Nav />
        <ClubPostView/>
        <Footer />
        </>
    );
};

export default ClubPostViewPage;