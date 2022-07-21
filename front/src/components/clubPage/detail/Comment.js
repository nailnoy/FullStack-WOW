import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Input, message } from "antd";
import { customMedia } from "../../../GlobalStyles";
import { Box, Button, Typography } from "@mui/material";
import Spin from "../../common/Spin";

const Comment = (props) => {
  const createdAt = new Date(props.comment.createdAt).toLocaleString();
  const updatedAt = new Date(props.comment.updatedAt).toLocaleString();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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

  return (
    <>
    {loading ? (
      <SpinContainer>
        <Spin />
      </SpinContainer>
    ) : (
      <CmtContainer>
      <ProfileIcon>
        <img src={props.comment.userImgUrl} alt="User profile" />
      </ProfileIcon>
      <Box
        sx={{
          pl: "10px",
          maxWidth: "720px",
          position: "relative",
          bgcolor: "aliceblue",
          borderRadius: "10px",
        }}
        >
        <CmtWriter>{props.comment.userName}</CmtWriter>
        <CmtDate>{createdAt !== updatedAt ? updatedAt : createdAt}</CmtDate>
        <CmtUpdateCheck>
          {createdAt !== updatedAt ? "(수정됨)" : ""}
        </CmtUpdateCheck>
        {props.comment.userId === props.userId ? (
          <Button
          size="small"
          variant="text"
          color="warning"
          onClick={() => {
            if(checkAthority()){
              props.setEditable(props.comment.id)
            } else {
              message.error("신고 누적으로 인해 이용이 불가능 합니다");
            }
          }}
          >
            <Typography fontFamily="Jua">수정</Typography> 
          </Button>
        ) : (
          ""
          )}
        {props.comment.userId === props.userId ? (
          <Button
          size="small"
          variant="text"
          color="error"
          onClick={() => props.handleDeleteComment(props.comment.id)}
          >
            <Typography fontFamily="Jua">삭제</Typography>
          </Button>
        ) : (
          ""
          )}
        <CmtText>
          {props.editable === props.comment.id ? (
            <>
              <CmtInput
                defaultValue={props.comment.contents}
                onChange={(e) => {
                  console.log(e.target.value);
                  props.setUpdateComment(e.target.value);
                }}
                />
              <ConfirmBtn
                onClick={() => {
                  props.handleUpdateComment(props.comment.id);
                  props.setEditable();
                }}
                >
                확인
              </ConfirmBtn>
              <CancelBtn onClick={() => props.setEditable()}>취소</CancelBtn>
            </>
          ) : (
            props.comment.contents
            )}
        </CmtText>
      </Box>
    </CmtContainer>
    )}
    </>
  );
};

export default Comment;

const SpinContainer = styled.div`
	width: 100%;
	height: 80vh;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const CmtContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileIcon = styled.div`
  padding: 5px;
  width: 48px;
  height: 48px;

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

	img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;

const CmtWriter = styled.span`
  font-weight: bold;
  font-size: 22px;
  margin-right: 5px;

  ${customMedia.lessThan("mobile")`
    font-size: 16px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 16px;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    font-size: 18px;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 20px;
  `}
`;

const CmtDate = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: #959595;

  ${customMedia.lessThan("mobile")`
    font-size: 12px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 12px;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    font-size: 12px;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 14px;
  `}
`;

const CmtUpdateCheck = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: #fea82f;
  margin-left: 5px;

  ${customMedia.lessThan("mobile")`
    font-size: 10px;
    margin-left: 0;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 12px;
    margin-left: 0;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    font-size: 12px;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 14px;
  `}
`;

const CmtText = styled.div`
  font-size: 16px;
  padding: 5px 0;

  ${customMedia.lessThan("mobile")`
    font-size: 12px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 12px;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    font-size: 12px;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 14px;
  `}
`;

const CmtInput = styled(Input)`
  width: 80%;
  font-size: 16px;
  padding: 3px 5px;
  border: 1px solid black;
  border-radius: 2px;
  outline: none;

  ${customMedia.lessThan("mobile")`
    font-size: 10px;
    width: 100%;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 12px;
    width: 100%;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    font-size: 12px;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 14px;
  `}
`;

const ConfirmBtn = styled(Button)`
  & {
    font-size: 16px;
    color: #ffffff;
    background-color: #ff6701;
    padding: 6px 10px;
    border-radius: 5px;
    margin-left: 15px;

    ${customMedia.lessThan("mobile")`
      font-size: 10px;
      padding: 3px 5px;
      margin-left: 0;
      margin-right: 15px;
      position: absolute;
      left: 30%;
      bottom: 5%;
    `}

    ${customMedia.between("mobile", "largeMobile")`
      font-size: 10px;
      padding: 3px 5px;
      margin-left: 0;
      margin-right: 15px;
      position: absolute;
      left: 30%;
      bottom: 5%;
    `}

    ${customMedia.between("largeMobile", "tablet")`
      font-size: 12px;
    `}

    ${customMedia.between("tablet", "desktop")`
      font-size: 14px;
    `}
  }
`;

const CancelBtn = styled(Button)`
  & {
    font-size: 16px;
    background-color: #ffffff;
    color: #ff6701;
    padding: 6px 10px;
    border: 1px solid #ff6701;
    border-radius: 5px;
    margin-left: 15px;

    ${customMedia.lessThan("mobile")`
      font-size: 10px;
      padding: 3px 5px;
      margin-left: 0;
      position: absolute;
      right: 30%;
      bottom: 5%;
    `}

    ${customMedia.between("mobile", "largeMobile")`
      font-size: 10px;
      padding: 3px 5px;
      margin-left: 0;
      position: absolute;
      right: 30%;
      bottom: 5%;
    `}

    ${customMedia.between("largeMobile", "tablet")`
      font-size: 12px;
    `}

    ${customMedia.between("tablet", "desktop")`
      font-size: 14px;
    `}
  }
`;
