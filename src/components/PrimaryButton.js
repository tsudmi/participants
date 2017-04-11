import styled from 'styled-components';
import Button from './Button';

const PrimaryButton = styled(Button)`
  margin-left: ${props => props.marginLeft ? props.marginLeft : '0'};
  background: ${props => props.disabled ? '#E8E8E8' : '#07f'};
  color: ${props => props.disabled ? '#888888' : '#FFFFFF'};
`;

export default PrimaryButton;
