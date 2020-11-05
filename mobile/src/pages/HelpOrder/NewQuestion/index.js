import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert, TouchableOpacity, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import cep from 'cep-promise';

import api from '~/services/api';
import { format, parseISO } from 'date-fns';

import LogoHeader from '~/components/LogoHeader';
import Background from '~/components/Background';
import Loading from '~/components/Loading';

import { NewInput, SubmitButton, Container, Card } from './styles';

const styles = StyleSheet.create({
  cardTitle: {
    color: '#EE4E62',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: { color: '#EE4E62', fontWeight: 'bold', fontSize: 18 },
});
export default function NewQuestion({ navigation, isFocused }) {
  //const { id } = useSelector(state => state.auth.student);
  const [zipCode, setZipCode] = useState(0);
  const [uf, setUf] = useState();
  const [cidade, setCidade] = useState();
  const [logradouro, setLogradouro] = useState();
  const [complemento, setComplemento] = useState();

  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [mobilePhone, setMobilePhone] = useState();
  const [cpf, setCpf] = useState();
  const [birthDate, setBirthDate] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (zipCode.length >= 8) loadAddress();
    if (!zipCode) {
      setCidade(null);
      setUf(null);
      setLogradouro(null);
      setComplemento(null);
    }
  }, [zipCode]);

  useEffect(() => {
    loadDados();
  }, [isFocused]);

  async function loadDados() {
    try {
      setLoading(true);
      const dataAddress = await api.get('address');
      setComplemento(dataAddress.data.complemento);
      setZipCode(dataAddress.data.cep);

      const { data } = await api.get('user');
      setUsername(data.username);
      setEmail(data.email);
      setCpf(data.cpf);
      setMobilePhone(data.mobilePhone);
      const parsedDate = parseISO(data.birthDate);
      setBirthDate(format(parsedDate, "dd'/'MM'/'yyyy"));
    } catch (err) {
      Alert.alert('Usuário', 'Erro ao buscar dados do usuário!');
    } finally {
      setLoading(false);
    }
  }

  async function loadAddress() {
    try {
      const data = await cep(zipCode);
      setUf(data.state);
      setCidade(data.city);
      setLogradouro(data.street);
    } catch (err) {
      Alert.alert('Usuário', 'Erro ao buscar dados do endereço!');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      await api.put(`/address`, {
        cep: zipCode,
        uf,
        cidade,
        logradouro,
        complemento,
      });

      await api.put(`/user`, {
        email,
        username,
        mobilePhone,
        cpf,
        birthDate,
      });

      Alert.alert('Usuário', 'Cadastro atualizado com succeso!');

      navigation.navigate('HelpOrder');
    } catch (err) {
      Alert.alert('Usuário', err.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Dados Pessoais</Text>
            <NewInput
              keyboardType="decimal-pad"
              placeholder="Nome"
              returnKeyType="send"
              value={username}
              onChangeText={setUsername}
              editable={false}
            />
            <NewInput
              keyboardType="default"
              placeholder="Email"
              returnKeyType="send"
              value={email}
              onChangeText={setEmail}
              editable={false}
            />
            <NewInput
              keyboardType="decimal-pad"
              placeholder="Informe o CPF"
              returnKeyType="send"
              value={cpf}
              onChangeText={setCpf}
            />
            <NewInput
              keyboardType="decimal-pad"
              placeholder="Informe o número de celular"
              returnKeyType="send"
              value={mobilePhone}
              onChangeText={setMobilePhone}
            />
            <NewInput
              keyboardType="default"
              placeholder="Informe a data de nascimento"
              returnKeyType="send"
              value={birthDate}
              onChangeText={setBirthDate}
            />
          </Card>
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Endereço</Text>
            <NewInput
              keyboardType="decimal-pad"
              placeholder="Informe o CEP"
              returnKeyType="send"
              value={zipCode}
              onChangeText={setZipCode}
            />
            <NewInput
              keyboardType="default"
              placeholder="Informe o estado"
              returnKeyType="send"
              value={uf}
              onChangeText={setUf}
              editable={false}
            />
            <NewInput
              keyboardType="default"
              placeholder="Informe a cidade"
              returnKeyType="send"
              value={cidade}
              onChangeText={setCidade}
              editable={false}
            />
            <NewInput
              keyboardType="default"
              placeholder="Informe o logradouro"
              returnKeyType="send"
              value={logradouro}
              onChangeText={setLogradouro}
              editable={false}
            />
            <NewInput
              keyboardType="default"
              placeholder="Complemento"
              returnKeyType="send"
              value={complemento}
              onChangeText={setComplemento}
            />
          </Card>

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Alterar cadastro
          </SubmitButton>
        </Container>
      )}
    </Background>
  );
}

NewQuestion.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#EE4E62" />
    </TouchableOpacity>
  ),
  headerTitle: () => <Text style={styles.title}>Usuário</Text>,
});

NewQuestion.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
