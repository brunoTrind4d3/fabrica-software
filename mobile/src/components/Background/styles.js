import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${props => (props.signed ? '#F5F5F5' : '#fff')};
`;
