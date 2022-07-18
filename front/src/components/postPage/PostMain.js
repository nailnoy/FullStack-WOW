import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import PostCard from "./PostCard";
import { Button, Pagination } from "@mui/material";
import SearchBar from "../clubPage/SearchBar";

function PostMain() {
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
      </main>
    </>
  );
}

export default PostMain;
