import React from "react";
import Pagination from '@mui/material/Pagination';

const CustomPagination = () => {
	return <Pagination color="primary" defaultPage={1} variant="outlined" shape="rounded" count={3} />;
};

export default CustomPagination;
