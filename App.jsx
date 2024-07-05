// src/App.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import Login from './components/Login';
import OtpScreen from './components/OtpScreen';
import HomeScreen from './components/HomeScreen';
import store from './redux/store';
import i18n from './components/i18n';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='OtpScreen' component={OtpScreen} />
            <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
