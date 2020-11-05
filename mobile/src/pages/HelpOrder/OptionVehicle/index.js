import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert, TouchableOpacity, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

import api from '~/services/api';
import axios from 'axios';

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
export default function OptionVehicle({ navigation, isFocused }) {
  //const { id } = useSelector(state => state.auth.student);

  const [ano, setAno] = useState();
  const [vehicle, setVehicle] = useState({});
  const [ipva, setIpva] = useState();
  const [manutencao, setManutencao] = useState();
  const [placa, setPlaca] = useState();
  const [quilometragem, setQuilometragem] = useState();
  const [marca, setMarca] = useState();
  const [allBrands, setAllBrands] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [modelo, setModelo] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDados();
  }, [isFocused]);

  useEffect(() => {
    loadModels();
  }, [marca]);

  async function loadModels() {
    try {
      setLoading(true);
      const fipe = await axios.get(
        `http://fipeapi.appspot.com/api/1/carros/veiculos/${marca}.json`
      );
      setAllModels(fipe.data);
    } catch (err) {
      Alert.alert('Veículo', 'Erro ao consultar api de modelos!');
    } finally {
      setLoading(false);
    }
  }

  async function loadDados() {
    try {
      setLoading(true);
      const { data } = await api.get('vehicle');
      const fipe = await axios.get(
        'http://fipeapi.appspot.com/api/1/carros/marcas.json'
      );
      setVehicle(data);
      setAllBrands(fipe.data);
      setIpva(String(data.ipva));
      setManutencao(String(data.manutencao));
      setPlaca(data.placa);
      setQuilometragem(String(data.quilometragem));
      setAno(String(data.ano));
      setMarca(data.marca);
      setModelo(data.modelo);
    } catch (err) {
      Alert.alert('Veículo', 'Erro ao buscar dados do veículo!');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      await api.put(`/vehicle`, {
        ano,
        ipva,
        manutencao,
        placa,
        quilometragem,
        marca,
        modelo,
      });

      Alert.alert('Veículo', 'Cadastro atualizado com succeso!');

      navigation.navigate('HelpOrder');
    } catch (err) {
      Alert.alert('Veículo', err.response.data.error);
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
            <Text style={styles.cardTitle}>Dados Veículo</Text>
            <Picker
              selectedValue={marca}
              onValueChange={(itemValue, itemIndex) => setMarca(itemValue)}
            >
              {allBrands.map(brand => (
                <Picker.Item label={brand.fipe_name} value={brand.id} />
              ))}
            </Picker>

            <Picker
              selectedValue={modelo}
              onValueChange={(itemValue, itemIndex) => setModelo(itemValue)}
            >
              {allModels.map(model => (
                <Picker.Item label={model.fipe_name} value={model.fipe_name} />
              ))}
            </Picker>

            <NewInput
              keyboardType="decimal-pad"
              placeholder="Ano do veículo"
              returnKeyType="send"
              value={ano}
              onChangeText={setAno}
            />
            <NewInput
              keyboardType="default"
              placeholder="Placa do veículo"
              returnKeyType="send"
              value={placa}
              onChangeText={setPlaca}
            />
            <NewInput
              keyboardType="default"
              placeholder="Quilometragem do veículo"
              returnKeyType="send"
              value={quilometragem}
              onChangeText={setQuilometragem}
            />
          </Card>

          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Gastos Fixos</Text>
            <NewInput
              keyboardType="default"
              placeholder="Valor do IPVA por ano"
              returnKeyType="send"
              value={ipva}
              onChangeText={setIpva}
            />

            <NewInput
              keyboardType="default"
              placeholder="Média de manutençao/mês"
              returnKeyType="send"
              value={manutencao}
              onChangeText={setManutencao}
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

OptionVehicle.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#EE4E62" />
    </TouchableOpacity>
  ),
  headerTitle: () => <Text style={styles.title}>Veículo</Text>,
});

OptionVehicle.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
