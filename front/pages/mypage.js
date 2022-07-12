import AppLayout from "../components/AppLayout";
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import Head from "next/head";

import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Main from '../components/myPage/Main'

const Profile = () => {
   
    return (
        <>
            <Head>
                <title>내 프로필 | WOW</title>
            </Head>
            <Nav/>

            <Main/>
       
            <Footer/>
    


        </>
    );
};

export default Profile;