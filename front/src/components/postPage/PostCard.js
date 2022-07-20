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
import Face from "@mui/icons-material/Face";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const PostCard = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
                      p: 0.5,
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
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
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
              <Typography fontSize="sm">
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
    

  );
};

export default PostCard;

