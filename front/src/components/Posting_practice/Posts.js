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

const Posts = () => {
    return(
        <Container sx={{ py: 8 }} maxWidth="md">
            <Typography gutterBottom variant="h6" component="h2" fontFamily="Jua" fontSize="2rem">
                게시글 목록
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
                                image="http://drive.google.com/uc?export=view&id=1z3CRSIYjm0c9IlEgk5LSMG2XbkvdqWdA"
                                alt="default"
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
                                <Button size="small" variant="outlined" color="success">좋아요</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Posts;