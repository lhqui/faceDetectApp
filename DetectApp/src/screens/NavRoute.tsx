import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import CameraScreen from './CameraScreen';
import ProfileScreen from './ProfileScreen';
import LogScreen from './LogScreen';
const {Navigator, Screen} = createStackNavigator();

const NaviRoute: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator headerMode="none" initialRouteName="Login">
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Login" component={LoginScreen} />
        <Screen name="Camera" component={CameraScreen} />
        <Screen name="Profile" component={ProfileScreen} />
        <Screen name="Log" component={LogScreen} />
      </Navigator>
    </NavigationContainer>
  );
};
export default NaviRoute;
