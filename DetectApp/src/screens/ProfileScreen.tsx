import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import {Props} from '../components/Types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar, Title, Appbar, Button} from 'react-native-paper';
import Styles from '../components/Styles';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {State, store} from '../stores';
const ProfileScreen: React.FC<Props> = ({navigation}) => {
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
  const userProfile = useSelector((state: State) => state.profile);
  return (
    <SafeAreaView style={Styles.container}>
      <Appbar.Header theme={{colors: {primary: '#2c74bc'}}}>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
      </Appbar.Header>
      <View style={Styles.profileTopScreen}>
        <Avatar.Text size={100} label="U" style={Styles.avatar} />
        <Text style={{marginRight:'auto', marginLeft:'auto', fontSize:30}}>Tên</Text>
      </View>
      <Button
            style={{backgroundColor: '#2c74bc'}}
            mode="contained"
            onPress={()=>{console.log(userProfile)}}>
            Thêm
          </Button>
    </SafeAreaView>
  );
};
export default ProfileScreen;
