import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import LogoHeader from '~/components/LogoHeader';
import Background from '~/components/Background';

import { TextAreaInput, SubmitButton } from './styles';

export default function NewQuestion({ navigation }) {
  //const { id } = useSelector(state => state.auth.student);
  //const [question, setQuestion] = useState();
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      // await api.post(`/students/${id}/help-orders`, {
      //   question,
      // });

      Alert.alert('New Question', 'Pedido de auxílio realizado com succeso!');

      navigation.navigate('HelpOrder');
    } catch (err) {
      Alert.alert('New Question', err.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background>
      <TextAreaInput
        placeholder="Inclua seu pedido de auxílio"
        multiline
        //onChangeText={setQuestion}
      />
      <SubmitButton loading={loading} onPress={handleSubmit}>
        Enviar pedido
      </SubmitButton>
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
  headerTitle: () => <LogoHeader />,
});

NewQuestion.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
