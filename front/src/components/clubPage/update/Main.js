import React, { useRef, createRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Spin from "../../common/Spin";

import { customMedia } from "../../../GlobalStyles";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import MapContainer from "../../common/MapContainer";



import {
	message,
	Input,
	Col,
	Form,
	InputNumber,
	Row,
	DatePicker,
	Skeleton,
	Button,
} from "antd";


import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

// code-syntax-highlight
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

// color-syntax
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';


const Main = () => {
	const navigate = useNavigate();

	const [editForm] = Form.useForm();
	const [inputText, setInputText] = useState("");
	const [streetAddress, setStreetAddress] = useState("");
	const [detailAddress, setDetailAddress] = useState("");
	const [imgFile, setImgFile] = useState("");
	const [preview, setPreview] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [loading, setLoading] = useState(true);
	const [club, setClub] = useState("");
	const userId = localStorage.getItem("user_id");
	const clubId = useParams().id;
	const fullAddress = streetAddress + " " + detailAddress;
	

	const editorRef = createRef();

	const ref = useRef();

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const res = await axios.get(`/clubs/${clubId}`);
	
			setClub(res.data);

			setLoading(false);
		  } catch (err) {
			console.log(err);
		  }
		};
		fetchData();
	  }, []);

	const onChange = (e) => {
		setInputText(e.target.value);
	};

	const getStreetAddress = () => {
		setStreetAddress(inputText);
		setInputText("");
	};

	const getDetailAddress = () => {
		setDetailAddress(inputText);
		setInputText("");
	};

	const getFullAdress = (e) => {
		getStreetAddress();
		getDetailAddress();
	};

	const handleImgChange = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();

		reader.onloadend = () => {
			setImgFile(file);
			setPreview(reader.result);
		};
		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const handleImgDelete = () => {
		ref.current.value = "";
		setPreview();
		setImgFile();
	};

	const sendData = async (values) => {
		setStartDate(values.date[0]._d.toISOString().substring(0, 10));
		setEndDate(values.date[1]._d.toISOString().substring(0, 10));
		const formData = new FormData();

		if (!values.minPersonnel || !values.maxPersonnel) {
			message.error("참여인원을 입력해주세요.");
			return;
		}

		if (values.title.length > 10) {
			message.warning("이름은 10자까지 입력 가능합니다.");
			return;
		}

		if (values.contents.length > 40) {
			message.warning("한 줄 소개는 40자까지 입력 가능합니다.");
			return;
		}

		formData.append("userId", userId);
		formData.append("title", values.title);
		formData.append("contents", values.contents);
		formData.append("startDate", startDate);
		formData.append("endDate", endDate);
		formData.append("minPersonnel", values.minPersonnel);
		formData.append("maxPersonnel", values.maxPersonnel);
		formData.append("tags", values.tag);
		formData.append("description", editorRef.current.getInstance().getMarkdown());
		formData.append(
			"addressStreet",
			values.addressStreet === "없음" ? "" : values.addressStreet
		);
		formData.append(
			"addressDetail",
			values.addressDetail === "없음" ? "" : values.addressDetail
		);

		formData.append("img", imgFile);
		console.log(formData);

		try {
			const res = await axios.put(`/clubs/users/${userId}`, formData);

			if (res.status === 200) {
				message.success("운동모임이 성공적으로 수정되었습니다!");
				localStorage.removeItem("club");
				navigate(0);
			}
			else {
				message.error("운동모임 수정에 실패했습니다.")
			};
		} catch (err) {
			if (
				err.response.data.message ===
				"Maximum upload size exceeded; nested exception is java.lang.IllegalStateException: org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException: The field img exceeds its maximum permitted size of 1048576 bytes."
			)
				message.warning(
					"사진 용량이 초과되었습니다! 사진을 다시 등록해주세요."
				);
		}
	};

	const onFinish = async (values) => {
		try {
			sendData(values);
		} catch (err) {
			console.log(err);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed: ", errorInfo);
	};

	const disabledDate = (current) => current && current < moment().endOf("day");

	return (
		<>
		{loading ? (
			<SpinContainer>
			  <Spin />
			</SpinContainer>
		  ) : (
		<Wrapper>
			<StyledForm
				form={editForm}
				name="editForm"
				layout="vertical"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Row gutter={32}>
					<Col span={16}>
						<Form.Item
							initialValue={club.title}
							label="이름"
							name="title"
							rules={[{ required: true, message: "모임 이름을 입력하세요." }]}
						>
							<StyledInput placeholder="이름" />
						</Form.Item>
						<Form.Item
							initialValue={club.contents}
							label="한 줄 소개"
							name="contents"
							rules={[
								{ required: true, message: "모임의 한 줄 소개를 입력하세요." },
							]}
						>
							<StyledInput placeholder="한 줄 소개" />
						</Form.Item>
						<Form.Item
							label="참여 인원"
							rules={[
								{
									required: true,
									message: "모임의 참여 인원을 입력하세요.",
								},
							]}
						>
							<Row>
								<PersonnelRow>
									<Form.Item
										initialValue={club.minPersonnel}
										name="minPersonnel"
									>
										<StyledInputNumber min={2} placeholder={2} />
									</Form.Item>
									<StyledSpan> 인 ~ </StyledSpan>
								</PersonnelRow>
								<PersonnelRow>
									<Form.Item
										initialValue={club.maxPersonnel}
										name="maxPersonnel"
									>
										<StyledInputNumber min={2} placeholder={2} />
									</Form.Item>
									<StyledSpan> 인 </StyledSpan>
								</PersonnelRow>
							</Row>
						</Form.Item>
						<Form.Item
							initialValue={[
								moment(club.startDate),
								moment(club.endDate),
							]}
							label="진행 기간"
							name="date"
							rules={[
								{
									type: "array",
									required: "true",
									message: "모임의 진행 기간을 입력하세요.",
								},
							]}
						>
							<StyledRangePicker disabledDate={disabledDate} />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label="사진"
							name="img"
							rules={[
								{ required: false, message: "모임의 사진을 업로드하세요." },
							]}
							style={{ textAlign: "center" }}
						>
							<Row gutter={[0, 24]} justify="center">
								{!preview ? (
									<>
										<SkeletonImg />
									</>
								) : (
									<>
										<PreviewImage
											src={preview}
											alt="Preview image"
										></PreviewImage>
									</>
								)}
								<FileInput>
									<input
										type="file"
										accept="image/*"
										onChange={handleImgChange}
										ref={ref}
									/>
								</FileInput>
								<Button>
									<DeleteIcon onClick={handleImgDelete} alt="Trash icon" />
								</Button>
							</Row>
						</Form.Item>
					</Col>
				</Row>
				<Col span={16}>
					<Form.Item
						initialValue={club.tags}
						label="태그"
						name="tag"
						rules={[
							{ required: true, message: "모임의 태그를 추가해주세요." },
						]}
					>
						<StyledInput placeholder="태그 추가" />
					</Form.Item>
				</Col>
				<Row>
					<Col span={16}>
						<Form.Item label="위치">
							<Form.Item
								name="addressStreet"
								initialValue={
									club.addressStreet === "undefined"
										? ""
										: club.addressStreet
								}
							>
								<StyledInput
									placeholder="도로명 주소"
									onChange={onChange}
									value={inputText}
								/>
							</Form.Item>
							<Form.Item
								name="addressDetail"
								initialValue={
									club.addressDetail === "undefined"
										? ""
										: club.addressDetail
								}
							>
								<StyledInput placeholder="상세 주소" />
							</Form.Item>
						</Form.Item>
						<FilledBtn type="button" onClick={getFullAdress}>
							주소 검색
						</FilledBtn>
						<MapWrapper>
							<MapContainer searchSpot={fullAddress} />
						</MapWrapper>
					</Col>
				</Row>
				<Row>
					<Title>상세설명</Title>
					<Editor
						previewStyle="vertical"
						height="79vh"
						initialEditType="markdown"
						hideModeSwitch="true"
						initialValue={club.description}
						ref={editorRef}
						plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
					/>
				</Row>

				<ButtonRow>
					<FilledBtn type="primary" htmlType="summit" >수정</FilledBtn>
				</ButtonRow>

			</StyledForm>
		</Wrapper>
		)}
		</>
	)
}
export default Main;

const { RangePicker } = DatePicker;

const Wrapper = styled.section`
	width: 1200px;
	padding: 40px 90px;
	margin: 0 auto;
	border: 1.5px solid #c4c4c4;
	border-radius: 5px;
	margin-top: 5%;

	${customMedia.lessThan("mobile")`
    width: 295px;
    padding: 3px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    width: 363px;
    padding: 5px;
  `}

	${customMedia.between("largeMobile", "tablet")`
    width: 610px;
    padding: 10px 20px;
  `}

	${customMedia.between("tablet", "desktop")`
    width: 880px;
    padding: 20px 40px;
  `}
`;

const StyledForm = styled(Form)`

	.ant-form-item-label > label {
		font-size: 18px;
    font-weight: bold;
    
    ${customMedia.lessThan("mobile")`
      font-size: 10px;
    `}

    ${customMedia.between("mobile", "largeMobile")`
    font-size: 10px;
    `}

    ${customMedia.between("largeMobile", "tablet")`
      font-size: 14px;
    `}

    ${customMedia.between("tablet", "desktop")`
      font-size: 16px;
    `}
	}

	.ant-form-item {
    margin-bottom: 14px;
	}

	.ant-input:focus,
	.ant-input-focused,
	.ant-input:hover,
	.ant-input-number:hover,
	.ant-picker:hover,
	.ant-picker-focused {
		border-color: #f98404;
		box-shadow: none;
	}
`;

const StyledInput = styled(Input)`
	font-size: 16px;
	height: 48px;
	background-color: #f6f6f6;
	border: 1px solid #94989b;
  border-radius: 5px;
  
  ${customMedia.lessThan("mobile")`
    font-size: 10px;
    height: 28px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 10px;
    height: 28px;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    font-size: 12px;
    height: 32px;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 14px;
    height: 40px;
  `}
`;

const StyledInputNumber = styled(InputNumber)`
	font-weight: bold;
	font-size: 16px;
	width: 80px;
	height: 40px;
	background-color: #f6f6f6;
	border: 1px solid #94989b;
	border-radius: 5px;

	.ant-input-number-input-wrap,
	.ant-input-number-input {
		height: 100%;
	}

	${customMedia.lessThan("mobile")`
    font-size: 10px;
    width: 60px;
    height: 28px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 10px;
    width: 60px;
    height: 28px;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    font-size: 12px;
    width: 50px;
    height: 25px;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 14px;
    width: 60px;
    height: 30px;
  `}
`;

const PersonnelRow = styled.div`
	display: flex;
	gap: 1px;
`;

const StyledSpan = styled.span`
  align-self: center;
  margin: 0 5px;

  ${customMedia.lessThan("mobile")`
    font-size: 10px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 10px;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    font-size: 12px;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 14px;
  `}
`;

const StyledRangePicker = styled(RangePicker)`
  height: 48px;
  background-color: #f6f6f6;
  border: 1px solid #94989b;
  border-radius: 5px;

  ${customMedia.lessThan("mobile")`
    height: 28px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    height: 28px;
  `}
  
  ${customMedia.between("largeMobile", "tablet")`
    height: 32px;
  `}

  ${customMedia.between("tablet", "desktop")`
    height: 40px;
  `}
    
  .ant-picker-input > input {
    font-size: 16px;
    text-align: center;
    
    ${customMedia.lessThan("mobile")`
      font-size: 10px;
    `}

    ${customMedia.between("mobile", "largeMobile")`
      font-size: 10px;
    `}
    
    ${customMedia.between("largeMobile", "tablet")`
      font-size: 12px;
    `}
    
    ${customMedia.between("tablet", "desktop")`
      font-size: 14px;
    `}
  }
    
  .ant-picker-active-bar {
    background: #1890ff;
  }
`;

const FileInput = styled.div`
  background-color: #f6f6f6;
  border: 1px solid #94989b;
  border-radius: 5px;
  padding: 10px;
  width: 250px;
  margin-left: 5%;
  
  ${customMedia.lessThan("mobile")`
    font-size: 10px;
    padding: 0;
    width: 130px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 10px;
    padding: 0;
    width: 130px;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    font-size: 12px;
    padding: 3px;
    width: 170px;
  `}
  
  ${customMedia.between("tablet", "desktop")`
    font-size: 14px;
    padding: 5px;
  `}
`;

const SpinContainer = styled.div`
  width: 100%;
  height: 80vh;

  display: flex;
  justify-content: center;
  align-items: center;

  ${customMedia.lessThan("mobile")`
    height: 40vh;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    height: 40vh;
  `}

	${customMedia.between("largeMobile", "tablet")`
    height: 40vh;
  `}
`;

const Title = styled.div`
	font-weight: bold;
	font-size: 20px;
  margin-bottom: 7px; 
  
  ${customMedia.lessThan("mobile")`
    font-size: 10px;
  `} 

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 10px;
  `}
  
  ${customMedia.between("largeMobile", "tablet")`
    font-size: 14px;
  `} 
  
  ${customMedia.between("tablet", "desktop")`
    font-size: 16px;
  `};
`;

const PreviewImage = styled.img`
	width: 260px;
	height: 260px;
	border: none;
	border-radius: 50%;

	${customMedia.lessThan("mobile")`
    width: 85px;
    height: 85px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    width: 100px;
    height: 100px;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    width: 120px;
    height: 120px;
  `}

  ${customMedia.between("tablet", "desktop")`
    width: 180px;
    height: 180px;
  `}
`;

const ButtonRow = styled.div`
	display: flex;
	justify-content: center;
	margin: 40px 0;
`;

const MapWrapper = styled.div`
	width: 1000px;
	height: 250px;
  margin-top: 40px;
  
	${customMedia.lessThan("mobile")`
    width: 282px;
    height: 200px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    width: 350px;
    height: 200px;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    width: 567px;
  `}

  ${customMedia.between("tablet", "desktop")`
    width: 777px;
  `}
`;

const FilledBtn = styled(Button)`
	& {
		color: #ffffff;
		background-color: #1890ff;
		border: none;
		border-radius: 6px;
    outline: none;
    
    ${customMedia.lessThan("mobile")`
      font-size: 10px;
    `}

    ${customMedia.between("mobile", "largeMobile")`
      font-size: 10px;
    `}

    ${customMedia.between("largeMobile", "tablet")`
      font-size: 12px;
    `}

    ${customMedia.between("tablet", "desktop")`
      font-size: 16px;
    `}
	}
`;

const SkeletonImg = styled(Skeleton.Image)`
	.ant-skeleton-image {
		width: 260px;
		height: 260px;
		border-radius: 50%;

    ${customMedia.lessThan("mobile")`
      width: 85px;
      height: 85px;
    `}

    ${customMedia.between("mobile", "largeMobile")`
      width: 100px;
      height: 100px;
    `}

    ${customMedia.between("largeMobile", "tablet")`
      width: 120px;
      height: 120px;
    `}

    ${customMedia.between("tablet", "desktop")`
      width: 180px;
      height: 180px;
    `}
	}
`;


