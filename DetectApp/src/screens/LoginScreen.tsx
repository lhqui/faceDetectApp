import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Styles from '../components/Styles';
import {Button, Card, TextInput, Avatar} from 'react-native-paper';
import type {Props} from '../components/Types';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {State, store} from '../stores';
import {setUsertoStore} from '../stores/actionCreators';
import {bindActionCreators} from 'redux';

type InputLoginValue = {
  account: string;
  password: string;
};
interface settingInputType {
  urlServer: string;
  idCamera: string;
  idOffice: string;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    getSettingData();
    getLoginData();
  }, []);
  //dispatch acction to state
  const dispatch = useDispatch();

  // map global state to prop
  const userProfile = useSelector((state: State) => state.profile);

  //  a state to store a value that input from login form
  const [values, setValues] = useState<InputLoginValue>({
    account: '',
    password: '',
  });
  // store login value to local storage
  const storeloginInput = async () => {
    try {
      let loginValue = [
        ['username', values.account],
        ['password', values.password],
      ];
      await AsyncStorage.multiSet(loginValue, () => {
        console.log('save all data');
      });
    } catch (e) {
      console.log('saving error');
    }
  };
  // get login data to state
  const getLoginData = async () => {
    try {
      let keys = ['username', 'password'];
      AsyncStorage.multiGet(keys, (err: any, stores: any) => {
        stores.map((result: any, i: any, store: any) => {
          setSettingValues({...settingValues, [keys[i]]: store[i][1]});
        });
      });
    } catch (e) {
      console.log('getting error');
    }
  };
  //  a state to store a value that input from setting form
  const [settingValues, setSettingValues] = useState<settingInputType>({
    urlServer: '',
    idCamera: '',
    idOffice: '',
  });
  const [userSettingIsShow, setUserSettingIsShow] = useState(false);
  const axios = require('react-native-axios');
  const [modalVisible, setModalVisible] = useState(false);

  const loginHandle = () => {
    setModalVisible(true);
    storeloginInput();
    axios
      .post('https://ai.giaiphapmobifone.vn/api/login', {
        username: values.account,
        password: values.password,
      })
      .then((resp: any) => {
        if (resp.data.status === 1) {
          // console.log(resp.data.data.id)
          //setaccountInfo(resp.data.data)

          let data = {
            id: resp.data.data.id,
            group_id: resp.data.data.group_id,
            username: resp.data.data.username,
            email: resp.data.data.email,
            first_name: resp.data.data.first_name,
            last_name: resp.data.data.last_name,
            last_login: resp.data.data.last_login,
            created_at: resp.data.data.created_at,
            token: resp.data.data.token,
          };
          dispatch(setUsertoStore(data));
          navigation.navigate('Home');
          setModalVisible(false);
        } else {
          console.log('sai mk');
          setModalVisible(false);
        }
        console.log('thuc thi 1');
      })
      .catch((err: any) => console.log(err));

    // resovle("\t\t This is second promise");
    // console.log("Returned second promise");
  };

  const toHomescreen = () => {
    console.log('final', userProfile);
  };

  // input handler functions
  const inputHandle = (fieldName: keyof InputLoginValue, value: string) => {
    if (userSettingIsShow == true) {
      setUserSettingIsShow(false);
    }
    setValues({...values, [fieldName]: value});
  };
  const inputSettingHandle = (
    fieldName: keyof settingInputType,
    value: string,
  ) => {
    setSettingValues({...settingValues, [fieldName]: value});
    //console.log(settingValues)
  };
  // set state to render the setting form input
  const handlePressOut = () => setUserSettingIsShow(false);
  // a hook function contains the views of setting input form
  const settingInput = () => {
    return (
      <View
        nativeID="1"
        style={{
          width: '95%',
          height: 400,
          alignSelf: 'center',
          alignItems: 'flex-start',
          position: 'absolute',
          margin: 10,
          elevation: 3,
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: 10,
        }}>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            right: 0,
            margin: 10,
          }}
          onPress={handlePressOut}>
          <Image
            source={require('../image/x.png')}
            style={{width: '100%', height: '100%'}}></Image>
        </TouchableOpacity>
        <View style={{width: '90%', marginTop: 50, alignSelf: 'center'}}>
          <TextInput
            theme={{colors: {primary: '#2c74bc'}}}
            style={{marginTop: 10, marginBottom: 10}}
            onChangeText={text => inputSettingHandle('urlServer', text)}
            label="url_server"
            defaultValue={settingValues.urlServer}></TextInput>
          <TextInput
            theme={{colors: {primary: '#2c74bc'}}}
            style={{marginTop: 10, marginBottom: 10}}
            onChangeText={text => inputSettingHandle('idCamera', text)}
            label="id_camera"
            defaultValue={settingValues.idCamera}
            mode="flat"></TextInput>
          <TextInput
            theme={{colors: {primary: '#2c74bc'}}}
            style={{marginTop: 10, marginBottom: 10}}
            onChangeText={text => inputSettingHandle('idOffice', text)}
            label="id_office"
            defaultValue={settingValues.idOffice}
            mode="flat"></TextInput>
          <Button
            style={{backgroundColor: '#2c74bc'}}
            mode="contained"
            onPress={storeSettingInput}>
            Thêm
          </Button>
          <Button
            style={{backgroundColor: '#2c74bc'}}
            mode="contained"
            onPress={toHomescreen}>
            xem
          </Button>
        </View>
      </View>
    );
  };
  // store setting of server to local storgae
  const storeSettingInput = async () => {
    try {
      let settingValue = [
        ['url_server', settingValues.urlServer],
        ['id_camera', settingValues.idCamera],
        ['id_office', settingValues.idOffice],
      ];
      await AsyncStorage.multiSet(settingValue, () => {
        console.log('save all data');
      });
    } catch (e) {
      console.log('saving error');
    }
  };
  // get data from local storage
  const getSettingData = async () => {
    try {
      let keys = ['url_server', 'id_camera', 'id_office'];
      AsyncStorage.multiGet(keys, (err: any, stores: any) => {
        stores.map((result: any, i: any, store: any) => {
          // let key = store[i][0];
          // let value = store[i][1];
          // let multiGet = result;
          setSettingValues({...settingValues, [keys[i]]: store[i][1]});
        });
      });
    } catch (e) {
      console.log('getting error');
    }
    //console.log(settings[0][1])
  };

  // render the login screen

  return (
    <View style={Styles.container}>
      <View style={Styles.topScreen}>
        <Image
          source={require('../image/logomb.png')}
          style={{width: '100%', height: '90%', alignSelf: 'center'}}
        />
        <TouchableOpacity
          onPress={() => {
            setUserSettingIsShow(true);
          }}
          style={Styles.settingLoginHolder}>
          <Icon name="settings" size={40} solid={false} color="white"></Icon>
        </TouchableOpacity>
      </View>
      <View style={Styles.bottomScreen}></View>
      <Card style={Styles.cardLogin}>
        <Card.Content style={{position: 'relative'}}>
          <Avatar.Icon style={Styles.avatarLogin} size={50} icon="account" />

          <TextInput
            label="Tài khoản"
            onFocus={handlePressOut}
            theme={{colors: {primary: '#2c74bc'}}}
            onChangeText={text => inputHandle('account', text)}></TextInput>
          <TextInput
            label="Mật khẩu"
            onFocus={handlePressOut}
            theme={{colors: {primary: '#2c74bc'}}}
            onChangeText={text => inputHandle('password', text)}
            secureTextEntry={true}></TextInput>

          <Button
            mode="contained"
            style={{backgroundColor: '#2c74bc'}}
            onPress={loginHandle}>
            Đăng nhập
          </Button>
          <TouchableOpacity onPress={() => console.log('work')}>
            <Text style={Styles.forgetPassword}>Bạn quên mật khẩu?</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
      {userSettingIsShow == true && settingInput()}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View
          style={Styles.modalLoadingAnimation}>
          <ActivityIndicator size="large" color="#2c74bc" />
        </View>
      </Modal>
    </View>
  );
};
export default LoginScreen;
