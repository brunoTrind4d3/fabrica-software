import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';

import { withNavigationFocus } from 'react-navigation';

import Background from '~/components/Background';
import Input from '~/components/Input';
import Loading from '~/components/Loading';
import LogoHeader from '~/components/LogoHeader';

import { Container, Form, SubmitButton } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '~/services/api';

const style = StyleSheet.create({
  value: {
    color: '#EE4E62',
    fontWeight: 'bold',
    fontSize: 32,
    alignSelf: 'center',
  },
  teste: {
    marginBottom: 5,
  },
});

function LancamentoDiario({ isFocused }) {
  const [loading, setLoading] = useState(true);
  const [receitaObtida, setReceitaObtida] = useState();
  const [quantidadeViagens, setQuantidadeViagens] = useState();
  const [quilometrosRodados, setQuilometrosRodados] = useState();
  const [consumoVeiculo, setConsumoVeiculo] = useState();
  const [horasTrabalhadas, setHorasTrabalhadas] = useState();
  const [valorCombustivel, setValorCombustivel] = useState();
  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      cleanFields();
    }
  }, [isFocused]);

  function cleanFields() {
    setLoading(false);
    setReceitaObtida(null);
    setQuantidadeViagens(null);
    setQuilometrosRodados(null);
    setConsumoVeiculo(null);
    setHorasTrabalhadas(null);
    setValorCombustivel(null);
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      if (
        !!receitaObtida ||
        !!quantidadeViagens ||
        !!quilometrosRodados ||
        !!consumoVeiculo ||
        !!horasTrabalhadas ||
        !!valorCombustivel
      ) {
        //endpoint de cadastro de lancamento
        await api.post('estatistica', {
          receitaObtida,
          quantidadeViagens,
          quilometrosRodados,
          consumoVeiculo,
          horasTrabalhadas,
          valorCombustivel,
        });
        Alert.alert(
          'Lançamento diário',
          'Lançamento diário realizado com sucesso'
        );
      } else {
        Alert.alert('Lançamento diário', 'Há campos faltantes na inclusão!');
      }
    } catch (err) {
      Alert.alert(
        'Lançamento diário',
        'Erro ao realizar lançamento, verifique se o mesmo já não foi realizado!'
      );
    } finally {
      setLoading(false);
      cleanFields();
    }
  }

  return (
    <Background>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Icon name="rocket" size={100} color="#EE4E62" />
          <Form>
            <Input
              style={style.teste}
              keyboardType="decimal-pad"
              placeholder="Informe a receita obtida"
              returnKeyType="send"
              value={receitaObtida}
              onChangeText={setReceitaObtida}
            />

            <Input
              style={style.teste}
              keyboardType="decimal-pad"
              placeholder="Informe a quantidade de viagens"
              returnKeyType="send"
              value={quantidadeViagens}
              onChangeText={setQuantidadeViagens}
            />
            <Input
              style={style.teste}
              keyboardType="decimal-pad"
              placeholder="Informe a quilometragem rodada"
              returnKeyType="send"
              value={quilometrosRodados}
              onChangeText={setQuilometrosRodados}
            />
            <Input
              style={style.teste}
              keyboardType="decimal-pad"
              placeholder="Informe o consumo médio do veículo"
              returnKeyType="send"
              value={consumoVeiculo}
              onChangeText={setConsumoVeiculo}
            />
            <Input
              style={style.teste}
              keyboardType="decimal-pad"
              placeholder="Informe o valor do último abastecimento"
              returnKeyType="send"
              value={valorCombustivel}
              onChangeText={setValorCombustivel}
            />
            <Input
              style={style.teste}
              keyboardType="decimal-pad"
              placeholder="Informe a quantidade de horas trabalhadas"
              returnKeyType="send"
              value={horasTrabalhadas}
              onChangeText={setHorasTrabalhadas}
            />

            <SubmitButton loading={loading} onPress={handleSubmit}>
              Realizar Lançamento
            </SubmitButton>
          </Form>
        </Container>
      )}
    </Background>
  );
}

LancamentoDiario.navigationOptions = () => ({
  headerTitle: () => <LogoHeader />,
});

LancamentoDiario.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(LancamentoDiario);
