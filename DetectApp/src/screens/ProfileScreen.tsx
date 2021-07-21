import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, BackHandler, Image} from 'react-native';
import {Props} from '../components/Types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar, Title, Appbar, Button} from 'react-native-paper';
import Styles from '../components/Styles';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {State, store} from '../stores';

interface profileInformation {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  created_at: string;
}
const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const handleBackButton = () => {
    navigation.goBack();
    return true;
  };
  const userProfile = useSelector((state: State) => state.profile);
  const [profile, setProfile] = useState<profileInformation>({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    created_at: '',
  });
  const getUserInformation = () => {
    setProfile({
      ...profile,
      first_name: userProfile.first_name,
      last_name: userProfile.last_name,
      email: userProfile.email,
      username: userProfile.username,
      created_at: userProfile.created_at,
    });
  };

  useEffect(() => {
    getUserInformation();
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);
  const formatDayTime = (timeString: string) => {
    const year = timeString.substring(4, 0);
    const month = timeString.substring(5, 7);
    const day = timeString.substring(8, 10);
    //const time = timeString.substring(10, 20);
    return day.concat('/', month, '/', year, ' ');
  };
  return (
    <SafeAreaView style={Styles.container}>
      <Appbar.Header theme={{colors: {primary: '#2c74bc'}}}>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
        <Appbar.Content title="HỒ SƠ" />
      </Appbar.Header>
      <View>
      <View
        style={{
          height: '20%',
          width: '100%',
          backgroundColor: '#c4c4c4',
          elevation: 2,
        }}></View>
      <View
        style={{
          width: '100%',
          height: '20%',
          marginTop: '25%',
          position: 'absolute',
          elevation: 3,
          backgroundColor: 'transparent'
        }}>
        <View
          style={{
            width: 150,
            height: 150,
            borderRadius: 80,
            // backgroundColor: 'white',
            elevation: 3,
            alignSelf: 'center',
          }}>
          <Image
            source={require('../image/user.png')}
            style={{width: '100%', height: '100%'}}></Image>
             <Text style={{fontWeight:'bold', fontSize:30, alignSelf:'center'}}>{profile.last_name} </Text>
        </View>
      </View>
      <View style={{
        width: '100%',
        height: '100%',
        backgroundColor:'transparent',
        elevation:2,
        flexDirection:'column',
        paddingTop:'20%',
        paddingLeft: '10%',
        paddingRight:'10%'
      }}>
        <View style={{marginTop:'15%', flexDirection:'row', borderBottomWidth:2, paddingBottom: "2%", borderColor:'#b3b3b3'}}>
          <Text style={Styles.profileLabel}>Họ tên: </Text>
          <Text style={Styles.profileText}>{profile.first_name} {profile.last_name} </Text>
        </View>
        <View style={Styles.viewContainProfileInfor}>
          <Text style={Styles.profileLabel}>Tên tài khoản: </Text>
          <Text style={Styles.profileText}>{profile.username}</Text>
        </View> 
        <View style={Styles.viewContainProfileInfor}>
          <Text style={Styles.profileLabel}>Email: </Text>
          <Text style={Styles.profileText}> {profile.email}</Text>
        </View>
        <View style={Styles.viewContainProfileInfor}>
          <Text style={Styles.profileLabel}>Ngày tạo: </Text>
          <Text style={Styles.profileText}> {formatDayTime(profile.created_at) }</Text>
        </View>
        </View>

      </View>


      {/* <Button
        style={{backgroundColor: '#2c74bc'}}
        mode="contained"
        onPress={() => {
          console.log(userProfile);
        }}>
        Thêm
      </Button> */}
    </SafeAreaView>
  );
};
export default ProfileScreen;
