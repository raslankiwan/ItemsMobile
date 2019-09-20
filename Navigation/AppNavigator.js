import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Items from '../src/Items';
import ItemDetails from '../src/ItemDetails';


const RootStack = createStackNavigator(
  {
      Home: {
          screen: Items,
      },
      ItemDetails: {
          screen: ItemDetails,
      },
  },
  {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
          headerStyle: {
              backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontWeight: 'bold',
          },
      },
  }
);

export default createAppContainer(RootStack)