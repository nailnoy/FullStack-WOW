import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { customMedia } from "../../../GlobalStyles";
import { Row, message } from "antd";
import { Box, Button, Container, List, ListItem, Typography } from "@mui/material";

import Comment from "./Comment";
import Spin from "../../common/Spin";
import Pagination from "../../common/Pagination";
import profile from "../../../images/icons/profile.png";


const CommentView = (props) => {
  const [comments, setComments] = useState();
  const [postComment, setPostComment] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const [editable, setEditable] = useState();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const clubId = useParams().id;
  const userId = localStorage.getItem("user_id");
  const userImg = localStorage.getItem("user_image");

  useEffect(() => {
    fetchCmtData();
  }, [userImg, total, page]);

  const fetchCmtData = async () => {
    const res = await axios.get(`/comments/clubs/${clubId}`, {
      params: { page: page },
    });
    
    setComments(res.data.commentList);
    setTotal(res.data.totalCount);
    
    setUser(await axios.get(`/users/${userId}`));
    
    setLoading(false);
  };

  const checkAthority = () => {
    if(user.data.authority == "BANNED"){
      return false;
    }else{
      return true;
    }
  };

  const handlePostComment = async () => {
    const data = {
      userId: userId,
      clubId: Number(clubId),
      contents: postComment,
    };

    try {
      const res = await axios.post("/comments", data);

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
      const res = await axios.put(`/comments/${id}`, data);

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
      {loading ? (
        <SpinContainer>
          <Spin />
        </SpinContainer>
      ) : (
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
                  if(checkAthority()){
                    setPostComment(e.target.value);
                  } else {
                    message.error("신고 누적으로 인해 이용이 불가능 합니다");
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={() => {
                  if (userId) {
                    if(checkAthority()){
                      handlePostComment();
                      onReset();
                    } else {
                      message.error("신고 누적으로 인해 이용이 불가능 합니다");
                    }
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
      )}
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
