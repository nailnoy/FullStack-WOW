import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { customMedia } from "../../GlobalStyles";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import { message } from "antd";

const ClubCard = (props) => {
  console.log(props.club);
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        raised
        sx={{
          width: "md",
          margin: "0 auto",
          padding: "0.1em",
          position: "relative",
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="space-between"
          sx={{
            position: "absolute",
            left: 0,
            width: "100%",
            pt: "270px",
            px: "20px",
            m: "0 auto",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              bgcolor: "coral",
              boxShadow: 1,
              borderRadius: 2,
              p: 1,
              minWidth: 45,
              maxHeight: 35,
            }}
          >
            {props.club.tags}
          </Box>

          {props.club.clubStatus === "EXPIRED" ? (
            <Box
              sx={{
                textAlign: "center",
                bgcolor: "red",
                boxShadow: 1,
                borderRadius: 2,
                p: 1,
                minWidth: 45,
                maxHeight: 35,
              }}
            >
              마감
            </Box>
          ) : (
            ""
          )}
        </Grid>
        {props.club.imgUrl ? (
          <CardMedia
            component="img"
            sx={{
              padding: "0.5em 0.5em 0 0.5em",
              objectFit: "contain",
            }}
            height="300"
            image={props.club.imgUrl}
            alt="default"
          />
        ) : (
          <CardMedia
            component="img"
            sx={{
              padding: "0.5em 0.5em 0 0.5em",
              objectFit: "contain",
            }}
            height="300"
            image="https://velog.velcdn.com/images/zolyer/post/d8620848-232a-47c5-a6db-2283b9fe4d28/image.jpeg"
            alt="default"
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            fontFamily="Jua"
            fontWeight="600"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.club.title}
          </Typography>
          <Typography
            fontFamily="Jua"
            height="20px"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.club.contents}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate(`../detail/${props.club.id}`)}
          >
            <Typography fontFamily="Jua">자세히</Typography>
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`../post/filter?clubid=${props.club.id}`)}
            className="infoBtn"
            color="success"
            size="small"
          >
            <Typography fontFamily="Jua">후기보기</Typography>
          </Button>
          <LikeContainer>
            <LikeNum>{props.club.likes}</LikeNum>
            <IconButton
              aria-label="add to favorites"
              onClick={(e) => {
                e.stopPropagation();
                if (props.userId) {
                  props.handleLikedClubs(props.club.id);
                } else {
                  message.warning("로그인이 필요한 기능입니다.");
                }
              }}
            >
              {props.likedClubs.includes(props.club.id) ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteIcon />
              )}
            </IconButton>
          </LikeContainer>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ClubCard;

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
  position: sticky;
  left: 80%;
`;