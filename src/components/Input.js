import styled from 'styled-components';

const Input = styled.input`
  padding-left: 10px;
  font-size: 15px;
  background: #F8F8F8;
  border: 1px solid #E0E0E0;
  width: ${props => props.width !== undefined ? props.width : 'auto'};
  height: 38px;
`;

export default Input;
