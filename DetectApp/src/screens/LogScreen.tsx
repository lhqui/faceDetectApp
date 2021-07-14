import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import {Props} from '../components/Types';
import {Appbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Styles from '../components/Styles';

const LogScreen: React.FC<Props> = ({navigation}) => {
  const handleBackButton = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);
  return (
    <SafeAreaView style={Styles.container}>
      <Appbar.Header theme={{colors: {primary: '#2c74bc'}}}>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
      </Appbar.Header>
      <Text>day la log</Text>
    </SafeAreaView>
  );
};
export default LogScreen;
