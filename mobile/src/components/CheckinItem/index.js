import React, { useMemo } from 'react';
import { parseISO, formatDistanceStrict } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { Container, Title, Time } from './styles';

export default function CheckinItem({ data }) {
  const timeFormatted = useMemo(
    () =>
      formatDistanceStrict(parseISO(data.created_at), new Date(), {
        addSuffix: true,
        locale: pt,
      }),
    [data.created_at]
  );

  return (
    <Container>
      <Title>Check-in #{data.id}</Title>
      <Time>{timeFormatted}</Time>
    </Container>
  );
}

CheckinItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};
