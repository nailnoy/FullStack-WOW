import React from "react";
import Head from 'next/head';
import Main from "../components/clubPage/Main";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const club = () => {
    return(
        <>
            <Head>
                <title>운동 모임 찾기 | WOW</title>
            </Head>
            <Nav />
            <Main />
            <Footer />
        </>
    );
};

export default club;