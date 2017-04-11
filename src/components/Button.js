import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  background: #E8E8E8;
  color: ${props => props.disabled ? '#888888' : '#07f'};
`;

export default Button;
