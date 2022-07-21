import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  Modal,
  Input,
  Col,
  Form,
  Row,
  Skeleton,
  Select,
  message
} from "antd";

import {
  Container,
  Typography,
  Button,
  Grid,
  Fab,
  Box
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import Spin from "../common/Spin";
import PostCard from "../common/ReviewCard";
import SearchBar from "../common/SearchBar";
import Pagination from "../common/Pagination";
import { customMedia } from "../../GlobalStyles";

function PostMain() {
  const ref = useRef();
  const navigate = useNavigate();

  const [clubs, setClubs] = useState();
  const [reviews, setReviews] = useState();
  const [editForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imgFile, setImgFile] = useState("");
  const [keyword, setKeyword] = useState("");
  const [preview, setPreview] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, [page, keyword, total, userId]);

  const fetchData = async () => {
    try {
      const clubRes = await axios.get("/clubs/review");
      setClubs(clubRes.data.clubList);

      const res = await axios.get("/reviews", {
        params: {
          keyword: keyword,
          page: page,
        },
      });

      setReviews(res.data.reviewList);
      setTotal(res.data.totalCount);

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

  const handleDeleteReview = async (id) => {
    try {
      const deleteRes = await axios.delete(`/reviews/${id}`);

      if (deleteRes.status === 200) {
        message.success("후기가 성공적으로 삭제되었습니다.");
      } else {
        message.error("후기 삭제에 실패하였습니다.");
      }
    } catch (err) {
      console.log(err);
      message.error("로그인이 필요한 기능입니다.");
    } finally {
      fetchData();
    }
  };

  const sendData = async (values) => {
    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("clubId", values.club);
    formData.append("contents", values.contents);
    formData.append("img", imgFile);

    try {
      const res = await axios.post(`/reviews`, formData);

      if (res.status === 200) {
        message.success("후기가 성공적으로 생성되었습니다!");
        navigate(0);
      }
      else {
        message.error("후기 생성에 실패했습니다.")
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

  return (
    <>
      <main>
        {loading ? (
          <SpinContainer>
            <Spin />
          </SpinContainer>
        ) : (
          <>
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
                <SearchBar keyword={keyword} setKeyword={setKeyword} />
              </Container>
              

            </div>
            <Container sx={{ py: 8 }} maxWidth="md">
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                fontFamily="Jua"
                fontSize="2rem"
              >
                등록된 게시글 목록
              </Typography>
              <Grid container spacing={4}>

                {reviews
                  ? reviews.map((review) => (
                    <PostCard
                      key={review.id}
                      userId={userId}
                      review={review}
                      clubs={clubs}
                      handleDeleteReview={handleDeleteReview}/>
                  ))
                  : ""}
              </Grid>
            </Container>
            <FabContainer>
              <Fab color="primary" aria-label="add" onClick={showModal} >
                <AddIcon />
              </Fab>
            </FabContainer>

            <StyledModal
              visible={isModalVisible}
              onCancel={() => handleCancel()}
            >
              <Container sx={{ px: 8, pt: 8, }} maxWidth="md" className="containerWrap">
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
                        name="club"
                        rules={[{ required: true, message: "모임을 선택해주세요." }]}
                      >
                        <Select
                          style={{
                            width: 250,
                          }}
                          onChange={handleChange}
                        >
                          <Option value="" selected disabled>참여한 모임을 선택해주세요</Option>
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
                        <Grid 
                        container spacing={0} 
                        justifyContent="center"
                        sx={{ py: 2, pl: 5.5, pr: 1 }}
                        >
                        <FileInput>
                          <StyledInput
                            type="file"
                            accept="image/*"
                            onChange={handleImgChange}
                            ref={ref}
                            />
                        </FileInput>
                        <Button>
                          <DeleteIcon onClick={handleImgDelete} alt="Trash icon" />
                        </Button>
                            </Grid>

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
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      type="primary"
                      htmlType="summit"
                    >
                      <Typography fontFamily="Jua">작성</Typography>
                    </Button>
                  </ButtonRow>

                </StyledForm>
              </Container>

            </StyledModal>
            <PaginationRow>
              <Pagination
                total={total}
                pageSize={9}
                current={page}
                onChange={(page) => setPage(page)}
              />
            </PaginationRow>
          </>
        )}


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
		font-size: 24px;
    font-weight: bold;
    
    ${customMedia.lessThan("mobile")`
      font-size: 14px;
    `}

    ${customMedia.between("mobile", "largeMobile")`
    font-size: 14px;
    `}

    ${customMedia.between("largeMobile", "tablet")`
      font-size: 18px;
    `}

    ${customMedia.between("tablet", "desktop")`
      font-size: 20px;
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

const SpinContainer = styled.div`
	width: 100%;
	height: 80vh;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const PaginationRow = styled(Row)`
  width: 100%;
  margin-top: 48px;
  justify-content: center;

  ${customMedia.lessThan("mobile")`
    margin-top: 24px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    margin-top: 24px;
  `}

	${customMedia.between("mobile", "tablet")`
    margin-top: 24px;
    `}
`;

const StyledInput = styled.input`
  max-width: 230px;
  overflow: hidden;
  position: relative;

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