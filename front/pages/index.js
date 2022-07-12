import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const cards = [1, 2, 3];

const theme = createTheme();

const Home = () => {
	return (
		<ThemeProvider theme={theme}>
		<CssBaseline />
		<AppBar
			position="static"
			elevation={0}
			sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
		  <Toolbar sx={{ flexWrap: 'wrap' }}>
			<Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
				<Link
					variant="button"
					color="inherit"
					href="/"
					underline="none"
					fontFamily="Jua"
					fontSize="2.5rem"
					fontWeight="900"
					sx={{ my: 1, mx: 1.5 }}
				>
					WOW
				</Link>
			</Typography>
			<nav>
				<Link
					variant="button"
					color="inherit"
					href="/club"
					underline="none"
					fontFamily="Jua"
					fontSize="1.5rem"
					sx={{ my: 1, mx: 1.5 }}
				>
					모임목록
				</Link>
				<Link
					variant="button"
					color="inherit"
					href="/post"
					underline="none"
					fontFamily="Jua"
					fontSize="1.5rem"
					sx={{ my: 1, mx: 1.5 }}
				>
					게시판
				</Link>
				<Link
					variant="button"
					color="inherit"
					href="/login"
					underline="none"
					fontFamily="Jua"
					fontSize="1.5rem"
					sx={{ my: 1, mx: 1.5 }}
				>
					로그인
				</Link>
				<Link
					variant="button"
					color="inherit"
					href="/myPage"
					underline="none"
					fontFamily="Jua"
					fontSize="1.5rem"
					sx={{ my: 1, mx: 1.5 }}
				>
					마이페이지
				</Link>
			</nav>
		  </Toolbar>
		</AppBar>

		<main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
			  fontFamily="Jua"
			  fontWeight="900"
              gutterBottom
            >
              Work Out With
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" fontFamily="Jua" paragraph>
              운동... 같이 하실래요..?
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">모임 만들기</Button>
              <Button variant="outlined">모임 검색하기</Button>
            </Stack>
          </Container>
        </Box>
		
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
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
                    image="/img/clubimage.jpeg"
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
                    image="img/clubimage.jpeg"
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
						<Button size="small"variant="outlined">자세히</Button>
						<Button size="small" variant="outlined" color="success">참가 신청</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
	
	);
};


function Copyright() {
	return (
	  <Typography variant="body2" color="text.secondary" align="center">
		{'Copyright © '}
		<Link color="inherit" href="https://github.com/nailnoy/FullStack-WOW">
		  TEAM WOW
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	  </Typography>
	);
  };


export default Home;

