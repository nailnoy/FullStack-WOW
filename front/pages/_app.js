//_app.jss는 pages폴더의 공통 컴포넌트이다
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css'
import './Font.css';

import wrapper from '../store/configureStore';

const App = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <title>WOW</title>
            </Head>
            <Component />
        </>
        
    );
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(App);