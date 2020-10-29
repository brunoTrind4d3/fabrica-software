import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { signUpRequest } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import Input from '~/components/Input';
import { Container, Form, SubmitButton, Navigator } from './styles';
import Button from '~/components/Button';

const style = StyleSheet.create({
  value: {
    color: '#EE4E62',
    fontWeight: 'bold',
    fontSize: 32,
    alignSelf: 'center',
  },
});

function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const { loading } = useSelector(state => state.auth);

  function handleSubmit() {
    dispatch(signUpRequest(email, password, name));
    navigation.goBack();
  }

  return (
    <Background>
      <Container>
        <Text style={style.value}> Motorista Rentável</Text>
        <Form>
          <Input
            keyboardType="default"
            placeholder="Informe seu nome"
            returnKeyType="send"
            value={name}
            onChangeText={setName}
          />
          <Input
            keyboardType="default"
            placeholder="Informe seu email"
            returnKeyType="send"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            keyboardType="default"
            placeholder="Informe sua senha"
            returnKeyType="send"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Registrar
          </SubmitButton>
        </Form>
        <Navigator onPress={() => navigation.goBack()}>
          <Text>Já tenho conta!</Text>
        </Navigator>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
export default withNavigation(SignUp);
