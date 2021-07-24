import * as React from 'react';
import {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  BackHandler,
  ScrollView,
  Image,
} from 'react-native';
import {Props} from '../components/Types';
import {Appbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Styles from '../components/Styles';
import {useSelector} from 'react-redux';
import {State} from '../stores';

const LogScreen: React.FC<Props> = ({navigation}) => {
  const handleBackButton = () => {
    navigation.goBack();
    return true;
  };
  const [listCheckinlog, setListCheckinlog] = useState([]);

  const userProfile = useSelector((state: State) => state.profile);
  const axios = require('react-native-axios');
  const getCheckinlog = async () => {
    const result = await axios.post('https://ai.giaiphapmobifone.vn/api/logs', {
      username: userProfile.username,
      token: userProfile.token,
    });
    setListCheckinlog(result.data.data);
  };
  useEffect(() => {
    getCheckinlog();
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    //return () => { }
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);
  const formatDayTime = (timeString: string) => {
    const year = timeString.substring(4, 0);
    const month = timeString.substring(5, 7);
    const day = timeString.substring(8, 10);
    const time = timeString.substring(10, 20);
    return day.concat('/', month, '/', year, ' ', time);
  };
  const renderListCheckinLog = (fetchData: any) => {
    let view = fetchData.map((log: any) => {
      return (
        <View key={log.id_checkin_logs} style={Styles.logContainer}>
          <View style={Styles.logContainLeft}>
            <Image
              source={require('../image/checkin.png')}
              style={{width: 60, height: 60}}></Image>
          </View>
          <View style={Styles.logContainRight}>
            <View style={Styles.viewContainLog}>
              <Text style={Styles.logLabel}>Mã số: </Text>
              <Text style={Styles.logText}>{log.id_checkin_logs}</Text>
            </View>
            <View style={Styles.viewContainLog}>
              <Text style={Styles.logLabel}>Họ Tên: </Text>
              <Text style={Styles.logText}>
                {log.first_name}
                {log.last_name}
              </Text>
            </View>
            <View style={Styles.viewContainLog}>
              <Text style={Styles.logLabel}>Thời gian: </Text>
              <Text style={Styles.logText}>
                {formatDayTime(log.created_at)}
              </Text>
            </View>
          </View>
        </View>
      );
    });
    return <ScrollView>{view}</ScrollView>;
  };

  return (
    <SafeAreaView style={Styles.container}>
      <Appbar.Header theme={{colors: {primary: '#2c74bc'}}}>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
        <Appbar.Content title="LỊCH SỬ" />
      </Appbar.Header>
      {/* //<Text>{JSON.stringify(listCheckinlog)}</Text> */}
      {listCheckinlog.length > 0 ? (
        renderListCheckinLog(listCheckinlog)
      ) : (
        <View style={Styles.modalLoadingAnimation}>
          <ActivityIndicator size="large" color="#2c74bc" />
        </View>
      )}
    </SafeAreaView>
  );
};
export default LogScreen;
