import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LogoHeader from '~/components/LogoHeader';
import Background from '~/components/Background';

import { Container, Info, Title, Time, Text, Answer } from './styles';

export default function ShowAnswer({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');

  const timeFormatted = useMemo(() => {
    return formatRelative(parseISO(helpOrder.created_at), new Date(), {
      locale: pt,
    });
  }, [helpOrder.created_at]);

  return (
    <Background>
      <Container>
        <Info>
          <Title>PERGUNTA</Title>
          <Time>{timeFormatted}</Time>
        </Info>
        <Text>{helpOrder.question}</Text>
        {helpOrder.answer && (
          <Answer>
            <Info>
              <Title>RESPOSTA</Title>
            </Info>
            <Text>{helpOrder.answer}</Text>
          </Answer>
        )}
      </Container>
    </Background>
  );
}

ShowAnswer.navigationOptions = ({ navigation }) => ({
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

ShowAnswer.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
