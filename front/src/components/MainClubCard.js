import React from "react";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const cards = [1, 2, 3];

const MainClubCard = () => {
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Typography gutterBottom variant="h6" component="h2" fontFamily="Jua" fontSize="2rem">
                최근 등록된 모임
            </Typography>
            <Grid container spacing={4}>
                {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    pt: '10%',
                                }}
                                image="https://velog.velcdn.com/images/zolyer/post/d8620848-232a-47c5-a6db-2283b9fe4d28/image.jpeg"
                                alt="default"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2" fontFamily="Jua" fontWeight="600">
                                    모집 제목
                                </Typography>
                                <Typography fontFamily="Jua">
                                    간략한 소개문입니다.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="outlined">자세히</Button>
                                <Button size="small" variant="outlined" color="success">참가 신청</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Typography gutterBottom variant="h6" component="h2" fontFamily="Jua" fontSize="2rem" marginTop="100px">
                최근 게시글
            </Typography>
            <Grid container spacing={4}>
                {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    pt: '10%',
                                }}
                                image="https://velog.velcdn.com/images/zolyer/post/d8620848-232a-47c5-a6db-2283b9fe4d28/image.jpeg"
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2" fontFamily="Jua" fontWeight="600">
                                    게시글 제목
                                </Typography>
                                <Typography fontFamily="Jua">
                                    요약 내용 입니다.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="outlined">자세히</Button>
                                <Button size="small" variant="outlined" color="success">참가 신청</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
};

export default MainClubCard;