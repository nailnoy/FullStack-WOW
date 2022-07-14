import React from "react";

import { Tabs, Row, Divider } from "antd";
import styled from "styled-components";
import { customMedia } from "../../GlobalStyles";

import LikedClubCard from "./LikedClubCard";
import JoinedClubCard from "./JoinedClubCard";
import Member from "./Member";
import PendingMember from "./PendingMember";
import Pagination from "../common/Pagination";
import Button from "../common/Button";
// import NotFound from "../common/NotFound";
import Spin from "../common/Spin";

const Main = () => {
	return (
		<Wrapper>
			<SpinContainer>
					<Spin />
			</SpinContainer>
				<>
					<StyledTabs defaultActiveKey="1">

						<TabPane tab="좋아요한 운동모임" key="1">
								<TabContainer>
									<CardRow>
											<LikedClubCard/>
									</CardRow>
									<PaginationRow>
										<Pagination/>
									</PaginationRow>
								</TabContainer>
						</TabPane>
						<TabPane tab="참여중인 운동모임" key="2">
								<TabContainer>
									<CardRow>
											<JoinedClubCard/>
									</CardRow>
									<PaginationRow>
										<Pagination/>
									</PaginationRow>
								</TabContainer>

						</TabPane>
						<TabPane tab="운동모임 관리" key="3">
								<TabContainer gutter={[0, 100]}>
									<Box>
										<MidTitle>참여자 관리</MidTitle>
										<Text>승인 대기자</Text>
											<>
												<Row gutter={[0, 16]}>
														<Row key="d">
															<PendingMember/>
														</Row>
												</Row>
												<PaginationRow>
													<Pagination/>
												</PaginationRow>
											</>
										<Divider />
										<Text>참여자 목록</Text>
											<>
												<Row gutter={[0, 16]}>
														<Row key="e">
															<Member/>
														</Row>

												</Row>
												<PaginationRow>
													<Pagination/>
												</PaginationRow>
											</>
									</Box>
									<Box>
										<MidTitle>정보 수정</MidTitle>
										<Divider />
										<DeleteBtnContainer>
											<TextBox>
												<LargeText>운동모임 삭제하기</LargeText>
												<Text>
													한 번 운동모임을 삭제하면 복구할 수 없습니다. 신중하게
													결정해주세요!
												</Text>
											</TextBox>
											<DeleteBtn>운동모임 삭제</DeleteBtn>
										</DeleteBtnContainer>
									</Box>
								</TabContainer>
						</TabPane>
					</StyledTabs>
				</>
		</Wrapper>
	);
};

export default Main;

const { TabPane } = Tabs;

const Wrapper = styled.div`
	width: 1200px;
  margin: 0 auto;
  flex: 1;

	${customMedia.lessThan("mobile")`
    width: 295px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    width: 363px;
  `}

	${customMedia.between("largeMobile", "tablet")`
    width: 610px;
  `}

	${customMedia.between("tablet", "desktop")`
    width: 880px;
  `}
`;

const TabContainer = styled(Row)`
  width: 100%;
  margin-top: 70px;
  padding-bottom: 60px;

	${customMedia.lessThan("mobile")`
    margin-top: 40px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    margin-top: 40px;
  `}

	${customMedia.between("largeMobile", "tablet")`
    margin-top: 40px;
  `}
`;

const StyledTabs = styled(Tabs)`

	.ant-tabs-tab-btn {
    font-size: 22px;
    
    ${customMedia.lessThan("mobile")`
      font-size: 14px;
    `}

    ${customMedia.between("mobile", "largeMobile")`
      font-size: 16px;
    `}

    ${customMedia.between("largeMobile", "tablet")`
      font-size: 16px;
    `}

    ${customMedia.between("tablet", "desktop")`
      font-size: 18px;
    `}
	}

	.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
		color: #1890ff;
    font-weight: bold;

    ${customMedia.lessThan("mobile")`
      font-weight: 500;
    `}

    ${customMedia.between("mobile", "largeMobile")`
      font-weight: 500;
    `}
    
    ${customMedia.between("largeMobile", "tablet")`
      font-weight: 500;
    `}
	}

	.ant-tabs-tab:hover {
		color: #1890ff;
	}

	.ant-tabs-ink-bar {
		border: 2px solid #1890ff;
		background-color: #1890ff;
	}
`;

const CardRow = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 60px;

	${customMedia.between("largeMobile", "tablet")`
    gap: 20px;
  `}

	${customMedia.between("tablet", "desktop")`
    gap: 20px;
  `}
`;

const MidTitle = styled.div`
	width: 100%;
	font-size: 20px;
	margin-bottom: 10px;

  ${customMedia.lessThan("mobile")`
    font-size: 14px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
  font-size: 14px;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    font-size: 16px;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 18px;
  `}
`;

const LargeText = styled.div`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 15px;

  ${customMedia.lessThan("mobile")`
    font-size: 12px;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 12px;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    font-size: 14px;
  `}

  ${customMedia.between("tablet", "desktop")`
    font-size: 18px;
  `}
`;

const Text = styled.div`
	font-size: 16px;
  margin-bottom: 15px;
  
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

const TextBox = styled.div`
	flex: 1;
`;

const Box = styled.div`
	width: 100%;
`;

const DeleteBtnContainer = styled.div`
	width: 100%;
	border: 1px solid #c4c4c4;
	border-radius: 5px;
	padding: 25px;
	display: flex;

	${customMedia.lessThan("mobile")`
    font-size: 10px;
    padding: 15px;
    flex-direction: column;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 10px;
    padding: 15px;
    flex-direction: column;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    font-size: 14px;
  `}
  
  ${customMedia.between("tablet", "desktop")`
    font-size: 18px;
  `}
`;

const DeleteBtn = styled(Button)`
	width: 140px;
	font-size: 18px;
	font-weight: bold;
	color: #ffffff;
	background-color: #ff0000;
	border: none;
	padding: 0 20px;
	border-radius: 6px;
	text-align: center;
	flex: 0.1;

  ${customMedia.lessThan("mobile")`
    font-size: 10px;
    padding: 5px 15px;
    align-self: center;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    font-size: 10px;
    padding: 5px 15px;
    align-self: center;
  `}

  ${customMedia.between("largeMobile", "tablet")`
    width: 80px;
    font-size: 12px;
  `}

  ${customMedia.between("tablet", "desktop")`
    width: 120px;
    font-size: 16px;
  `}
`;

// const StyledModal = styled(Modal)`
// 	display: flex;
// 	justify-content: center;

// 	.ant-modal-content {
// 		padding: 30px 55px;
// 		display: flex;
//     align-items: center;
    
//     ${customMedia.lessThan("mobile")`
//       padding: 3px 7px;
//     `}

//     ${customMedia.between("mobile", "largeMobile")`
//       padding: 5px 10px;
//     `}

//     ${customMedia.between("largeMobile", "tablet")`
//       padding: 10px 25px;
//     `}

//     ${customMedia.between("tablet", "desktop")`
//       padding: 30px 55px;
//     `}
// 	}

// 	.ant-modal-body {
//     text-align: center;
    
//     ${customMedia.lessThan("mobile")`
//       padding: 30px 55px;
//     `}

//     ${customMedia.between("mobile", "largeMobile")`
//       padding: 30px 55px;
//     `}

//     ${customMedia.between("largeMobile", "tablet")`
//       padding: 30px 55px;
//     `}

//     ${customMedia.between("tablet", "desktop")`
//       padding: 30px 55px;
//     `}
// 	}

// 	.ant-modal-footer {
// 		display: none;
// 	}
// `;

// const ModalTitle = styled.div`
// 	font-size: 22px;
// 	font-weight: bold;
// 	margin-bottom: 10px;

// 	${customMedia.lessThan("mobile")`
//     font-size: 14px;
//   `}

// 	${customMedia.between("mobile", "largeMobile")`
//     font-size: 16px;
//   `}

//   ${customMedia.between("largeMobile", "tablet")`
//     font-size: 18px;
//   `}

//   ${customMedia.between("tablet", "desktop")`
//     font-size: 20px;
//   `}
// `;

// const ButtonRow = styled(Row)`
// 	margin-top: 30px;
// 	display: flex;
// 	justify-content: center;
//   gap: 50px;
  
//   ${customMedia.lessThan("mobile")`
//     margin-top: 15px;
//   `}

// 	${customMedia.between("mobile", "largeMobile")`
//     margin-top: 15px;
//   `}

//   ${customMedia.between("largeMobile", "tablet")`
//     margin-top: 20px;
//   `}
// `;

// const FilledBtn = styled(Button)`
// 	& {
// 		color: #ffffff;
// 		background-color: #ff6701;
// 		border: none;
// 		border-radius: 6px;
// 		outline: none;
//     cursor: pointer;
    
//     ${customMedia.lessThan("mobile")`
//       font-size: 10px;
//     `}

//     ${customMedia.between("mobile", "largeMobile")`
//       font-size: 12px;
//     `}

//     ${customMedia.between("largeMobile", "tablet")`
//       font-size: 14px;
//     `}

//     ${customMedia.between("tablet", "desktop")`
//       font-size: 16px;
//     `}
// 	}
// `;

// const UnfilledBtn = styled(Button)`
// 	& {
// 		color: #ff6701;
// 		background-color: #ffffff;
// 		border: 2px solid #ff6701;
// 		border-radius: 6px;
//     cursor: pointer;
    
//     ${customMedia.lessThan("mobile")`
//       font-size: 10px;
//     `}

//     ${customMedia.between("mobile", "largeMobile")`
//       font-size: 12px;
//     `}

//     ${customMedia.between("largeMobile", "tablet")`
//       font-size: 14px;
//     `}

//     ${customMedia.between("tablet", "desktop")`
//       font-size: 16px;
//     `}
// 	}
// `;

const PaginationRow = styled(Row)`
  width: 100%;
	margin: 30px auto;
	justify-content: center;

	${customMedia.lessThan("mobile")`
    margin: 20px auto;
  `}

  ${customMedia.between("mobile", "largeMobile")`
    margin: 20px auto;
  `}

	${customMedia.between("largeMobile", "tablet")`
    margin: 20px auto;
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

// const MemberNotFound = styled(NotFound)`
// 	& {
// 		height: 100px;
// 		font-size: 16px;

//     ${customMedia.lessThan("mobile")`
//       font-size: 10px;
//     `}

//     ${customMedia.between("mobile", "largeMobile")`
//       font-size: 10px;
//     `}

//     ${customMedia.between("largeMobile", "tablet")`
//       font-size: 12px;
//     `}

//     ${customMedia.between("tablet", "desktop")`
//       font-size: 14px;
//     `}
// 	}
// `;
