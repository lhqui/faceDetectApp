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
        style={Styles.profileTopSCrenn}>
                    <Image
            source={require('../image/profileLogo.png')}
            style={Styles.screenImage}></Image>
        </View>
      <View
        style={Styles.profileViewContainAvata}>
        <View
          style={Styles.profileScreenAvata}>
          <Image
            source={require('../image/user.png')}
            style={Styles.screenImage}></Image>
            
        </View>
      </View>
      <View style={Styles.profileBottomScreen}>
         <Text style={{fontWeight:'bold', fontSize:30, alignSelf:'center'}}>{profile.last_name} </Text>
        {/* <View style={{marginTop:'15%', flexDirection:'row', borderBottomWidth:2, paddingBottom: "2%", borderColor:'#b3b3b3'}}>
          <Text style={Styles.profileLabel}>Họ tên: </Text>
          <Text style={Styles.profileText}>{profile.first_name}{profile.last_name} </Text>
        </View>
        <View style={Styles.viewContainProfileInfor}>
          <Text style={Styles.profileLabel}>Tài khoản: </Text>
          <Text style={Styles.profileText}>{profile.username}</Text>
        </View> 
        <View style={Styles.viewContainProfileInfor}>
          <Text style={Styles.profileLabel}>Email: </Text>
          <Text style={Styles.profileText}> {profile.email}</Text>
        </View>
        <View style={Styles.viewContainProfileInfor}>
          <Text style={Styles.profileLabel}>Ngày tạo: </Text>
          <Text style={Styles.profileText}> {formatDayTime(profile.created_at) }</Text>
        </View> */}
        <View style={Styles.profileBottomInfoContain}>
          <View style={Styles.profileBottomInfoContainLeft}>
          <Text style={Styles.profileLabel}>Họ tên </Text>
          <Text style={Styles.profileLabel}>Tài khoản </Text>
          <Text style={Styles.profileLabel}>Email </Text>
          <Text style={Styles.profileLabel}>Ngày tạo </Text>
          </View>
          <View style={Styles.profileBottomInfoContainRight}>
          <Text style={Styles.profileText}>{profile.first_name} {profile.last_name} </Text>
          <Text style={Styles.profileText}>{profile.username}</Text>
          <Text style={Styles.profileText}>{profile.email}</Text>
          <Text style={Styles.profileText}>{formatDayTime(profile.created_at) }</Text>

          </View>
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
