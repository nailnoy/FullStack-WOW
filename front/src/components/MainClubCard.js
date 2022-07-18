import React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const cards = [1, 2, 3];

const MainClubCard = () => {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Typography
        gutterBottom
        variant="h6"
        component="h2"
        fontFamily="Jua"
        fontSize="2rem"
      >
        최근 등록된 모임
      </Typography>
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
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
                  태그
                </Box>
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
              </Grid>
              <CardMedia
                component="img"
                sx={{
                  padding: "0.5em 0.5em 0 0.5em",
                  objectFit: "contain",
                }}
                height="300"
                image="https://velog.velcdn.com/images/zolyer/post/d8620848-232a-47c5-a6db-2283b9fe4d28/image.jpeg"
                // image="https://p4.wallpaperbetter.com/wallpaper/41/681/303/pc-hd-1080p-nature-1920x1080-wallpaper-preview.jpg"
                alt="default"
              />
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
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  모집 제목
                </Typography>
                <Typography
                  fontFamily="Jua"
                  height="70px"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  간략한 소개문입니다.간략한 소개문입니다.간략한 소개문입니다.간략한 소개문입니다.간략한 소개문입니다.간략한 소개문입니다.간략한 소개문입니다.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="outlined">
                  자세히
                </Button>
                <Button size="small" variant="outlined" color="success">
                  참가 신청
                </Button>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography
        gutterBottom
        variant="h6"
        component="h2"
        fontFamily="Jua"
        fontSize="2rem"
        marginTop="100px"
      >
        최근 게시글
      </Typography>
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
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
                  태그
                </Box>
              </Grid>
              <CardMedia
                component="img"
                sx={{
                  padding: "0.5em 0.5em 0 0.5em",
                  objectFit: "contain",
                }}
                height="300"
                image="https://velog.velcdn.com/images/zolyer/post/d8620848-232a-47c5-a6db-2283b9fe4d28/image.jpeg"
                // image="https://p4.wallpaperbetter.com/wallpaper/41/681/303/pc-hd-1080p-nature-1920x1080-wallpaper-preview.jpg"
                alt="default"
              />
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
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  게시글 제목
                </Typography>
                <Typography
                  fontFamily="Jua"
                  height="70px"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  간략한 소개문입니다.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="outlined">
                  자세히
                </Button>
                <Button size="small" variant="outlined" color="error">
                  신고
                </Button>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MainClubCard;