import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const TextAreaInput = styled(Input)`
  height: 300;
  margin: 20px;
`;

export const NewInput = styled(Input)`
  margin-bottom: 5px;
`;

export const SubmitButton = styled(Button)`
  margin: 20px 0;
  width: 100%;
`;

export const Container = styled.ScrollView`
  flex: 1;
  margin: 20px 20px 0;
`;

export const Card = styled.View`
  margin: 0;
  border-radius: 4px;
  background: #fff;
  padding: 20px;
  margin-bottom: 10px;
`;
