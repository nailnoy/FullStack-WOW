import React from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ClubCard = () => {
    return(
        <Container sx={{ py: 8 }} maxWidth="md">
            <Typography gutterBottom variant="h6" component="h2" fontFamily="Jua" fontSize="2rem">
            등록된 모임 목록
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
                            <Button size="small"variant="outlined">자세히</Button>
                            <Button size="small" variant="outlined" color="success">참가 신청</Button>
                        </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default ClubCard;