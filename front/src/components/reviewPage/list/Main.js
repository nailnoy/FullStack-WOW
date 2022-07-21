import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import {
  Row,
  message
} from "antd";

import {
  Container,
  Typography,
  Grid,
  Fab,
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

import Spin from "../../common/Spin";
import PostCard from "./ReviewCard";
import SearchBar from "../../common/SearchBar";
import Pagination from "../../common/Pagination";
import { customMedia } from "../../../GlobalStyles";
import ReviewCreate from "../create/Main";

function PostMain() {
  const params = new URLSearchParams(window.location.search);
  const [clubs, setClubs] = useState();
  const [reviews, setReviews] = useState();
  const [keyword, setKeyword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user_id");


  useEffect(() => {
    fetchData();
    setLoading(false);
  }, [page, keyword, total, userId]);

  const fetchData = async () => {
    try {
      const clubRes = await axios.get("/clubs/review");
      setClubs(clubRes.data.clubList);

      const res = await axios.get("/reviews", {
        params: {
          keyword: keyword,
          page: page,
        },
      });

      setReviews(res.data.reviewList);
      setTotal(res.data.totalCount);

      if (params.get("title")){
        setKeyword(params.get("title"))
      }

    } catch (err) {
      console.log(err);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
    <>
      <main>
        {loading ? (
          <SpinContainer>
            <Spin />
          </SpinContainer>
        ) : (
          <>
            <Container sx={{ pt: 8 }} maxWidth="md">
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                fontFamily="Jua"
                fontSize="2rem"
                textAlign="center"
              >
                후기 검색
              </Typography>
            </Container>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Container sx={{ py: 1 }} maxWidth="xs">
                <SearchBar keyword={keyword} setKeyword={setKeyword} />
              </Container>
              

            </div>
            <Container sx={{ py: 8 }} maxWidth="md">
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                fontFamily="Jua"
                fontSize="2rem"
              >
                등록된 후기 목록
              </Typography>
              <Grid container spacing={4}>

                {reviews
                  ? reviews.map((review) => (
                    <PostCard
                      key={review.id}
                      userId={userId}
                      review={review}
                      clubs={clubs}
                      handleDeleteReview={handleDeleteReview}/>
                  ))
                  : ""}
              </Grid>
            </Container>
            <FabContainer>
              <Fab color="primary" aria-label="add" onClick={showModal} >
                <AddIcon />
              </Fab>
            </FabContainer>

            <ReviewCreate 
              isModalVisible={isModalVisible}
              handleCancel={handleCancel}
              clubs={clubs}
            />

         
            <PaginationRow>
              <Pagination
                total={total}
                pageSize={9}
                current={page}
                onChange={(page) => setPage(page)}
              />
            </PaginationRow>
          </>
        )}


      </main>
    </>
  );
}

export default PostMain;

const FabContainer = styled.div`
  position: fixed;
  bottom: 2%;
  right: 2%;
`;

const SpinContainer = styled.div`
	width: 100%;
	height: 80vh;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const PaginationRow = styled(Row)`
  width: 100%;
  margin-top: 48px;
  justify-content: center;

  ${customMedia.lessThan("mobile")`
    margin-top: 24px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    margin-top: 24px;
  `}

	${customMedia.between("mobile", "tablet")`
    margin-top: 24px;
    `}
`;
