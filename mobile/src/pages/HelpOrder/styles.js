import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin: 20px 20px 0;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;
