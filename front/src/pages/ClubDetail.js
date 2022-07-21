import React from "react";
import Main from "../components/clubPage/detail/Main";
import AppLayout from "../components/common/AppLayout";

const ClubDetail = (props) => {
    return (
        <AppLayout>
            <Main {...props} />
        </AppLayout>
    );
};

export default ClubDetail;