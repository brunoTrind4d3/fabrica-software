import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 10px;
`;

export const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${props => (props.answered ? '#42cb59' : '#999')};
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  margin-left: 7px;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 14px;
  text-align: right;
`;

export const Question = styled.Text.attrs({
  numberOfLines: 3,
})`
  color: #666;
  font-size: 14px;
  line-height: 26px;
  text-align: left;
  margin-top: 16px;
`;
