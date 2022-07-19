import React from "react";
import { FormItemProps, Select } from "antd";
import { Form } from "antd";
import styled from "styled-components";

const StyledFormSelect = styled(Form.Item)`
  width: 100%;

  .ant-select {
    width: 180px;
  }
`;

  const { Option } = Select;

export const FormSelect = (props) => {
  const { option, ...rest } = props;
  return (
    <StyledFormSelect {...rest} initialValue={""}>
      <Select>
        {option.map((arr, idx) => (
          <Option key={idx} value={arr.value}>
            {arr.title}
          </Option>
        ))}
      </Select>
    </StyledFormSelect>
  );
};