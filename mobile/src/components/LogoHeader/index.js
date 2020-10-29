import React from 'react';
import { useDispatch } from 'react-redux';
import { Text, StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signOut } from '~/store/modules/auth/actions';

const style = StyleSheet.create({
  title: { color: '#EE4E62', fontWeight: 'bold', fontSize: 18 },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 370,
  },
});

export default function LogoHeader() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>Motorista Rentável</Text>
      <RectButton onPress={handleLogout}>
        <Icon name="power" size={20} color="#EE4E62" />
      </RectButton>
    </View>
  );
}
