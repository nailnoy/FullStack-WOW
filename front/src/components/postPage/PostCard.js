import React from "react";
import Container from "@mui/material/Container";
// import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
// import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// @mui/joy 설치
// cmd 관리자권한 front 디렉토리에서 명령어
// yarn add @mui/joy @emotion/react @emotion/styled

const cards = [1, 2, 3, 4, 5];

const PostCard = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Typography
        gutterBottom
        variant="h6"
        component="h2"
        fontFamily="Jua"
        fontSize="2rem"
      >
        등록된 게시글 목록
      </Typography>
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
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
                    src="/static/logo.png"
                    sx={{
                      p: 0.5,
                      border: "2px solid",
                      borderColor: "background.body",
                    }}
                  />
                </Box>
                <Typography fontWeight="lg">홍길동</Typography>
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
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </Box>
              <CardOverflow>
                <AspectRatio objectFit="contain">
                  <img
                    src="http://drive.google.com/uc?export=view&id=1z3CRSIYjm0c9IlEgk5LSMG2XbkvdqWdA"
                    alt=""
                  />
                </AspectRatio>
              </CardOverflow>
              <Box
                sx={{ display: "flex", alignItems: "center", mx: -1, my: 1 }}
              >
                <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
                  <IconButton variant="plain" color="neutral" size="sm">
                    <FavoriteBorder />
                  </IconButton>
                  <IconButton variant="plain" color="neutral" size="sm">
                    <ModeCommentOutlined />
                  </IconButton>
                  <IconButton variant="plain" color="neutral" size="sm">
                    <SendOutlined />
                  </IconButton>
                </Box>
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
                  <IconButton variant="plain" color="neutral" size="sm">
                    <BookmarkBorderRoundedIcon />
                  </IconButton>
                </Box>
              </Box>
              <Link
                component="button"
                underline="none"
                fontSize="sm"
                fontWeight="lg"
                textColor="text.primary"
              >
                81 Likes
              </Link>
              <Typography fontSize="sm">
                <Link
                  component="button"
                  color="neutral"
                  fontWeight="lg"
                  textColor="text.primary"
                >
                  홍길동
                </Link>{" "}
                같이 운동해서 재밌었습니다.wfewefffeefefefefefefefef
              </Typography>
              <Link
                component="button"
                underline="none"
                fontSize="sm"
                startDecorator="…"
                sx={{ color: "text.tertiary" }}
              >
                더보기
              </Link>
              <Link
                component="button"
                underline="none"
                fontSize="10px"
                sx={{ color: "text.tertiary", my: 0.5 }}
              >
                2 DAYS AGO
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
                  variant="plain"
                  size="sm"
                  placeholder="Add a comment…"
                  sx={{ flexGrow: 1, mr: 1, "--Input-focusedThickness": "0px" }}
                />
                <Link
                  bgcolor="lightblue"
                  variant="outlined"
                  // disabled
                  underline="none"
                  role="button"
                  fontSize="sm"
                >
                  댓글
                </Link>
              </CardOverflow>
            </Card>
          </Grid>
        ))}
    
      </Grid>
    </Container>
  );
};

export default PostCard;

