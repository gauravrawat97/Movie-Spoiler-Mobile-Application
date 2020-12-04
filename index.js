/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';


import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

AppRegistry.registerComponent(appName, () => App);
