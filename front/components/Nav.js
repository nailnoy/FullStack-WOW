import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const Nav = () => {
    return (
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
                        href="/mypage"
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

)
};



export default Nav;