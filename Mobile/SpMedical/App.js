
import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './scr/screens/login';
import Medico from './scr/screens/medico'

const AuthStack = createStackNavigator();

export default function Stack() {
  return (
    <NavigationContainer>
      {/* <StatusBar
        hidden={true}
      /> */}

      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
        >
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Medico" component={Medico} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}