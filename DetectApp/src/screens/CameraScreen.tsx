import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  BackHandler,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RNCamera} from 'react-native-camera';
import Styles from '../components/Styles';
import type {Props} from '../components/Types';
import ImageEditor from '@react-native-community/image-editor';

import {Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {State, store} from '../stores';
import {Value} from 'react-native-reanimated';
import RNFS from 'react-native-fs';

interface cameraProps {
  box: any;
}
type details = {
  width: number;
  height: number;
  x: number;
  y: number;
  // yawAngle: number
  // rollAngle: number
};
interface img {
  image: HTMLImageElement | null;
}

interface settingDevice {
  id_office: string;
  id_camera: string;
}

const CameraScreen: React.FC<Props> = ({navigation}) => {
  const handleBackButton = () => {
    navigation.goBack();
    return true;
  };
  const [capPermission, setcapPermission] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [detectPhase, setDetectPhase] = useState(0);
  useEffect(() => {
    if (timeLeft === 0) {
      //  console.log("TIME LEFT IS 0");
      // setTimeLeft(null)
      //setcapPermission(true);
      //setDetectPhase(0);
      return;
    }
    // exit early when we reach 0
    //if (!timeLeft) return;
    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    //return () => ;
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      clearInterval(intervalId);
    };
  }, [timeLeft]);
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const userProfile = useSelector((state: State) => state.profile);
  // const [capturedImage, setCapturedImage] = useState<any>(null)
  const [capturedImage, setCapturedImage] = useState('');
  const [topLeft, setTopLeft] = useState<details>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const camera = React.createRef<RNCamera>();
  const axios = require('react-native-axios');

  const testData = (imagData: any, camera: any, token: any, office_id: any) => {
    console.log('string img ', imagData);
    console.log('string camera ', camera);
    console.log('string token ', token);
    console.log('string office', office_id);
  };
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [cropedImage, setcropImage] = useState('');
  // const cropImage = async (originPhoto: any) => {
  //   // let xNumber = 15*windowHeight/100
  //   //let yNumber = 16*windowWidth/100
  //   let xNumber = Number(topLeft.x);
  //   let yNumber = Math.abs(topLeft.y - 60);
  //   console.log(xNumber, yNumber);
  //   let options = {
  //     offset: {x: xNumber, y: yNumber},
  //     size: {
  //       width: topLeft.width,
  //       height: Math.abs(topLeft.height - 50),
  //     },
  //   };
  //   try {
  //     await ImageEditor.cropImage(originPhoto, options).then(uri => {
  //       urlToBase64(uri);
  //       setcropImage(uri);
  //     });
  //   } catch (error) {
  //     console.log('crop fail');
  //   }
  // };

  const takePicture = async () => {
    //const base64url = RNFS.readFile(cropedImage, 'base64')
    if (camera.current) {
      const Imageoptions = {
        quality: 1,
        base64: true,
        orientation: RNCamera.Constants.Orientation.portrait,
        fixOrientation: true,
        width: windowWidth,
        height: windowHeight,
      };
      const data = await camera.current.takePictureAsync(Imageoptions);

      setCapturedImage(data.uri);
      //cropImage(data.uri);
      //console.log("base64 ne", data.base64)
      sendIdentifyApi(data.base64);
    }
    setDetectPhase(0);
  };

  //const [baseUrl, setbaseUrl] = useState('')
  // const urlToBase64 = async (uriString: any) => {
  //   const data = await RNFS.readFile(uriString, 'base64').then(res => {
  //     return res;
  //   });
  //   //setbaseUrl(data)
  //   testData(data, userProfile.id_camera, userProfile.token, userProfile.id_office)
  //   sendIdentifyApi(data);
  // };
  const [recognizedName, setrecognizedName] = useState('');
  const sendIdentifyApi = (data: any) => {
    testData(
      '',
      userProfile.id_camera,
      userProfile.token,
      userProfile.id_office,
    );
    axios
      .post('https://ai.giaiphapmobifone.vn/api/face', {
        office_id: userProfile.id_office,
        camera_id: userProfile.id_camera,
        image: data,
        token: userProfile.token,
      })
      .then((res: any) => {
        if( res.data.status === 1 && res.data.data !== null) {
          console.log(res.data);
          setrecognizedName(res.data.data.name);
          setDetectPhase(0);
        }
      })
      .catch((err: any) => {
        console.log('loi khong gui dc');
      });
  };

  const checkCoordinate = () => {
    console.log(windowWidth ,windowHeight)
    console.log(topLeft)
    if (
       topLeft.x <= 13*windowHeight/100 && topLeft.x > 0 &&
      topLeft.y <= 47*windowWidth/100 && topLeft.y > 0 &&
      topLeft.height <= 34*windowHeight/100 && topLeft.height > 0 &&
      topLeft.width <= 75*windowWidth/100 && topLeft.width > 0 
    ) {
     // console.log("dc chup")
      setDetectPhase(1);
      takePicture();
      setTimeLeft(10);
    } else {
     setDetectPhase(0);
      console.log("ko dc chup")
    }
  };
  const checkPermisionForCap = () => {
    if (timeLeft === 0) {
      takePicture();
      setTimeLeft(10);
    }
  };

  const handleFaceDetection = ({faces}: any) => {
      if(timeLeft === 0) {
                setTopLeft({
          ...topLeft,
          height: Math.ceil(faces[0].bounds.size.height),
          width: Math.ceil(faces[0].bounds.size.width),
          x: Math.ceil(faces[0].bounds.origin.x),
          y: Math.ceil(faces[0].bounds.origin.y),
        });
        checkCoordinate()
      }
  };
  // const handleFaceDetection = ({faces}: any) => {
  //   console.log(detectPhase)
  //   //console.log(timeLeft===0)
  //   switch (detectPhase) {
  //     case 0:
  //       setTopLeft({
  //         ...topLeft,
  //         height: Math.ceil(faces[0].bounds.size.height),
  //         width: Math.ceil(faces[0].bounds.size.width),
  //         x: Math.ceil(faces[0].bounds.origin.x),
  //         y: Math.ceil(faces[0].bounds.origin.y),
  //       });
  //       checkCoordinate();
  //       break;
  //     case 1:
  //       checkPermisionForCap();
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const toExistCamera = () => navigation.navigate('Home');
  const [cameraId, setcameraId] = useState('');
  const imageReview = (photo: any) => {
    return (
      <View
        style={{
          height: '90%',
          width: '100%',
          //borderWidth: 2,
          marginLeft: '3%',
          marginBottom: '3%',
        }}>
        {photo != '' && (
          <Image
            style={{
              width: '100%',
              height: '100%',
              marginLeft: '3%',
              marginBottom: '3%',
            }}
            source={{uri: photo}}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={Styles.container}>
      <View style={{height: '70%', width: '100%'}}>
        <RNCamera
          ref={camera}
          style={Styles.camera}
          type={type}
          cameraId={cameraId}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
          //onFaceDetectionError={handeFaceDetectError}
          onFacesDetected={handleFaceDetection}
          faceDetectionClassifications={
            RNCamera.Constants.FaceDetection.Classifications.all
          }>
          <View style={Styles.ViewCameraButtonContainer}>
            <TouchableOpacity
              style={Styles.buttonFlipCamera}
              onPress={() => {
                setType(
                  type === RNCamera.Constants.Type.back
                    ? RNCamera.Constants.Type.front
                    : RNCamera.Constants.Type.back,
                );
              }}>
              <Image
                source={require('../image/flipcamera.png')}
                style={{width: '100%', height: '100%'}}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toExistCamera}
              style={Styles.buttonExitCamera}>
              <Image
                source={require('../image/x.png')}
                style={{width: '100%', height: '100%'}}></Image>
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>

      <View style={{height: '30%', width: '100%', flexWrap: 'wrap'}}>
        <View
          style={{
            width: '40%',
            height: '100%',
            flexDirection: 'column-reverse',
            backgroundColor: '',
            flexWrap: 'wrap',
          }}>
          {imageReview(capturedImage)}
        </View>
        <View style={{width: '60%', height: '100%'}}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              paddingTop: '10%',
              fontWeight: 'bold',
            }}>
            Tên chấm công:{' '}
          </Text>
          <Text style={{fontSize: 30, color: 'black', padding: '5%'}}>
            [ {recognizedName == '' ? '' : recognizedName} ]
          </Text>
        </View>
      </View>

      <View
        style={{
          width: '40%',
          height: '20%',
          position: 'absolute',
          borderWidth: 2,
          borderColor: detectPhase > 0 ? 'green' : 'black',
          alignSelf: 'center',
          marginTop: '30%',
        }}>
        <Text
          style={{
            fontSize: 70,
            color: 'black',
            padding: '5%',
            marginTop:'30%',
            alignSelf: 'center',
          }}>
          {timeLeft}
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default CameraScreen;
