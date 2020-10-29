import styled from 'styled-components/native';

export const Container = styled.View`
  height: 45px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #dddddd;
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  font-size: 16px;
  margin-left: 20px;
  color: #999;
`;
