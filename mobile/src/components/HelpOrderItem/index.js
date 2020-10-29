import React, { useMemo } from 'react';
import { withNavigation } from 'react-navigation';
import { parseISO, formatDistanceStrict } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Info, Left, Title, Time, Question } from './styles';

function HelpOrderItem({ data, navigation }) {
  const timeFormatted = useMemo(
    () =>
      formatDistanceStrict(parseISO(data.created_at), new Date(), {
        addSuffix: true,
        locale: pt,
      }),
    [data.created_at]
  );

  return (
    <Container
      onPress={() => {
        navigation.navigate('ShowAnswer', { helpOrder: data });
      }}
    >
      <Info>
        <Left>
          <Icon
            name="check-circle"
            size={20}
            color={data.answer ? '#42cb59' : '#999'}
          />
          <Title answered={data.answer}>
            {data.answer ? 'Respondido' : 'Sem resposta'}
          </Title>
        </Left>
        <Time>{timeFormatted}</Time>
      </Info>
      <Question>{data.question}</Question>
    </Container>
  );
}

HelpOrderItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default withNavigation(HelpOrderItem);
