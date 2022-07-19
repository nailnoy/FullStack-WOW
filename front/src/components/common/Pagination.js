import React from "react";
// import Pagination from '@mui/material/Pagination';
import { Pagination } from "antd";
import { customMedia } from "../../GlobalStyles";
import styled from "styled-components";

const CustomPagination = (props) => {
	return <StyledPagination {...props} />;
	// return <Pagination color="primary" defaultPage={1} variant="outlined" shape="rounded" count={3} />;
};

export default CustomPagination;

const StyledPagination = styled(Pagination)`
	.ant-pagination-item,
	.ant-pagination-disabled,
	.ant-pagination-next {
		${customMedia.lessThan("mobile")`
    min-width: 28px;
    height: 28px;
    `}

		${customMedia.between("mobile", "tablet")`
    min-width: 28px;
    height: 28px;
    `}
	}

	.ant-pagination-item a {
		width: 100%;
		height: 100%;
		${customMedia.lessThan("mobile")`
      font-size: 12px;
      line-height: 25px;
    `}

		${customMedia.between("mobile", "tablet")`
      font-size: 12px;
      line-height: 25px;
    `}
	}

	.anticon {
		${customMedia.lessThan("mobile")`
      display: flex;
      padding: 6px;
    `}

		${customMedia.between("mobile", "tablet")`
      display: flex;
      padding: 6px;
    `}
	}

	.ant-pagination-item-active,
	.ant-pagination-item:focus-visible,
	.ant-pagination-item:hover {
	}

	.ant-pagination-item-active a,
	.ant-pagination-item:focus-visible a,
	.ant-pagination-item:hover a {
	}
`;
