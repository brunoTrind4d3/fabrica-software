import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';

import api from '~/services/api';

import LogoHeader from '~/components/LogoHeader';
import Background from '~/components/Background';
import Button from '~/components/Button';
import HelpOrderItem from '~/components/HelpOrderItem';
import Loading from '~/components/Loading';

import { Container, List } from './styles';

function HelpOrder({ isFocused, navigation }) {
  // const { id } = useSelector(state => state.auth.student);
  // const [helpOrders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setLoading(false);
    }
  }, [isFocused]); // eslint-disable-line

  return (
    <Background>
      {loading ? (
        <Loading />
      ) : (
        <Container
          style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
        >
          <Button
            style={{ marginBottom: 10 }}
            onPress={() => {
              navigation.navigate('NewQuestion');
            }}
          >
            Opções de usuário
          </Button>
          <Button
            onPress={() => {
              navigation.navigate('OptionVehicle');
            }}
          >
            Opções de veículo
          </Button>
        </Container>
      )}
    </Background>
  );
}
HelpOrder.navigationOptions = () => ({
  headerTitle: () => <LogoHeader />,
});

HelpOrder.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default withNavigationFocus(HelpOrder);
