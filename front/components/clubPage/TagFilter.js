import React from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styled from "styled-components";

export default function Tags() {
    return (
        <FilterContainer>
        <Autocomplete
        size="small"
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        options={categories}
        getOptionLabel={(option) => option.category}
        defaultValue={[]}
        renderInput={(params) => (
            <TextField {...params} 
            label="태그" 
            placeholder="원하시는 운동을 입력해보세요" 
            />
            )}
            sx={{ width: '398px' }}
            />
        </FilterContainer>
    );
  }

  const categories = [
    {category: '축구'},
    {category: '농구'},
    {category: '야구'},
    {category: '필라테스'},
    {category: '헬스'},
    {category: '조깅'}
  ];


  const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
  `;
