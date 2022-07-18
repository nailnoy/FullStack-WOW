import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import React from "react";
import { Viewer } from "@toast-ui/react-editor";
import CommentView from "./CommentView";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const MD = `
  내용 테스트
  # 헤더1
  ## 헤더2
  ### 헤더3
  __마크다운__ 을 _이용한_ 게시글을 읽어냅니다.
  
  `;
  return (
    <>
      <Container sx={{ p: 8 }} maxWidth="md" className="containerWrap">
        <Box
          className="headerLogo"
          display="flex"
          sx={{ pb: 3, color: "text.secondary" }}
        >
          {/* {ViewContents.noteId}/{ViewContents.title} */}
          글번호 / 제목 or url
        </Box>
        <Box
          id="btnBox"
          //   className={ ViewContents.noteId === "admin" || UserAuth === false ? "noneDisplay" : "onDisplay" }
          display="flex"
          justifyContent="right"
        >
          <Button
            // onClick={onModifyHandler}
            className="modifyBtn"
            color="warning"
            size="large"
          >
            <Typography fontFamily="Jua">수정</Typography>
          </Button>
          <Button
            // onClick={onDeleteHandler}
            className="deleteBtn"
            color="error"
            size="large"
          >
            <Typography fontFamily="Jua">삭제</Typography>
          </Button>
        </Box>

        <section>
          <Typography
            variant="h4"
            component="div"
            className="title"
            fontFamily="Jua"
          >
            {/* {ViewContents.title} */}
            제목
          </Typography>
          {/* <Divider /> */}
          <Typography
            component="div"
            className="date"
            fontFamily="Jua"
            fontSize="11px"
            sx={{ color: "text.secondary" }}
          >
            {/* {ViewContents.date} */}
            YYYY년 MM월 DD일 HH시 MM분 SS초
          </Typography>
          <Divider />
          {/* <Viewer initialValue={ViewContents.text}/> */}
          <Viewer initialValue={MD} />
          <Divider />
        </section>
        <Box id="btnBox2" display="flex" justifyContent="right" sx={{ pt: 3 }}>
          <ButtonGroup variant="contained">
            <Button
              // onClick={onJoinHandler}
              className="joinBtn"
              color="success"
            >
              참가신청
            </Button>
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
      <Container sx={{ p: 8 }} maxWidth="md" className="containerCmt">
        <CommentView />
      </Container>
    </>
  );
};
export default Main;
