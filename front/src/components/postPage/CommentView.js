import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, message } from "antd";
import styled from "styled-components";
import { customMedia } from "../../GlobalStyles";
import { useParams } from "react-router-dom";

import Comment from "./Comment";
import Pagination from "../common/Pagination";
import profile from "../../images/icons/profile.png";
import { Box, Button, Container, List, ListItem, Typography } from "@mui/material";

const CommentView = (props) => {
  const [reivew, setReview] = useState();
  const [comments, setComments] = useState();
  const [postComment, setPostComment] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const [editable, setEditable] = useState();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [apply, setApply] = useState();
  const [loading, setLoading] = useState(true);
  const clubId = useParams().id;
  const userId = localStorage.getItem("user_id");
  const userImg = localStorage.getItem("user_image");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/reviews/${props.reviewId}`);

        setReview(res.data);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    fetchCmtData();
  }, [userImg, total, page]);

  const fetchCmtData = async () => {
    const res = await axios.get(`/reviewcomments/reviews/${props.reviewId}`, {
      params: { page: page },
    });

    setComments(res.data.commentList);
    setTotal(res.data.totalCount);
  };

  const handlePostComment = async () => {
    const data = {
      userId: userId,
      reviewId: Number(props.reviewId),
      contents: postComment,
    };

    try {
      const res = await axios.post("/reviewcomments", data);

      if (res.status === 200) {
        message.success("댓글이 성공적으로 등록되었습니다.");
      } else {
        message.error("댓글 등록에 실패했습니다.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      fetchCmtData();
    }
  };

  const handleUpdateComment = async (id) => {
    const data = {
      userId: userId,
      contents: updateComment,
    };

    try {
      const res = await axios.put(`/reviewcomments/${id}`, data);

      if (res.status === 200) {
        message.success("댓글이 성공적으로 수정되었습니다.");
      } else {
        message.error("댓글 수정에 실패했습니다.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      fetchCmtData();
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const res = await axios.delete(`/comments/${id}`);

      if (res.status === 200) {
        message.success("댓글이 성공적으로 삭제되었습니다.");
      } else {
        message.error("댓글 삭제에 실패했습니다.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      fetchCmtData();
    }
  };

  const onReset = () => {
    setPostComment("");
  };

  return (
    <>
      <Container sx={{ pb: 2 }}>
        <Typography
          sx={{
            fontFamily: "jua",
            fontSize: "24px",
            fontWeight: "500",
          }}
        >
          댓글 ({total})
        </Typography>
      </Container>
      <Container>
        <Box
          sx={{
            border: 1,
            borderRadius: '10px',
            margin: '0 auto',
            padding: '10px',
            display: 'flex',
          }}
        >
          <ProfileIcon>
            {userImg ? (
              <img src={userImg} alt="User profile" />
            ) : (
              <img src={profile} alt="User profile icon" />
            )}
          </ProfileIcon>
          <StyledInput
            value={postComment}
            placeholder="댓글을 입력하세요..."
            onChange={(e) => {
              setPostComment(e.target.value);
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              if (userId) {
                handlePostComment();
                onReset();
              } else {
                message.warning("로그인이 필요한 기능입니다.");
              }
            }}
          >
            <Typography fontFamily="Jua">등록</Typography>
          </Button>
        </Box>
        <List >
          {comments
            ? comments.map((comment) => (
              <ListItem sx={{ my: 1, width: 'md' }}>
                <Comment
                  key={comment.id}
                  comment={comment}
                  userId={userId}
                  setUpdateComment={setUpdateComment}
                  editable={editable}
                  setEditable={setEditable}
                  handleUpdateComment={handleUpdateComment}
                  handleDeleteComment={handleDeleteComment}
                />
              </ListItem>
            ))
            : ""}
        </List>
      </Container>
      <PaginationRow>
        <Pagination
          total={total}
          pageSize={5}
          current={page}
          onChange={(page) => setPage(page)}
        />
      </PaginationRow>
    </>
  );
};

export default CommentView;

const ProfileIcon = styled.div`
  width: 48px;
  height: 48px;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
  }

  ${customMedia.lessThan("mobile")`
    width: 28px;
    height: 28px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    width: 28px;
    height: 28px;
  `}

	${customMedia.between("largeMobile", "tablet")`
    width: 32px;
    height: 32px;
  `}

	${customMedia.between("tablet", "desktop")`
    width: 40px;
    height: 40px;
  `}
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  font-size: 20px;
  flex: 2;

  ${customMedia.lessThan("mobile")`
    font-size: 14px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 14px;
  `}

	${customMedia.between("largeMobile", "tablet")`
    font-size: 14px;
  `}

	${customMedia.between("tablet", "desktop")`
    font-size: 16px;
  `}
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
