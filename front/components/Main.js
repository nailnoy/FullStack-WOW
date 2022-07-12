
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const Main = () => {
    return (
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
)
};



export default Main;