import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal, message } from "antd";
import styled from "styled-components";
import Spin from "../../common/Spin";

import { customMedia } from "../../../GlobalStyles";

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import CommentView from "./CommentView";
import { useNavigate } from "react-router-dom";
import MapContainer from "../../common/MapContainer";

import Prism from "prismjs";
import "prismjs/themes/prism.css";

// code-syntax-highlight
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

// color-syntax
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { width } from "@mui/system";
import { CompareSharp } from "@mui/icons-material";

const Main = (props) => {
  const navigate = useNavigate();

  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [club, setClub] = useState("");
  const [likedClubs, setLikedClubs] = useState([]);
  const [apply, setApply] = useState();
  const [loading, setLoading] = useState(true);
  const [createdAt, setCreatedAt] = useState();
  const clubId = useParams().id;
  const userId = localStorage.getItem("user_id");
  const reportHistory = [].concat(
    JSON.parse(localStorage.getItem("report_history"))
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/clubs/${clubId}`);

        setClub(res.data);
        let tempCeatedAt = new Date(res.data.createdAt);

        setCreatedAt(
          tempCeatedAt.getFullYear() +
            "년 " +
            (tempCeatedAt.getMonth() + 1) +
            "월 " +
            tempCeatedAt.getDate() +
            "일 " +
            tempCeatedAt.getHours() +
            "시 " +
            tempCeatedAt.getMinutes() +
            "분 " +
            tempCeatedAt.getSeconds() +
            "초"
        );

        if (userId) {
          const likedClubRes = await axios.get("/likedClubs/ids", {
            params: {
              userId: userId,
            },
          });

          setLikedClubs(likedClubRes.data.likedClubIdList);

          const applyRes = await axios.get("/members/ids", {
            params: { userId: userId },
          });


          setApply(applyRes.data.joiningClubIdList);
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const showInfoModal = () => {
    setIsInfoModalVisible(true);
  };

  const handleInfoCancel = () => {
    setIsInfoModalVisible(false);
  };

  const showReportModal = () => {
    setIsReportModalVisible(true);
  };

  const handleReportCancel = () => {
    setIsReportModalVisible(false);
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
    }
  };

  const handleLikePost = async (clubId) => {
    const data = {
      clubId: Number(clubId),
      userId: userId,
    };

    try {
      await axios.post("/likedClubs", data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikeDelete = async (clubId) => {
    try {
      await axios.delete("/likedClubs", {
        params: { userId: userId, clubId: Number(clubId) },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePostApply = async (id) => {
    try {
      const data = { userId: userId, clubId: Number(id) };
      const res = await axios.post("/members", data);
      if (res.status === 400) {
        message.error("이미 참여신청한 모임입니다.");
      }
      setApply([...apply, id]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteApply = async (clubId) => {
    try {
      const res = await axios.delete("/members", {
        params: {
          userId: userId,
          clubId: Number(clubId),
          delete: "",
        },
      });
      if (res.status === 400) {
        message.error("이미 참여취소한 모임입니다.");
      }

      const index = apply.indexOf(clubId);
      apply.splice(index, 1);
      setApply([...apply]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClub = async () => {
    try {
      const deleteRes = await axios.delete(`/clubs/users/${userId}`);

      if (deleteRes.status === 200) {
        message.success("운동모임이 성공적으로 삭제되었습니다.");
        navigate(-1);
      } else {
        message.error("운동모임 삭제에 실패하였습니다.");
      }
    } catch (err) {
      console.log(err);
      message.error("로그인이 필요한 기능입니다.");
    }
  };


  const handleReportUser = async () => {
    try {
      const getRes = await axios.get(`/users/${club.userId}`);
      if (getRes.status === 200) {
        const reportData = {
          authority: Number(getRes.data.authority),
          declaration: Number(getRes.data.declaration),
        };
        const res = await axios.put(`/users/report/${club.userId}`, reportData);
        if (res.status === 200) {
          message.success("신고가 완료되었습니다.");
          localStorage.setItem(
            "report_history",
            JSON.stringify(reportHistory.concat([clubId]))
          );
        } else {
          message.error("신고에 실패하였습니다.");
        }
      } else {
        message.error("게시글의 회원 정보를 찾을 수 없습니다.");
      }
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <SpinContainer>
          <Spin />
        </SpinContainer>
      ) : (
        <>
          <Container sx={{ p: 8 }} maxWidth="md" className="containerWrap">
            <Box
              className="headerLogo"
              display="flex"
              sx={{ pb: 3, color: "text.secondary" }}
            >
              글번호 / {club.id}
            </Box>
            <Box
              id="btnBox"
              display="flex"
              justifyContent="right"
            >
              {(() => {
                if (!reportHistory.includes(clubId)) {
                  return (
                    <>
                      <Button
                        onClick={showReportModal}
                        className="reportBtn"
                        color="error"
                        size="large"
                        startIcon={<ReportProblemIcon />}
                      >
                        <Typography fontFamily="Jua">신고</Typography>
                      </Button>
                      <StyledModal
                        visible={isReportModalVisible}
                        onCancel={handleReportCancel}
                      >
                        <Typography fontFamily="Jua">
                          한 번 신고하시면 다시 되돌릴 수 없습니다. <br />{" "}
                          신중하게 선택하신 다음 확인 버튼을 눌러주세요.
                        </Typography>

                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={handleReportUser}
                          sx={{ m: 3 }}
                        >
                          <Typography fontFamily="Jua">확인</Typography>
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="success"
                          onClick={handleReportCancel}
                          sx={{ m: 3 }}
                        >
                          <Typography fontFamily="Jua">취소</Typography>
                        </Button>
                      </StyledModal>
                    </>
                  );
                } else return;
              })()}
              <Button
                onClick={showInfoModal}
                className="infoBtn"
                color="success"
                size="large"
              >
                <Typography fontFamily="Jua">상세정보</Typography>
              </Button>
              <StyledModal
                visible={isInfoModalVisible}
                onCancel={() => handleInfoCancel()}
              >
                <Container
                  sx={{ p: 8 }}
                  maxWidth="md"
                  className="containerWrap"
                >
                  <Typography
                    variant="h5"
                    component="div"
                    className="count"
                    fontFamily="Jua"
                  >
                    참여 인원
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    component="div"
                    className="count"
                    fontFamily="Jua"
                  >
                    - {club.minPersonnel}인 ~ {club.maxPersonnel}인
                  </Typography>
                  <br />
                  <Typography
                    variant="h5"
                    component="div"
                    className="count"
                    fontFamily="Jua"
                  >
                    진행 기간
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    component="div"
                    className="count"
                    fontFamily="Jua"
                  >
                    - {club.startDate} ~ {club.endDate}
                  </Typography>
                  <br />
                </Container>
              </StyledModal>
              {(() => {
                if (club.userId === userId) {
                  return (
                    <>
                      <Button
                        onClick={()=> navigate(`../clubs/update/${clubId}`)}
                        className="modifyBtn"
                        color="warning"
                        size="large"
                      >
                        <Typography fontFamily="Jua">수정</Typography>
                      </Button>
                      <Button
                        onClick={handleDeleteClub}
                        className="deleteBtn"
                        color="error"
                        size="large"
                      >
                        <Typography fontFamily="Jua">삭제</Typography>
                      </Button>
                    </>
                  );
                } else return;
              })()}
            </Box>
            <Typography
              variant="h4"
              component="div"
              className="title"
              fontFamily="Jua"
            >
              {club.title}
            </Typography>
            <Typography
              component="div"
              className="date"
              fontFamily="Jua"
              fontSize="11px"
              sx={{ color: "text.secondary" }}
            >
              {createdAt}
            </Typography>
            <Divider />
            <Box sx={{ minHeight: '250px' }}>
              <Viewer initialValue={club.description || ""} />
            </Box>
            <Divider />
            {(() => {
              if (club.addressStreet !== "") {
                return (
                  <>
                    <Typography
                      variant="h5"
                      component="div"
                      className="mapTitle"
                      fontFamily="Jua"
                    >
                      모임 장소
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      component="div"
                      className="address"
                      fontFamily="Jua"
                    >
                      {club.addressStreet !== "undefined"
                        ? club.addressStreet
                        : ""}{" "}
                      {club.addressDetail !== "undefined"
                        ? club.addressDetail
                        : ""}
                    </Typography>
                    <MapWrapper>
                      <MapContainer
                        searchSpot={
                          club.addressStreet + " " + club.addressDetail
                        }
                      />
                    </MapWrapper>
                  </>
                );
              } else return;
            })()}
            <Box
              id="btnBox2"
              display="flex"
              justifyContent="right"
              sx={{ pt: 3 }}
            >
              <LikeContainer>
                <LikeNum>{club.likes}</LikeNum>
                <IconButton
                  aria-label="add to favorites"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (userId) {
                      handleLikedClubs(club.id);
                    } else {
                      message.warning("로그인이 필요한 기능입니다.");
                    }
                  }}
                >
                  {likedClubs.includes(club.id) ? (
                    <FavoriteIcon style={{ color: "red" }} />
                  ) : (
                    <FavoriteIcon />
                  )}
                </IconButton>
              </LikeContainer>
              <ButtonGroup variant="contained">
                {(() => {
                  if (club.userId !== userId) {
                    if (club.clubStatus !== "EXPIRED") {
                      if (userId && apply.includes(club.id))
                        return (
                          <>
                          <Button
                            onClick={() => {
                              handleDeleteApply(club.id);
                            }}
                            className="deleteBtn"
                            color="error"
                          >
                            참여취소
                          </Button>
                          </>
                        );
                      else
                        return (
                          <Button
                            className="joinBtn"
                            color="success"
                            onClick={() => {
                              if (userId) {
                                handlePostApply(club.id);
                              } else {
                                message.warning("로그인이 필요한 기능입니다.");
                              }
                            }}
                          >
                            참가신청
                          </Button>
                        );
                    } else return <Button disabled>모집마감</Button>;
                  } else return;
                })()}

                <Button
                  LinkComponent="button"
                  className="backBtn"
                  color="info"
                  onClick={() => navigate(-1)}
                >
                  돌아가기
                </Button>
              </ButtonGroup>
            </Box>
          </Container>
          <Container maxWidth="md" className="containerCmt">
            <CommentView />
          </Container>
        </>
      )}
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

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;

  .ant-modal-content {
    padding: 30px 55px;
    display: flex;
    align-items: center;

    ${customMedia.lessThan("mobile")`
      padding: 15px 25px;
    `}

    ${customMedia.between("mobile", "tablet")`
      padding: 25px 50px;
    `}
  }

  .ant-modal-body {
    text-align: center;
  }

  .ant-modal-footer {
    display: none;
  }
`;

const LikeNum = styled.span`
  ${customMedia.lessThan("mobile")`
  font-size: 14px;
`}

  ${customMedia.between("mobile", "largeMobile")`
  font-size: 16px;
`}

${customMedia.between("largeMobile", "tablet")`
  font-size: 15px;
`}

${customMedia.between("tablet", "desktop")`
  font-size: 15px;
`}
`;

const LikeContainer = styled.div`
  position: relative;
`;

const MapWrapper = styled.div`
  width: 850px;
  height: 250px;

  ${customMedia.lessThan("mobile")`
    width: 295px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    width: 363px;
  `}

	${customMedia.between("largeMobile", "tablet")`
    width: 610px;
  `}

	${customMedia.between("tablet", "desktop")`
    width: 880px;
  `}
`;
