/**
 * @format
 */

import 'react-native-gesture-handler';

import App from './App';
import { AppRegistry } from 'react-native';
import { NODE_ENV } from '@env';
import { name as appName } from './app.json';

if (NODE_ENV === 'production') {
  console.deubg = () => {};
  console.log = () => {};
}

AppRegistry.registerComponent(appName, () => App);
