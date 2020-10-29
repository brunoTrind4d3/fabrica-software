import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 20px;
  padding: 20px;
`;

export const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
`;

export const Title = styled.Text`
  color: #444;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 14px;
  text-align: right;
`;

export const Text = styled.Text`
  color: #666;
  font-size: 14px;
  line-height: 26px;
  text-align: left;
`;

export const Answer = styled.View`
  padding-top: 20px;
`;
