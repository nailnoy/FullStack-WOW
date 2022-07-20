import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Modal,
  Input,
  Col,
  Form,
  Row,
  Skeleton,
  Button,
  Select,
} from "antd";

import PostCard from "./PostCard";
import { Pagination } from "@mui/material";
import SearchBar from "../clubPage/SearchBar";

import styled from "styled-components";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { customMedia } from "../../GlobalStyles";

function PostMain() {
  const ref = useRef();

  const [clubs, setClubs] = useState();
  const [editForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imgFile, setImgFile] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      const res = await axios.get("/clubs/post");
      setClubs(res.data.clubList);
      console.log(res.data.clubList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const showModal = () => {
    setIsModalVisible(true);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
  };


  const onFinish = async (values) => {
    try {
      // sendData(values);
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };

  return (
    <>
      <main>
        <Container sx={{ pt: 8 }} maxWidth="md">
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            fontFamily="Jua"
            fontSize="2rem"
            textAlign="center"
          >
            게시글 검색
          </Typography>
        </Container>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Container sx={{ py: 1 }} maxWidth="xs">
            <SearchBar />
          </Container>

          <Container sx={{ py: 1 }} maxWidth="xs">
            <Button
              size="large"
              onClick="Box"
              variant="outlined"
            >
              게시글 작성
            </Button>
          </Container>
        </div>
        <PostCard />
        <Pagination page={3} />

        <FabContainer>
          <Fab color="primary" aria-label="add" onClick={showModal} >
            <AddIcon />
          </Fab>
        </FabContainer>

        <StyledModal
          visible={isModalVisible}
          onCancel={() => handleCancel()}
        >
          <Container sx={{ p: 8 }} maxWidth="md" className="containerWrap">
            <StyledForm
              form={editForm}
              name="editForm"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Row gutter={32}>
                <Col span={24}>
                  <Form.Item
                    initialValue={""}
                    label="모임"
                    name="post"
                    rules={[{ required: true, message: "모임을 선택해주세요." }]}
                  >
                    <Select
                      style={{
                        width: 120,
                      }}
                      onChange={handleChange}
                    >
                      {clubs
						            	? clubs.map((club) => (
                      <Option value={club.id}>{club.title}</Option>
                      
                      ))
                      : ""}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="사진"
                    name="img"
                    rules={[
                      { required: false, message: "모임의 사진을 업로드하세요." },
                    ]}
                    style={{ textAlign: "center" }}
                  >

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

                  </Form.Item>

                </Col>
                <Col span={24}>
                  <Form.Item
                    initialValue={""}
                    label="내용"
                    name="contents"
                    rules={[{ required: true, message: "후기를 입력하세요." }]}
                  >
                    <StyledTextArea
                      rows={10}
                      placeholder={
                        "후기를 남겨주세요."
                      }
                    />

                  </Form.Item>
                </Col>
              </Row>

              <ButtonRow>
                <FilledBtn type="primary" htmlType="summit" >작성</FilledBtn>
              </ButtonRow>

            </StyledForm>
          </Container>

        </StyledModal>


      </main>
    </>
  );
}

export default PostMain;
const { TextArea } = Input;
const { Option } = Select;

const FabContainer = styled.div`
  position: fixed;
  bottom: 2%;
  right: 2%;
`;

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  

  .ant-modal-content {
    padding: 10px 10px;
    display: flex;
    align-items: center;


  .ant-modal-body {
    text-align: center;
  }

  .ant-modal-footer {
    display: none;
  }
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

const ButtonRow = styled.div`
	display: flex;
	justify-content: center;
	margin: 40px 0;
`;


const PreviewImage = styled.img`
	width: 260px;
	height: 260px;
	border: none;
	border-radius: 10%;

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



const SkeletonImg = styled(Skeleton.Image)`
	.ant-skeleton-image {
		width: 260px;
		height: 260px;
		border-radius: 10%;

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

const StyledTextArea = styled(TextArea)`
	font-size: 16px;
	width: 600px;
	background-color: #f6f6f6;
	border: 1px solid #94989b;
	border-radius: 5px;
  
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
