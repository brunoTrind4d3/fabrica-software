import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Background({ children }) {
  const signed = useSelector(state => state.auth.signed);

  return <Container signed={signed}>{children}</Container>;
}

Background.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
};
