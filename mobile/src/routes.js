import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Estatistica from '~/pages/Estatistica';
import OptionVehicle from '~/pages/HelpOrder/OptionVehicle';
import LancamentoDiario from '~/pages/LancamentoDiario';
import HelpOrder from '~/pages/HelpOrder';
import NewQuestion from '~/pages/HelpOrder/NewQuestion';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: {
          screen: createStackNavigator(
            {
              SignIn,
              SignUp,
            },
            {
              defaultNavigationOptions: {
                headerShown: false,
              },
            }
          ),
        },
        App: createBottomTabNavigator(
          {
            Checkins: {
              screen: createStackNavigator(
                {
                  Estatistica,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: false,
                    headerTintColor: '#EE4E62',
                    headerTitleAlign: 'center',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Estatísticas',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="chart-bar" size={20} color={tintColor} />
                ),
              },
            },

            LancamentosDiarios: {
              screen: createStackNavigator(
                {
                  LancamentoDiario,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: false,
                    headerTintColor: '#EE4E62',
                    headerTitleAlign: 'center',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Lançamento Diário',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="rocket" size={20} color={tintColor} />
                ),
              },
            },
            HelpOrders: {
              screen: createStackNavigator(
                {
                  HelpOrder,
                  OptionVehicle,
                  NewQuestion,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: false,
                    headerTintColor: '#EE4E62',
                    headerTitleAlign: 'center',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Opções',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="cogs" size={20} color={tintColor} />
                ),
              },
            },
          },

          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#fff',
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
