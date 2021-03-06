import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import styled from "styled-components";
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from './Login';

const Nav = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const userId = localStorage.getItem("user_id");
    const userImg = localStorage.getItem("user_image");

    useEffect(() => {
        if (userId) {
            setLoggedIn(true);
        }
    }, [userId, userImg]);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const cancelModel = () => {
        setIsModalVisible(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        setLoggedIn(false);
        window.location.reload();
    };




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
                            href="/clubs"
                            underline="none"
                            fontFamily="Jua"
                            fontSize="1.5rem"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            ????????????
                        </Link>
                        <Link
                            variant="button"
                            color="inherit"
                            href="/reviews"
                            underline="none"
                            fontFamily="Jua"
                            fontSize="1.5rem"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            ??????
                        </Link>
                        {!isLoggedIn ? 
                        (
                            <>
                        <Link
                            variant="button"
                            color="inherit"
                            onClick={openModal}
                            underline="none"
                            fontFamily="Jua"
                            fontSize="1.5rem"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            ?????????
                        </Link>
                        <StyledModal visible={isModalVisible} onCancel={cancelModel}>
                            <Title>
                                WOW??? ?????? ??? ???????????? ??????
                            </Title>
                            <Login onCancel={cancelModel} setLoggedIn={setLoggedIn} />
                        </StyledModal>
                        </>
                        ):(
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
                                ???????????????
                            </Link>
                
                            <Link
                                variant="button"
                                color="inherit"
                                onClick={handleLogout}
                                underline="none"
                                fontFamily="Jua"
                                fontSize="1.5rem"
                                sx={{ my: 1, mx: 1.5 }}
                            >
                                ????????????
                            </Link>
                        </>
                        )}

                    </>
                </nav>
            </Toolbar>
        </AppBar>

    )
};



export default Nav;

const Title = styled.div`
	font-size: 26px;
	white-space: pre-wrap;
}
`

const StyledModal = styled(Modal)`
	display: flex;
	justify-content: center;

	.ant-modal-content {
		padding: 30px 55px;
		display: flex;
		align-items: center;
    }
    .ant-modal-footer {
		display: none;
	}
    `