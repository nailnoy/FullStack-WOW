import React from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


import Tags from "./TagFilter";
import SearchBar from "./SearchBar";
import ClubCard from "./ClubCard";



function Main() {
    return (
        <>
            {/* 상단 AppBar 들어갈 부분 */}
            <main>
                <Container sx={{ pt: 8 }} maxWidth="md">
                    <Typography
                        gutterBottom variant="h6"
                        component="h2"
                        fontFamily="Jua"
                        fontSize="2rem"
                        textAlign="center"
                    >
                        운동 모임 찾기
                    </Typography>
                </Container>

                <Container sx={{ py: 1 }} maxWidth="xs">
                    <SearchBar />
                </Container>

                <Container sx={{ py: 1 }} maxWidth="xs">
                    <Tags />
                </Container>

                <ClubCard />
                {/* Pagination 들어갈 부분 */}
            </main>
            {/* 카피라이트 들어갈 부분 */}
        </>
    );
};

export default Main;