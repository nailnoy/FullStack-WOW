import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import styled from "styled-components";
import { customMedia } from "../../GlobalStyles";

import {
  Container,
  Box,
  Typography,
  Grid,
  Stack,
  Button
} from '@mui/material';

import Spin from "../common/Spin";
import ClubCard from "../common/ClubCard";

const Main = () => {
	const [sortByCreatedAtClubs, setSortByCreatedAtClubs] = useState([]);
	const [sortByLikesClubs, setsortByLikesClubs] = useState([]);
	const [likedClubs, setLikedClubs] = useState([]);
	const [loading, setLoading] = useState(true);
	const userId = localStorage.getItem("user_id");

	useEffect(() => {
		fetchData();
		setLoading(false);
	}, [userId]);

	const fetchData = async () => {
		try {
			const createdAtRes = await axios.get("/clubs", {
				params: {
					sortBy: "createdAt",
					tags: "",
					clubStatus: "ACTIVE",
					keyword: "",
					page: 1,
				},
			});
			setSortByCreatedAtClubs(createdAtRes.data.clubList);

			const likesRes = await axios.get("/clubs", {
				params: {
					sortBy: "likes",
					tags: "",
					clubStatus: "ACTIVE",
					keyword: "",
					page: 1,
				},
			});
			setsortByLikesClubs(likesRes.data.clubList);

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
		} finally {
			fetchData();
		}
	};

	const handleLikeDelete = async (clubId) => {
		try {
			axios.delete("/likedClubs", {
				params: { userId: userId, clubId: Number(clubId) },
			});
		} catch (err) {
			console.log(err);
		} finally {
			fetchData();
		}
	};


  return (
    <main>
      {loading ? (
				<SpinContainer>
					<Spin />
				</SpinContainer>
			) : (
        <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            fontFamily="Jua"
            fontWeight="900"
            gutterBottom
          >
            Work Out With
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" fontFamily="Jua" paragraph>
            운동... 같이 하실래요..?
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" href="/clubs/create">모임 만들기</Button>
            <Button variant="outlined" href="/clubs">모임 검색하기</Button>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: 8 }} maxWidth="md">
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          fontFamily="Jua"
          fontSize="2rem"
        >
          최근 등록된 모임
        </Typography>
        <Grid container spacing={4}>
          {sortByCreatedAtClubs
            .filter((club, i) => i < 4)
            .map((club) => (
              <ClubCard
                key={club.id}
                userId={userId}
                club={club}
                likedClubs={likedClubs}
                handleLikedClubs={handleLikedClubs} />
            ))}
        </Grid>
      </Container>

      <Container sx={{ py: 8 }} maxWidth="md">
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          fontFamily="Jua"
          fontSize="2rem"
          marginTop="100px"
        >
          인기있는 모임
        </Typography>
        <Grid container spacing={4}>
          {sortByLikesClubs
            .filter((club, i) => i < 4)
            .map((club) => (
              <ClubCard
                key={club.id}
                userId={userId}
                club={club}
                likedClubs={likedClubs}
                handleLikedClubs={handleLikedClubs} />
            ))}
        </Grid>
      </Container>
      </>
      )}
    </main>
  )
};



export default Main;

const SpinContainer = styled.div`
	width: 100%;
	height: 80vh;

	display: flex;
	justify-content: center;
	align-items: center;

	${customMedia.lessThan("mobile")`
    height: 40vh;
  `}

	${customMedia.between("mobile", "largeMobile")`
    height: 40vh;
  `}

	${customMedia.between("largeMobile", "tablet")`
    height: 40vh;
  `}
`;
