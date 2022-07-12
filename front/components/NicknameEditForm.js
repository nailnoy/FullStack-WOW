import { Form, Input } from 'antd';
import styled from 'styled-components';

const EditForm = styled(Form)`
margin-bottom: '20px',  
border: '1px solid #d9d9d9', 
padding: '20px'
`

const NicknameEditForm = () => {
  return (
    <EditForm>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </EditForm>
  );
};

export default NicknameEditForm;
