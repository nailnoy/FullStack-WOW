import React from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

import styled from "styled-components";
// import { customMedia } from "../../GlobalStyles";

import SmallTag from "../common/SmallTag";
import ExpiredTag from "../common/ExpiredTag";
// import WaitingTag from "../common/WaitingTag";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const JoinedClubCard = () => {

  return (
    <Container sx={{ py: 0 }} maxWidth="md">
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
              <TagContainer>
                <ClubTag>온라인</ClubTag>
              </TagContainer>
              <>
                  <ClubExpiredTag>마감</ClubExpiredTag>
                </>
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

export default JoinedClubCard;


const TagContainer = styled.div`
	display: flex;
	gap: 5px;

	position: relative;
  padding: 10px;
  bottom: 60px;
  
`;

const ClubTag = styled(SmallTag)`
	& {
		font-size: 14px;
    padding: 7px 13px;
	}
`;

// const LikeNum = styled.span`
//   ${customMedia.lessThan("mobile")`
//     font-size: 14px;
//   `}

//   ${customMedia.between("mobile", "largeMobile")`
//     font-size: 16px;
//   `}

// 	${customMedia.between("largeMobile", "tablet")`
//     font-size: 12px;
//   `}

// 	${customMedia.between("tablet", "desktop")`
//     font-size: 12px;
//   `}`;

const ClubExpiredTag = styled(ExpiredTag)`
	& {
		font-size: 14px;
		padding: 5px;
		position: relative;
    left: 75%;
    bottom: 105px;
	}
`;

// const ClubWaitingTag = styled(WaitingTag)`
// 	& {
// 		font-size: 14px;
// 		padding: 5px;
// 		position: relative;
//     left: 75%;
//     bottom: 105px;
// 	}
// `;

