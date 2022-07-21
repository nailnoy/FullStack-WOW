import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import styled from "styled-components";
import { customMedia } from "../GlobalStyles";


import {
  Container,
  Box,
  Typography,
  Grid,
  Stack,
  Button
} from '@mui/material';

import Spin from "./common/Spin";
import ClubCard from "./common/ClubCard";
import PostCard from "./common/ReviewCard";

const Main = () => {

  const [clubs, setClubs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [likedClubs, setLikedClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, [userId]);

  const fetchData = async () => {
    try {
      const clubsRes = await axios.get("/clubs", {
        params: {
          sortBy: "createdAt",
          tags: "",
          clubStatus: "ACTIVE",
          keyword: "",
          page: 1,
        },
      });
      setClubs(clubsRes.data.clubList);

      const reviewsRes = await axios.get("/reviews", {
        params: {
          keyword: "",
          page: 1,
        },
      });
      setReviews(reviewsRes.data.reviewList);
      console.log(reviewsRes.data.reviewList);

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

  const handleDeleteReview = async (id) => {
    try {
      const deleteRes = await axios.delete(`/reviews/${id}`);

      if (deleteRes.status === 200) {
        message.success("후기가 성공적으로 삭제되었습니다.");
      } else {
        message.error("후기 삭제에 실패하였습니다.");
      }
    } catch (err) {
      console.log(err);
      message.error("로그인이 필요한 기능입니다.");
    } finally {
      fetchData();
    }
  };


  return (
    <main>
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
          {clubs
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
          최근 모임 후기
        </Typography>
        <Grid container spacing={4}>
          {/* {reviews
            .filter((review, i) => i < 4)
            .map((review) => (
              <PostCard
                key={review.id}
                userId={userId}
                review={review}
                clubs={clubs}
                handleDeleteReview={handleDeleteReview}/>
            ))} */}
        </Grid>
      </Container>

    </main>
  )
};



export default Main;