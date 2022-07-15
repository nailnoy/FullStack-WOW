import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from 'gapi-script';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { customMedia } from "../GlobalStyles";

const Login = ({ ...props }) => {
	const navigate = useNavigate();

	window.gapi.load('client:auth2', () => {
		window.gapi.client.init({
			clientId: '307597584973-qp8l0s0igt38fbtbdlpm0sm4upmmjtnn.apps.googleusercontent.com',
			plugin_name: "chat"
		})})
	   

	const onSuccess = async (response) => {
		const {
			profileObj: { googleId, email, name, imageUrl },
		} = response;

		try {
			const res = await axios.get(`/users/${googleId}`);

			if (res.status === 204) {
				const user = {
					id: googleId,
					name,
					email,
					imgUrl: imageUrl,
				};

				await axios.post("/users", user);

				await axios.get(`users/${user.id}`);

				localStorage.setItem("user_id", user.id);
				localStorage.setItem("user_image", user.imgUrl);
				props.onCancel();
				navigate(0);
			} else {
				localStorage.setItem("user_id", res.data.id);
				localStorage.setItem("user_image", res.data.imgUrl);
				props.onCancel();
				navigate(0);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const onFailure = (response) => {
		console.log("Login Failed: ", response);
	};

	console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);

	return (
		<>
			<GoogleLogin
				clientId="307597584973-qp8l0s0igt38fbtbdlpm0sm4upmmjtnn.apps.googleusercontent.com"
				render={(renderProps) => (
					<GoogleLoginButton
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
					>
						구글로 로그인
					</GoogleLoginButton>
				)}
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={"single_host_origin"}
			/>
		</>
	);
};

export default Login;


const GoogleLoginButton = styled.button`
	width: 300px;
	height: 50px;
	font-size: 18px;
	font-weight: bold;
	color: #ffffff;
	background-color: #db4437;
	border: none;
	border-radius: 5px;
	outline: none;
	text-align: center;
	cursor: pointer;

	position: relative;

	${customMedia.lessThan("mobile")`
    font-size: 14px;
    width: 220px;
  `}

	${customMedia.between("mobile", "tablet")`
    font-size: 16px;
    width: 240px;
  `}
`;
