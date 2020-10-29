import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';

import { withNavigationFocus } from 'react-navigation';
import { signInRequest } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import Input from '~/components/Input';

import { Container, Form, SubmitButton, Navigator } from './styles';

const style = StyleSheet.create({
  value: {
    color: '#EE4E62',
    fontWeight: 'bold',
    fontSize: 32,
    alignSelf: 'center',
  },
});

function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { loading } = useSelector(state => state.auth);

  function handleSubmit() {
    try {
      if (!!email || !!password) {
        dispatch(signInRequest(email, password));
      } else {
        Alert.alert('Autenticação', 'Favor informe os dados para login');
      }
    } catch (err) {
      Alert.alert('Autenticação', 'Erro ao efetuar login, verifique os dados');
    }
  }

  return (
    <Background>
      <Container>
        <Text style={style.value}> Motorista Rentável</Text>
        <Form>
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
            Entrar no sistema
          </SubmitButton>
        </Form>
        <Navigator onPress={() => navigation.navigate('SignUp')}>
          <Text>Registrar</Text>
        </Navigator>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default withNavigationFocus(SignIn);
