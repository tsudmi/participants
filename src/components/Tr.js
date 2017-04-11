import styled from 'styled-components';

const Tr = styled.tr`
  height: ${props => props.header ? '48px' : '73px'};
  border: 1px solid #F0F0F0;
  cursor: default;
  &:first-child {
    border-top: none;
  }
  
  &:last-child {
    border-bottom: ${props => !props.header ? 'none' : '1px solid #F0F0F0'};
  }
`;

export default Tr;
