import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { Container, Typography, Grid } from '@mui/material';
import { message } from "antd";

import Tags from "./TagFilter";
import SearchBar from "./SearchBar";
import ClubCard from "./ClubCard";
import Spin from "../common/Spin";



function Main() {
    const [clubs, setClubs] = useState();
	const [sortBy, setSortBy] = useState("createdAt");
	const [clubStatus, setClubStatus] = useState("");
	const [selectedTags, setSelectedTags] = useState([]);
	const [keyword, setKeyword] = useState("");
	const [likedClubs, setLikedClubs] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const userId = localStorage.getItem("user_id");

    useEffect(() => {
		fetchData();
		setLoading(false);
	}, [clubStatus, page, keyword, selectedTags, sortBy, userId]);

	const fetchData = async () => {
		const sendTags = selectedTags.join(", ");

		try {
			const res = await axios.get("/clubs", {
				params: {
					sortBy: sortBy,
					tags: sendTags,
					clubStatus: clubStatus,
					keyword: keyword,
					page: page,
				},
			});

			setClubs(res.data.clubList);

			if (userId) {
				const likedClubRes = await axios.get("/likedClubs/ids", {
					params: {
						userId: userId,
					},
				});
				setLikedClubs(likedClubRes.data.likedClubIdList);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleLikedClubs = (clubId) => {
		let index = likedClubs.indexOf(clubId);

		try {
			if (likedClubs.includes(clubId)) {
				likedClubs.splice(index, 1);
				setLikedClubs([...likedClubs]);
				handleLikeDelete(clubId);
			} else {
				setLikedClubs([...likedClubs, clubId]);
				handleLikePost(clubId);
			}
		} catch (err) {
			console.log(err);
		} finally {
			fetchData();
		}
	};

	const handleLikePost = async (clubId) => {
		try {
			await axios.post("/likedClubs", {
				clubId: Number(clubId),
				userId: userId,
			});
		} catch (err) {
			message.error("이미 좋아요한 독서모임입니다.");
		}
	};

	const handleLikeDelete = async (clubId) => {
		try {
			axios.delete("/likedClubs", {
				params: { userId: userId, clubId: Number(clubId) },
			});
		} catch (err) {
			console.log(err);
		}
	};


    return (
        <>
            {/* 상단 AppBar 들어갈 부분 */}
            <main>
            {loading ? (
                <SpinContainer>
                <Spin />
            </SpinContainer>
        ) : (
            <>
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
                    <SearchBar keyword={keyword} setKeyword={setKeyword} />
                </Container>

                <Container sx={{ py: 1 }} maxWidth="xs">
                    <Tags />
                </Container>

                <Container sx={{ py: 0 }} maxWidth="md">
                    <Grid container spacing={4}>
                    {clubs
							? clubs.map((club) => (
									<ClubCard
										key={club.id}
										userId={userId}
										club={club}
										likedClubs={likedClubs}
										handleLikedClubs={handleLikedClubs}
									/>
							  ))
							: ""}
                </Grid>
                </Container>
                </>
        )}
            </main>
            {/* 카피라이트 들어갈 부분 */}
        </>
    );
};

export default Main;

const SpinContainer = styled.div`
	width: 100%;
	height: 80vh;

	display: flex;
	justify-content: center;
	align-items: center;
`;