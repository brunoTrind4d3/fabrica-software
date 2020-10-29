import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Alert, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';
import Slider from '@react-native-community/slider';
import { changeAsyncValue } from '~/store/modules/auth/actions';

import api from '~/services/api';

import LogoHeader from '~/components/LogoHeader';
import Background from '~/components/Background';
import Button from '~/components/Button';
import Loading from '~/components/Loading';

import { Container } from './styles';

function Checkin({ isFocused }) {
  const dispatch = useDispatch();
  const { id, goal } = useSelector(state => state.auth.user);

  const [graphs, setGraphs] = useState({});
  const [dados, setDados] = useState([]);
  const [dadosGastos, setDadosGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState(goal);
  const [lucro, setLucro] = useState(0);

  async function loadGraphs() {
    try {
      setLoading(true);
      const response = await api.get(`estatistica`);
      setGraphs(response.data.data);
      setDados(response.data.data.datasets[0].data);
      console.tron.warn(response.data.data);
      setDadosGastos(response.data.data.datasets[1].data);
    } catch (err) {
      Alert.alert('Estatísticas', err.response.data.error);
      setLoading(false);
    }
  }

  async function loadLucro() {
    try {
      const { data } = await api.get(`/estatistica/${id}`);
      setLucro(data);
    } catch (err) {
      Alert.alert('Estatísticas', err.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      setMeta(goal);
      loadGraphs();
      loadLucro();
    }
  }, [isFocused]); // eslint-disable-line

  async function handleRedefineMeta() {
    try {
      setLoading(true);

      await api.put(`/estatistica`, { goal: meta });
      Alert.alert('Estatística', 'Meta alterada com sucesso!');
      dispatch(changeAsyncValue(meta));
    } catch (err) {
      Alert.alert('Estatística', err.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  const style = StyleSheet.create({
    title: { color: '#EE4E62', fontWeight: 'bold', fontSize: 18 },
    value: {
      color: '#777',
      fontWeight: 'bold',
      fontSize: 32,
      alignSelf: 'center',
      marginTop: 15,
    },
  });

  return (
    <Background>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Text style={style.title}>Seus Lucros:</Text>
          <Text style={style.value}>R$ {lucro}</Text>

          <Text style={style.title}>Meta:</Text>
          <Text style={style.value}>R$ {meta}</Text>
          <Slider
            style={{ width: 375, height: 40 }}
            minimumValue={500}
            maximumValue={5000}
            minimumTrackTintColor="#EE4E62"
            maximumTrackTintColor="#777"
            value={meta}
            step={100}
            onSlidingComplete={setMeta}
          />
          <Button onPress={handleRedefineMeta}>Redefinir meta</Button>

          <LineChart
            data={{
              labels: graphs.labels,
              datasets: [
                {
                  data: dados,
                  color: (opacity = 1) => `rgba(21, 138, 66, ${opacity})`,
                  stroke: 'rgba(21, 138, 66, 1)',
                },
                {
                  data: dadosGastos,
                  color: (opacity = 1) => `rgba(142, 2, 2, ${opacity})`,
                  stroke: 'rgba(142, 2, 2, 1)',
                },
              ],
            }}
            width={375} // from react-native
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFrom: '#e0e0e0',
              backgroundGradientTo: '#e0e0e0',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 0.9) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(74, 74, 72, ${opacity})`,
              style: {
                borderRadius: 2,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </Container>
      )}
    </Background>
  );
}

Checkin.navigationOptions = () => ({
  headerTitle: () => <LogoHeader />,
});

Checkin.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Checkin);
