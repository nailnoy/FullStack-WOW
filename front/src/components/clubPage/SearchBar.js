import React from "react";
import { Input } from "antd";
import styled from "styled-components";
import 'antd/dist/antd.css' 

const SearchBar = (props) => {
	const onSearch = (value) => {
		props.setKeyword(value);
	};

	return (
		<SearchBarContainer>
			<StyledSearchBar
				allowClear
				enterButton
				size="large"
				placeholder="운동모임 검색"
				onSearch={onSearch}
				onPressEnter={(e) => {
					onSearch(e.target.value);
				}}
			/>
		</SearchBarContainer>
	);
};

export default SearchBar;

const { Search } = Input;

const SearchBarContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const StyledSearchBar = styled(Search)`
  width: 500px`;
  
