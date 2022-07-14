//_app.jss는 pages폴더의 공통 컴포넌트이다
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css'
import './Font.css';
import CssBaseline from '@mui/material/CssBaseline';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import wrapper from '../store/configureStore';
import GlobalStyles from '../GlobalStyles';


const theme = createTheme();

const App = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <title>WOW</title>
            </Head>
            <GlobalStyles/>
            <ThemeProvider theme={theme}>
		        <CssBaseline />
                <Component />
            </ThemeProvider>
        </>
        
    );
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(App);