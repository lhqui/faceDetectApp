/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import NaviRoute from './src/screens/NavRoute';
import {Provider} from 'react-redux';
import { store } from './src/stores';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NaviRoute></NaviRoute>
    </Provider>
  );
};

export default App;
