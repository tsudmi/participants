import styled from 'styled-components';

const Td = styled.td`
  padding-left: ${props => props.input ? '16px' : '24px'};
  width: ${props => props.width !== undefined ? props.width : 'auto'};
  text-align: ${props => props.textAlign !== undefined ? props.textAlign : 'left'};
  color: #505050;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
`;

export default Td;
