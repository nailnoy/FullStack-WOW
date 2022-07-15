import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Tabs, Row, Divider, Modal } from "antd";
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
	const navigate = useNavigate();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [myClub, setMyClub] = useState();
	const [likedClubs, setLikedClubs] = useState([]);
	const [myLikedClubs, setMyLikedClubs] = useState([]);
	const [myJoinedClubs, setMyJoinedClubs] = useState([]);
	const [myPendingMembers, setMyPendingMembers] = useState();
	const [myPendingMembersTotal, setMyPendingMembersTotal] = useState(0);
	const [myPendingMembersPage, setMyPendingMembersPage] = useState(1);
	const [myMembers, setMyMembers] = useState();
	const [myMembersTotal, setMyMembersTotal] = useState(0);
	const [myMembersPage, setMyMembersPage] = useState(1);
	const [myLikedClubsTotal, setMyLikedClubsTotal] = useState(0);
	const [myLikedClubsPage, setMyLikedClubsPage] = useState(1);
	const [myJoinedClubsTotal, setMyJoinedClubsTotal] = useState(0);
	const [myJoinedClubsPage, setMyJoinedClubsPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const userId = localStorage.getItem("user_id");

	useEffect(() => {
		fetchData();
	}, [
		myMembersPage,
		myPendingMembersPage,
		myJoinedClubsPage,
		myLikedClubsTotal,
		myLikedClubsPage,
	]);

	const fetchData = async () => {
		try {
			const likedClubsRes = await axios.get(`/likedClubs/users/${userId}`, {
				params: { page: myLikedClubsPage },
			});

			setMyLikedClubs(likedClubsRes.data.likedClubList);
			setMyLikedClubsTotal(likedClubsRes.data.totalCount);

			const joinedClubsRes = await axios.get(`/members/users/${userId}`, {
				params: {
					page: myJoinedClubsPage,
				},
			});

			setMyJoinedClubs(joinedClubsRes.data.joiningClubList);
			setMyJoinedClubsTotal(joinedClubsRes.data.totalCount);

			const myClubRes = await axios.get(`/clubs/users/${userId}`);

			if (myClubRes.data) {
				const pendingMembersRes = await axios.get("/members", {
					params: {
						userId: userId,
						approvalStatus: "WAITING",
						page: myPendingMembersPage,
					},
				});

				setMyPendingMembers(pendingMembersRes.data.memberList);
				setMyPendingMembersTotal(pendingMembersRes.data.totalCount);

				const memberRes = await axios.get("/members", {
					params: {
						userId: userId,
						approvalStatus: "CONFIRMED",
						page: myMembersPage,
					},
				});

				setMyMembers(memberRes.data.memberList);
				setMyMembersTotal(memberRes.data.totalCount);
			}

			setMyClub(myClubRes.data);

			const likedClubRes = await axios.get("/likedClubs/ids", {
				params: {
					userId: userId,
				},
			});
			setLikedClubs(likedClubRes.data.likedClubIdList);

			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const cancelModal = () => {
		setIsModalVisible(false);
	};

	const DeleteClub = async () => {
		try {
			const res = await axios.get(`/clubs/users/${userId}`);

			if (res.data) {
				const deleteRes = await axios.delete(`/clubs/users/${userId}`);

				if (deleteRes.status === 200) {
					alert("운동모임이 성공적으로 삭제되었습니다.");
					cancelModal();
					navigate(0);
				} else {
					alert("운동모임 삭제에 실패하였습니다.");
				}
			} else {
				alert("현재 개설한 운동모임이 존재하지 않습니다.");
			}
		} catch (e) {
			console.log(e);
		}
	};


	return (
		<Wrapper>
			{loading ? (
				<SpinContainer>
					<Spin />
				</SpinContainer>
			) : (
				<>
					<StyledTabs defaultActiveKey="1">

						<TabPane tab="좋아요한 운동모임" key="1">
							<TabContainer>
								<CardRow>
									<LikedClubCard />
								</CardRow>
								<PaginationRow>
									<Pagination />
								</PaginationRow>
							</TabContainer>
						</TabPane>
						<TabPane tab="참여중인 운동모임" key="2">
							<TabContainer>
								<CardRow>
									<JoinedClubCard />
								</CardRow>
								<PaginationRow>
									<Pagination />
								</PaginationRow>
							</TabContainer>

						</TabPane>
						<TabPane tab="운동모임 관리" key="3">
							<TabContainer gutter={[0, 100]}>
								<Box>
									<MidTitle>참여자 관리</MidTitle>
									<Text>승인 대기자</Text>
									<>
										<PendingMember />
										<PaginationRow>
											<Pagination />
										</PaginationRow>
									</>
									<Divider />
									<Text>참여자 목록</Text>
									<>
										<Member />
										<PaginationRow>
											<Pagination />
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
										<DeleteBtn onClick={showModal}>운동모임 삭제</DeleteBtn>
									</DeleteBtnContainer>
									<StyledModal
										visible={isModalVisible}
										onCancel={cancelModal}
									>
										<Text>
											정말로 운동모임을 삭제하시겠습니까?
										</Text>
										<ButtonRow>
											<FilledBtn onClick={DeleteClub}>확인</FilledBtn>
											<UnfilledBtn type="button" onClick={cancelModal}>
												취소
											</UnfilledBtn>
										</ButtonRow>
									</StyledModal>
								</Box>
							</TabContainer>
						</TabPane>
					</StyledTabs>
				</>
			)}
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

const StyledModal = styled(Modal)`
	display: flex;
	justify-content: center;

	.ant-modal-content {
		padding: 30px 55px;
		display: flex;
    align-items: center;

	.ant-modal-footer {
		display: none;
	}
`;

const ButtonRow = styled(Row)`
	margin-top: 30px;
	display: flex;
	justify-content: center;
  gap: 50px;
`;

const FilledBtn = styled(Button)`
	& {
		color: #ffffff;
		background-color: #1890ff;;
		border: none;
		border-radius: 6px;
		outline: none;
    cursor: pointer;
	}
`;

const UnfilledBtn = styled(Button)`
	& {
		color: #1890ff;;
		background-color: #ffffff;
		border: 2px solid #1890ff;;
		border-radius: 6px;
    cursor: pointer;
	}
`;

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
