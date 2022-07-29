import React from 'react';
import styled from 'styled-components';

function RadioBtn({ state, name, value, setFunc }: any) {
  const onChange = () => {
    setFunc(value);
  };

  return (
    <Item>
      <RadioButton
        type="radio"
        value={value}
        name={name || ''}
        checked={state === value}
        onChange={onChange}
      />
      <RadioButtonLabel />
      <RadioText>{value}</RadioText>
    </Item>
  );
}
const Item = styled.div`
  display: flex;
  margin-left: 0.2rem;
  align-items: center;
  position: relative;
  box-sizing: border-box;
`;
const RadioButtonLabel = styled.label`
  position: absolute;
  top: 21%;
  left: 10px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.lightgray};
`;
const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 25px;
  height: 25px;
  &:hover ~ ${RadioButtonLabel} {
    background-color: ${(props) => props.theme.palette.orange};
    opacity: 0.5;
  }
  &:checked + ${RadioButtonLabel} {
    border: none;
    background-color: ${(props) => props.theme.palette.orange};
  }
`;
const RadioText = styled.p`
  font-size: 0.9rem;
  margin-left: 0.4rem;
`;

export default RadioBtn;
