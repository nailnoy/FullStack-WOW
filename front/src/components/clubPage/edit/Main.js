import React from "react";
import styled from "styled-components";

import { TextField } from "@material-ui/core";
import { customMedia } from "../../../GlobalStyles";
import PostEditor from "../../common/PostEditor";


import Container from '@mui/material/Container';

function Main(props) {

    return (
        <>
            <Container sx={{ py: 1 }} maxWidth="lg">
                <StyledInput label="제목" required />
            </Container>

            <Container sx={{ py: 1 }} maxWidth="lg">
                <StyledInput
                    label="한줄 소개"
                    variant="outlined"
                    multiline
                    rows={3}
                    defaultValue=""
                />
            </Container>
            <Container sx={{ py: 2 }} maxWidth="lg">
                <PostEditor />
            </Container>
        </>
    )
}
export default Main;


const StyledInput = styled(TextField)`
  width: 800px;

  ${customMedia.lessThan("mobile")`
  font-size: 100px;
  align-self: center;
`}

${customMedia.between("mobile", "largeMobile")`
  font-size: 100px;
  align-self: center;
`}

${customMedia.between("largeMobile", "tablet")`
  width: 400px;
  font-size: 12px;
`}

${customMedia.between("tablet", "desktop")`
  width: 600px;
  font-size: 16px;
`}
  `;
