import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";
import { message } from "antd";
import CommentView from "./CommentView";

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
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Container
} from "@mui/material";

const PostCard = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [postComment, setPostComment] = useState("");
  const reportHistory = [].concat(
    JSON.parse(localStorage.getItem("report_history_review"))
  );

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

  const handleReportUser = async () => {
    try {
      const getRes = await axios.get(`/users/${props.review.userId}`);
      if (getRes.status === 200) {
        const reportData = {
          authority: Number(getRes.data.authority),
          declaration: Number(getRes.data.declaration),
        };
        const res = await axios.put(`/users/report/${props.review.userId}`, reportData);
        if (res.status === 200) {
          message.success("신고가 완료되었습니다.");
          localStorage.setItem(
            "report_history_review",
            JSON.stringify(reportHistory.concat([props.review.id]))
          );
        } else {
          message.error("신고에 실패하였습니다.");
        }
      } else {
        message.error("게시글의 회원 정보를 찾을 수 없습니다.");
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
        message.success("댓글이 성공적으로 등록되었습니다.");
      } else {
        message.error("댓글 등록에 실패했습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onReset = () => {
    setPostComment("");
  };


  return (
    <Grid item key={1} xs={12} sm={6} md={4}>
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
                    <MenuItem onClick={handleClose}>수정</MenuItem>
                    <MenuItem
                      onClick={() => props.handleDeleteReview(props.review.id)}>
                      삭제
                    </MenuItem>
                  </>
                );
              } else return;
            })()}
            <MenuItem onClick={handleClose}>자세히</MenuItem>
            {(() => {
              if (!reportHistory.includes(props.review.id)) {
                return (
                  <MenuItem onClick={handleReportUser}>신고</MenuItem>
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
          >
            {props.review.userName}
          </Link>{" "}
          {props.review.contents}
        </Typography>
        <Link
          component="button"
          underline="none"
          fontSize="sm"
          startDecorator="…"
          sx={{ color: "text.tertiary" }}
          onClick={showModal}
        >
          더보기
        </Link>
        <Dialog
          open={isModalVisible}
          onClose={() => handleCancel()}
          scroll="body"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          maxWidth="md"
          fullWidth={true}
        >
          <DialogTitle id="scroll-dialog-title">
            <Grid container spacing={0} justifyContent="space-between">
              <Box display="grid" gridAutoFlow="column" sx={{mt:1}}>
                <Avatar src={props.review.userImgUrl} sx={{ width: 24, height: 24, mr: 1, mt: 0.5 }}/>
                {props.review.userName}님의 후기
              </Box>
              <Box sx={{mt:0.5}}>
                <Button color="error" onClick={handleCancel}>
                  <Typography fontFamily="Jua">신고하기</Typography>
                </Button>
                <Button color="primary" onClick={handleCancel}>
                  <Typography fontFamily="Jua">돌아가기</Typography>
                </Button>
              </Box>
            </Grid>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1} fontFamily="Jua">
              <AspectRatio sx={{p: 1, pb: 2 }}>
                <img src={props.review.imgUrl}/>
              </AspectRatio>
              {props.review.contents}
            </DialogContentText>
          </DialogContent>
          <DialogContent >
            <CommentView reviewId={props.review.id}/>
          </DialogContent>
        </Dialog>
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
            placeholder="댓글을 입력하세요..."
            sx={{ flexGrow: 1, mr: 1, "--Input-focusedThickness": "0px" }}
            onChange={(e) => {
              setPostComment(e.target.value);
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
                handlePostComment();
                onReset();
              } else {
                message.warning("로그인이 필요한 기능입니다.");
              }
            }}
          >
            댓글
          </Link>
        </CardOverflow>
      </Card>
    </Grid>
  );
};

export default PostCard;
