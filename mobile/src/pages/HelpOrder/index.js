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
    async function loadHelpOrders() {
      try {
        setLoading(true);

        //       const { data } = await api.get(`/students/${id}/help-orders`);

        //       setHelpOrders(data);
        //     } catch (err) {
        Alert.alert('Help Orders', err.response.data.error);
      } finally {
        setLoading(false);
      }
    }

    if (isFocused) loadHelpOrders();
  }, [isFocused]); // eslint-disable-line

  return (
    <Background>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Button
            onPress={() => {
              navigation.navigate('NewQuestion');
            }}
          >
            Novo pedido de auxílio
          </Button>
          {/* <List
            data={helpOrders}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <HelpOrderItem data={item} />}
          /> */}
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
