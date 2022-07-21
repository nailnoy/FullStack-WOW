import React from "react";
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
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid,
  Menu,
  MenuItem
} from "@mui/material";

const PostCard = (props) => {
  console.log(props.review);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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
        <Box sx={{ display: "flex", alignItems: "center", pb: 1.5, gap: 1 }}>
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
          <Typography fontWeight="lg">{props.review.userName}</Typography>
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ ml: "auto" }}
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
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
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
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
              <img src={props.review.imgUrl} alt="default" />
            ) : (
              <img
                src="http://drive.google.com/uc?export=view&id=1z3CRSIYjm0c9IlEgk5LSMG2XbkvdqWdA"
                alt="default"
              />
            )}
          </AspectRatio>
        </CardOverflow>
        <Box sx={{ display: "flex", alignItems: "center", mx: -1, my: 1 }}>
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
          ></Box>
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
          autoScrollBodyContent={false}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          maxWidth="md"
          fullWidth={true}
        >
          <DialogTitle id="scroll-dialog-title">
            <Grid container spacing={0}>
              <Avatar src={props.review.userImgUrl} sx={{ width: 24, height: 24, mr: 1, mt: 0.5 }}/>
              {props.review.userName}님의 후기
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
          <DialogActions>
            <Button color="error" onClick={handleCancel}>
              신고하기
            </Button>
            <Button color="primary" onClick={handleCancel}>
              돌아가기
            </Button>
          </DialogActions>
        </Dialog>

        <Link
          component="button"
          underline="none"
          fontSize="10px"
          sx={{ color: "text.tertiary", my: 0.5 }}
        >
          2 DAYS AGO
        </Link>
        <CardOverflow sx={{ p: "var(--Card-padding)", display: "flex" }}>
          <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
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
