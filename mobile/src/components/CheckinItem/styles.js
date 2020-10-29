import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 46px;
  padding: 15px 20px;
  margin-bottom: 10px;
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
