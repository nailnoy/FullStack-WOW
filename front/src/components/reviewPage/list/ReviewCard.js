import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";
import { message } from "antd";
import Spin from "../../common/Spin";
import styled from "styled-components";

import { Grid, Menu, MenuItem } from "@mui/material";

import {
  Avatar,
  Box,
  Link,
  Input,
  Typography,
} from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Face from "@mui/icons-material/Face";

import ReviewUpdate from "../update/Main";
import ReviewDetail from "../detail/Main";

const ReviewCard = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [postComment, setPostComment] = useState("");
  const userId = localStorage.getItem("user_id");
  const open = Boolean(anchorEl);
  const reportHistory = [].concat(
    JSON.parse(localStorage.getItem("report_history_review"))
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setUser(await axios.get(`/users/${userId}`));
    
    setLoading(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showUpdateModal = () => {
    setIsUpdateModalVisible(true);
    handleClose();
  };

  const handleCancelUpdate = () => {
    setIsUpdateModalVisible(false);
  };

  const checkAthority = () => {
    if(user.data.authority == "BANNED"){
      return false;
      
    }else{
      return true;
    }
  };
  
  const handleReportUser = async () => {
    try {
      const getRes = await axios.get(`/users/${props.review.userId}`);
      if (getRes.status === 200) {
        const reportData = {
          declaration: Number(getRes.data.declaration),
        };
        const res = await axios.put(`/users/report/${props.review.userId}`, reportData);
        if (res.status === 200) {
          message.success("????????? ?????????????????????.");
          localStorage.setItem(
            "report_history_review",
            JSON.stringify(reportHistory.concat([props.review.id]))
          );
        } else {
          message.error("????????? ?????????????????????.");
        }
      } else {
        message.error("????????? ?????? ????????? ?????? ??? ????????????.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePostComment = async () => {
    const data = {
      userId: props.userId,
      reviewId: Number(props.review.id),
      contents: postComment,
    };

    try {
      const res = await axios.post("/reviewcomments", data);

      if (res.status === 200) {
        message.success("????????? ??????????????? ?????????????????????.");
      } else {
        message.error("?????? ????????? ??????????????????.");
      }
    } catch (err) {
      console.log(err);
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
    <Grid item xs={12} sm={6} md={4}>
      <Card
        variant="outlined"
        sx={{
          "--Card-radius": (theme) => theme.vars.radius.sm,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        >
        <Box
          sx={{ display: "flex", alignItems: "center", pb: 1.5, gap: 1 }}
          >
          <Box
            sx={{
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                m: "-2px",
                borderRadius: "50%",
                background:
                "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
              },
            }}
            >
            <Avatar
              size="sm"
              src={props.review.userImgUrl}
              sx={{
                border: "2px solid",
                borderColor: "background.body",
              }}
              />
          </Box>
          <Typography fontWeight="lg">
            {props.review.userName}
          </Typography>
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ ml: "auto" }}
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            >
            <MoreHoriz />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            >
            {(() => {
              if (props.review.userId === props.userId) {
                return (
                  <>
                    <MenuItem onClick={() =>{
                      if(checkAthority()){
                        props.setEditable(props.comment.id);
                        showUpdateModal();
                      } else {
                        message.error("?????? ???????????? ?????? ????????? ????????? ?????????");
                      }
                      }}
                      >
                        ??????
                      </MenuItem>
                    <MenuItem
                      onClick={() => props.handleDeleteReview(props.review.id)}>
                      ??????
                    </MenuItem>
                  </>
                );
              } else return;
            })()}
            <MenuItem onClick={showModal}>?????????</MenuItem>
            {(() => {
              if (!reportHistory.includes(props.review.id)) {
                return (
                  <MenuItem onClick={handleReportUser}>??????</MenuItem>
                  );
                } else return;
              })()}
          </Menu>
        </Box>
        <CardOverflow>
          <AspectRatio objectFit="contain">
            {props.review.imgUrl ? (
              <img
              src={props.review.imgUrl}
              alt="default"
              />
              ) : (
              <img
              src="http://drive.google.com/uc?export=view&id=1z3CRSIYjm0c9IlEgk5LSMG2XbkvdqWdA"
              alt="default"
              />
            )}
          </AspectRatio>
        </CardOverflow>
        <Box
          sx={{ display: "flex", alignItems: "center", mx: -1, my: 1 }}
          >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mx: "auto",
            }}
            >
            {[...Array(5)].map((_, index) => (
              <Box
              key={index}
              sx={{
                borderRadius: "50%",
                width: `max(${6 - index}px, 3px)`,
                height: `max(${6 - index}px, 3px)`,
                bgcolor:
                index === 0 ? "primary.solidBg" : "background.level3",
              }}
              />
              ))}
          </Box>
          <Box
            sx={{
              width: 0,
              display: "flex",
              flexDirection: "row-reverse",
            }}
            >
          </Box>
        </Box>
        <Typography
          fontSize="sm"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            minHeight: "70px"
          }}
          >
          <Link
            component="button"
            color="neutral"
            fontWeight="lg"
            textColor="text.primary"
            onClick={() => navigate(`../detail/${props.review.clubId}`)}
            >
            {props.review.clubTitle} ??? ??????
          </Link>{" "}
          {props.review.contents}
        </Typography>
        <Link
          component="button"
          underline="none"
          fontSize="sm"
          startDecorator="???"
          sx={{ color: "text.tertiary" }}
          onClick={showModal}
          >
          ?????????
        </Link>
        <ReviewDetail
          key={props.review.id}
          review={props.review}
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          handleReportUser={handleReportUser}
          reportHistory={reportHistory} />
        <Link
          component="button"
          underline="none"
          fontSize="10px"
          sx={{ color: "text.tertiary", my: 0.5 }}
          >
          {moment(props.review.createdAt).fromNow()}
        </Link>
        <CardOverflow sx={{ p: "var(--Card-padding)", display: "flex" }}>
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            sx={{ ml: -1 }}
            >
            <Face />
          </IconButton>
          <Input
            value={postComment}
            variant="plain"
            size="sm"
            placeholder="????????? ???????????????..."
            sx={{ flexGrow: 1, mr: 1, "--Input-focusedThickness": "0px" }}
            onChange={(e) => {
              if(checkAthority()){
                setPostComment(e.target.value);
              } else {
                message.error("?????? ???????????? ?????? ????????? ????????? ?????????");
              }
            }}
            />
          <Link
            bgcolor="lightblue"
            variant="outlined"
            underline="none"
            role="button"
            fontSize="sm"
            onClick={() => {
              if (props.userId) {
                if(checkAthority()){
                  handlePostComment();
                  onReset();
                } else {
                  message.error("?????? ???????????? ?????? ????????? ????????? ?????????");
                }
              } else {
                message.warning("???????????? ????????? ???????????????.");
              }
            }}
            >
            ??????
          </Link>
        </CardOverflow>
      </Card>
      <ReviewUpdate
        key={props.review.id}
        userId={props.userId}
        review={props.review}
        clubs={props.clubs}
        isUpdateModalVisible={isUpdateModalVisible}
        handleCancelUpdate={handleCancelUpdate} />
    </Grid>
        )}
      </>
  );
};

export default ReviewCard;

const SpinContainer = styled.div`
	width: 100%;
	height: 80vh;

	display: flex;
	justify-content: center;
	align-items: center;
`;