import React from "react";
import styled from "styled-components";
import { Button, Typography } from "@mui/material";
import { customMedia } from "../../GlobalStyles";

const MyComment = ({ ...props }) => {
	return (
		<CommentBar>
			<CommentProfileIcon>
				<img src={props.myComment.userImgUrl} alt="Profile icon" />
			</CommentProfileIcon>
			<CommentText>{props.myComment.contents}</CommentText>
      <Button
            size="large"
            variant="contained"
            color="warning"
            href={`/detail/${props.myComment.clubId}`}
            sx={{ mr: 5 }}
          >
            <Typography fontFamily="Jua">보기</Typography> 
          </Button>
		</CommentBar>
	);
};

export default MyComment;

const CommentBar = styled.div`
	width: 1200px;
	height: 80px;
	border: 1.5px solid #c4c4c4;
	border-radius: 5px;

	display: flex;
	align-items: center;

	${customMedia.lessThan("mobile")`
    width: 295px;
    height: 50px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    width: 363px;
    height: 50px;
  `}

	${customMedia.between("largeMobile", "tablet")`
    width: 610px;
    height: 60px;
  `}

	${customMedia.between("tablet", "desktop")`
    width: 880px;
  `}
`;

const CommentProfileIcon = styled.div`
	width: 48px;
	height: 48px;
	margin-left: 65px;

	${customMedia.lessThan("mobile")`
    width: 24px;
    height: 24px;
    margin-left: 15px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    width: 28px;
    height: 28px;
    margin-left: 15px;
  `}

	${customMedia.between("largeMobile", "tablet")`
    width: 32px;
    height: 32px;
    margin-left: 25px;
  `}

	${customMedia.between("tablet", "desktop")`
    width: 40px;
    height: 40px;
  `}

	img {
		width: 100%;
    height: 100%;
    border-radius: 50%;
	}
`;

const CommentText = styled.div`
	font-size: 20px;
	flex: 1;
	margin-left: 25px;

	${customMedia.lessThan("mobile")`
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}

	${customMedia.between("largeMobile", "tablet")`
    font-size: 16px;
  `}

	${customMedia.between("tablet", "desktop")`
    font-size: 18px;
  `}
`;

