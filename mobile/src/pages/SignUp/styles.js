import { Platform } from 'react-native';
import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;

export const Navigator = styled(RectButton)`
  margin-top: 15px;
  background: transparent;
  color: #999;
`;
