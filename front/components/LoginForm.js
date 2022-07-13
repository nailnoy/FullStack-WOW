import { useState, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link'; 
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import useinput from "../hooks/useinput";
import { loginAction } from '../reducers/user';

/* import { useMemo } from 'react';
   const style = useMemo(() => ({marginTop: 10}), []);
   <div style={ style }>
   의 방식으로도 style을 적용시키고 불필요한 리렌더링을 막을 수 있다.
*/

const ButtonWrapper = styled.div`
    margin-top: 15px;
`;

const FormWrapper = styled(Form)`
    padding: 10px; 
`;

const LoginForm = () => {
    const dispatch = useDispatch();
    const [id, onChangeId] = useinput('');
    const [password, onChangePassword] = useinput('');

    //onFinish는 event.preventDefault()대신하며 submit 기본동작에 새로고침을 멈추게 한다.
    const onSubmitForm = useCallback(() => {
        console.log(id, password);
        dispatch(loginAction(id, password));
    }, [id, password]);

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={id} onChange={onChangeId} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input 
                name="user-password" 
                type="password"
                value={password} 
                onChange={onChangePassword} 
                required />
            </div>
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    );
};

export default LoginForm ;