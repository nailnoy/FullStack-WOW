import React from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styled from "styled-components";

const Tags = (props) => {
  let strTags = props.tags.map(JSON.stringify);
	let removeDuplicatesTags = [...new Set(strTags)].map(JSON.parse);

  const handleSelectTags = (e) => {
    if(e.target.innerText != undefined){
      let tagName = e.target.innerText;
      // let index = props.selectedTags.indexOf(tagName);
      console.log(tagName);

      // if (props.selectedTags.includes(tagName)) {
      //   props.selectedTags.splice(index, 1);
      //   props.setSelectedTags([...props.selectedTags]);
      // } else {
        props.setSelectedTags([...props.selectedTags, tagName]);
      // }
    }else{
      props.setSelectedTags([]);
    }
    
	};

    return (
        <FilterContainer>
        <Autocomplete
        size="small"
        disablePortal
        id="multiple-limit-tags"
        options={removeDuplicatesTags}
        onChange={handleSelectTags}
        getOptionLabel={(option) => option.tags}
        // defaultValue={[]}
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

  export default Tags;

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
