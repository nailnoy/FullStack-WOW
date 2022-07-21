import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import {
	Container,
	Typography,
	Grid,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from '@mui/material';
import { Row, message } from "antd";

import Tags from "./TagFilter";
import SearchBar from "../../common/SearchBar";
import ClubCard from "../../common/ClubCard";
import Spin from "../../common/Spin";
import Pagination from "../../common/Pagination";
import { customMedia } from "../../../GlobalStyles";


function Main() {
	const [clubs, setClubs] = useState();
	const [sortBy, setSortBy] = useState("createdAt");
	const [clubStatus, setClubStatus] = useState("");
	const [selectedTags, setSelectedTags] = useState([]);
	const [tags, setTags] = useState([]);
	const [keyword, setKeyword] = useState("");
	const [likedClubs, setLikedClubs] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const userId = localStorage.getItem("user_id");

	useEffect(() => {
		fetchData();
		setLoading(false);
	}, [clubStatus, page, total, keyword, selectedTags, sortBy, userId]);

	const fetchData = async () => {
		const sendTags = selectedTags.join(", ");

		try {
			const res = await axios.get("/clubs", {
				params: {
					sortBy: sortBy,
					tags: sendTags,
					clubStatus: clubStatus,
					keyword: keyword,
					page: page,
				},
			});

			if (res.data.clubList.length > tags.length) {
				for (let i = 0; i < res.data.clubList.length; i++) {
					setTags((prevState) => {
						return [...prevState, { tags: res.data.clubList[i].tags }]
					});
				}
			};

			setClubs(res.data.clubList);
			setTotal(res.data.totalCount);

			if (userId) {
				const likedClubRes = await axios.get("/likedClubs/ids", {
					params: {
						userId: userId,
					},
				});
				setLikedClubs(likedClubRes.data.likedClubIdList);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleLikedClubs = (clubId) => {
		let index = likedClubs.indexOf(clubId);

		try {
			if (likedClubs.includes(clubId)) {
				likedClubs.splice(index, 1);
				setLikedClubs([...likedClubs]);
				handleLikeDelete(clubId);
			} else {
				setLikedClubs([...likedClubs, clubId]);
				handleLikePost(clubId);
			}
		} catch (err) {
			console.log(err);
		} finally {
			fetchData();
		}
	};

	const handleLikePost = async (clubId) => {
		try {
			await axios.post("/likedClubs", {
				clubId: Number(clubId),
				userId: userId,
			});
		} catch (err) {
			message.error("이미 좋아요한 운동모임입니다.");
		}
	};

	const handleLikeDelete = async (clubId) => {
		try {
			axios.delete("/likedClubs", {
				params: { userId: userId, clubId: Number(clubId) },
			});
		} catch (err) {
			console.log(err);
		}
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
								gutterBottom variant="h6"
								component="h2"
								fontFamily="Jua"
								fontSize="2rem"
								textAlign="center"
							>
								운동 모임 찾기
							</Typography>
						</Container>

						<Container sx={{ py: 1 }} maxWidth="xs">
							<SearchBar keyword={keyword} setKeyword={setKeyword} />
						</Container>

						<Container sx={{ py: 1, mb: 2,display: "flex" }} maxWidth="xs">
								<Tags
									selectedTags={selectedTags}
									setSelectedTags={setSelectedTags}
									tags={tags}
									setTags={setTags}
									clubs={clubs}
								/>
								<FormControl sx={{ ml: 2, minWidth: 100 }} size="small">
									<InputLabel id="SortBy">정렬</InputLabel>
									<Select
										id="sortFliter"
										label="SortBy"
										value={sortBy}
										onChange={(e) => { setSortBy(e.target.value) }}
									>
										<MenuItem value="createdAt">최신순</MenuItem>
										<MenuItem value="likes">좋아요순</MenuItem>
									</Select>
								</FormControl>
						</Container>

						<Container sx={{ py: 0 }} maxWidth="md">
							<Grid container spacing={4}>
								{clubs
									? clubs.map((club) => (
										<ClubCard
											key={club.id}
											userId={userId}
											club={club}
											likedClubs={likedClubs}
											handleLikedClubs={handleLikedClubs}
										/>
									))
									: ""}
							</Grid>
						</Container>
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
};

export default Main;

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
