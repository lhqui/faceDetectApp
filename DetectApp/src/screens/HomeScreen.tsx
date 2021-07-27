import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  ImageBackground,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Styles from '../components/Styles';
import {Button} from 'react-native-paper';
import type {Props} from '../components/Types';
import {useSelector, useDispatch} from 'react-redux';
import {State} from '../stores';
import {resetUsertoStore} from '../stores/actionCreators';

const HomeScreen: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const toDetectFaceScreen = () => navigation.navigate('Camera');
  const logOutNofication = () => {
    Alert.alert('Đăng xuất', 'Bạn có muốn đăng xuất?', [
      {text: 'Không', style: 'cancel'},
      {text: 'Có', onPress: () => logOutHandle()},
    ]);
  };
  const axios = require('react-native-axios');
  const userProfile = useSelector((state: State) => state.profile);
  //console.log(userProfile.username, ' token', userProfile.token)
  const logOutHandle = () => {
    setModalVisible(true);
    axios
      .post('https://ai.giaiphapmobifone.vn/api/logout', {
        username: userProfile.username,
        token: userProfile.token,
      })
      .then((res: any) => {
        // console.log(res.data);
        // console.log(res.data.status);
        if (res.data.status == 1) {
          dispatch(resetUsertoStore());
          navigation.navigate('Login');
          setModalVisible(false);
          //console.log(res.data)
        } else {
          console.log('status ko bang 1');
          setModalVisible(false);
        }
      })
      .catch((err: any) => console.log(err));
  };
  const toLog = () => navigation.navigate('Log');
  const toProfile = () => navigation.navigate('Profile');
  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.homeTopScreen}>
        <Image
          source={require('../image/homebackground.png')}
          style={Styles.screenImage}
        />
      </View>
      <View style={Styles.homeBottomScreen}>
      <View style={Styles.homeBottomScreenRowContainButton}>
            <View style={Styles.homeCreenCameraImage}>
            <Image
          source={require('../image/scanface.png')}
          style={Styles.screenImage}
        />
            </View>
        </View>
        <View style={Styles.homeBottomScreenRowContainButton}>
          <Button
            style={Styles.homeCreenCamera}
            mode="contained"
            onPress={toDetectFaceScreen}>
            <Text style={{fontSize:18}}>[ Nhận diện ] </Text>
          </Button>
        </View>
        <View style={Styles.homeBottomScreenRowContainButton}>
          <View style={Styles.homeButtonAndName}>
            <TouchableOpacity style={Styles.roundButton} onPress={toLog}>
              <Image
                source={require('../image/history.png')}
                style={Styles.buttonImage}></Image>
            </TouchableOpacity>
            <Text style={Styles.homeButtonLabel}>Lịch sử</Text>
          </View>
          <View style={Styles.homeButtonAndNameAtMid}>
            <TouchableOpacity style={Styles.roundButton} onPress={toProfile}>
              <Image
                source={require('../image/profile.png')}
                style={Styles.buttonImage}></Image>
            </TouchableOpacity>
            <Text style={Styles.homeButtonLabel}>Hồ sơ</Text>
          </View>
          <View style={Styles.homeButtonAndName}>
            <TouchableOpacity
              style={Styles.roundButton}
              onPress={logOutNofication}>
              <Image
                source={require('../image/logout.png')}
                style={Styles.buttonImage}></Image>
            </TouchableOpacity>
            <Text style={Styles.homeButtonLabel}>Đăng xuất</Text>
          </View>
        </View>
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={Styles.modalLoadingAnimation}>
          <ActivityIndicator size="large" color="#2c74bc" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default HomeScreen;

{
  /* <Appbar.Header>
<Menu
  visible={visible}
  onDismiss={closeMenu}
  anchor={
    <Appbar.Action
      icon="cog-outline"
      size={30}
      color='white'
      onPress={openMenu}></Appbar.Action>
  }>
  <Menu.Item onPress={logOutHandle} title="Log out" />
</Menu>
</Appbar.Header> */
}
