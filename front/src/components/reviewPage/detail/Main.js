import React from "react";

import "moment/locale/ko";
import CommentView from "./CommentView";

import { Grid } from "@mui/material";

import {
    Avatar,
    Box,
    Typography,
} from "@mui/joy";

import AspectRatio from "@mui/joy/AspectRatio";

import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";

const Main = (props) => {

    return (
        <Dialog
            open={props.isModalVisible}
            onClose={() => props.handleCancel()}
            scroll="body"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth="md"
            fullWidth={true}
        >
            <DialogTitle id="scroll-dialog-title">
                <Grid container spacing={0} justifyContent="space-between">
                    <Box display="grid" gridAutoFlow="column" sx={{ mt: 1 }}>
                        <Avatar src={props.review.userImgUrl} sx={{ width: 24, height: 24, mr: 1, mt: 0.5 }} />
                        {props.review.userName}님의 후기
                    </Box>
                    <Box sx={{ mt: 0.5 }}>
                        {(() => {
                            if (!props.reportHistory.includes(props.review.id)) {
                                return (
                                    <Button color="error" onClick={props.handleReportUser}>
                                        <Typography fontFamily="Jua">신고하기</Typography>
                                    </Button>
                                );
                            } else return;
                        })()}
                        <Button color="primary" onClick={props.handleCancel}>
                            <Typography fontFamily="Jua">돌아가기</Typography>
                        </Button>
                    </Box>
                </Grid>
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText id="scroll-dialog-description" tabIndex={-1} fontFamily="Jua">
                    <AspectRatio objectFit="contain" sx={{ p: 1, pb: 2 }}>
                        <img src={props.review.imgUrl} />
                    </AspectRatio>
                    {props.review.contents}
                </DialogContentText>
            </DialogContent>
            <DialogContent >
                <CommentView reviewId={props.review.id} />
            </DialogContent>
        </Dialog>

    );
};

export default Main;
