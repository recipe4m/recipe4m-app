/**
 * @format
 */

import 'react-native-gesture-handler';

import App from './App';
import { AppRegistry } from 'react-native';
import { NODE_ENV } from '@env';
import Notification from '@lib/Notification';
import { name as appName } from './app.json';

if (NODE_ENV === 'production') {
  console.deubg = () => {};
  console.log = () => {};
}

Notification.configure();

AppRegistry.registerComponent(appName, () => App);
