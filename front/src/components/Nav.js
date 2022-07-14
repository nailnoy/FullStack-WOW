import React from "react";
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import Modal from './common/Modal';
import Login from './Login';



const Nav = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const openModal = () => {
        setModalVisible(true)
    }
    const closeModal = () => {
        setModalVisible(false)
    }


    const [isLoggedIn, setLoggedIn] = useState(false);
    const userId = localStorage.getItem("user_id");


    useEffect(() => {
        if (userId) {
            setLoggedIn(true);
    
        }
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem("user_id");
  
        setLoggedIn(false);
        window.location.reload();

    };

    const dropdownMenu = (
        <>
            <Link
                variant="button"
                color="inherit"
                href="/mypage"
                underline="none"
                fontFamily="Jua"
                fontSize="1.5rem"
                sx={{ my: 1, mx: 1.5 }}
            >
                마이페이지
            </Link>

            <Link
                variant="button"
                color="inherit"
                onClick={ handleLogout }
                underline="none"
                fontFamily="Jua"
                fontSize="1.5rem"
                sx={{ my: 1, mx: 1.5 }}
            >
                로그아웃
            </Link>
        </>
    );


    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    <Link
                        variant="button"
                        color="inherit"
                        href="/"
                        underline="none"
                        fontFamily="Jua"
                        fontSize="2.5rem"
                        fontWeight="900"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        WOW
                    </Link>
                </Typography>
                <nav>
    <>
                
                    <Link
                        variant="button"
                        color="inherit"
                        href="/club"
                        underline="none"
                        fontFamily="Jua"
                        fontSize="1.5rem"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        모임목록
                    </Link>
                    <Link
                        variant="button"
                        color="inherit"
                        href="/post"
                        underline="none"
                        fontFamily="Jua"
                        fontSize="1.5rem"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        게시판
                    </Link>
                    <dropdownMenu/>
                    {!isLoggedIn && <Link
                        variant="button"
                        color="inherit"
                        onClick={openModal}
                        underline="none"
                        fontFamily="Jua"
                        fontSize="1.5rem"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        로그인
                    </Link>
}
                    {
                        modalVisible && <Modal
                            visible={modalVisible}
                            closable={true}
                            maskClosable={true}
                            onClose={closeModal}><Login onCancel={closeModal} /></Modal>
                    }

</>
                </nav>
            </Toolbar>
        </AppBar>

    )
};



export default Nav;