import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  BackHandler,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RNCamera} from 'react-native-camera';
import Styles from '../components/Styles';
import type {Props} from '../components/Types';
import ImageEditor from '@react-native-community/image-editor';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {State, store} from '../stores';
const userProfile = useSelector((state: State) => state.profile);

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
// type ImageOffset = {
//   x: number,
//   y: number,
// };

// type ImageSize = {
//   width: number,
//   height: number,
// };

// type ImageCropData = {
//   offset: ImageOffset,
//   size: ImageSize,
//   displaySize: ImageSize,
//   resizeMode: any,
// };

const CameraScreen: React.FC<Props> = ({navigation}) => {
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
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  
  // const [capturedImage, setCapturedImage] = useState<any>(null)
  const [capturedImage, setCapturedImage] = useState('');
  const [topLeft, setTopLeft] = useState<details>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  // const [faceBox, setFaceBox] = useState([])
  // const [faceBox, setFaceBox] = useState<cameraProps>([])
  const camera = React.createRef<RNCamera>();
  const axios = require('react-native-axios');
  const takePicture = async () => {
    if (camera.current) {
      const Imageoptions = {quality: 0.5, base64: true, width: windowWidth, height: windowHeight};
      const data = await camera.current.takePictureAsync(Imageoptions);
      const camId = cameraId
      setCapturedImage(data.uri);
      axios.post('https://ai.giaiphapmobifone.vn/api/face', {
        office_id: '',
        camera_id: camId,
        image: data,
        token:'',
      })
      .then((res:any) => {
        if(res.data.status === 1) {
          setDetectPhase(2)
        }else {
          setDetectPhase(0)
        }
      })
      .catch((err:any) => {
        console.log(err);
        
      })

    }
  };
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [cropedImage, setcropImage] = useState('');
  const cropImage = async (originPhoto: any) => {
    let xNumber = 15*windowHeight/100
    let yNumber = 16*windowWidth/100
    console.log(xNumber, yNumber)
    let options = {
      offset: {x: xNumber, y: yNumber},
      size: {
        width: 190,
        height: 180,
      },
    };
    try {
      await ImageEditor.cropImage(originPhoto, options).then(uri =>
        setcropImage(uri),
      );
    } catch (error) {
      console.log('crop fail');
    }
  };

  const [facesDetail, setFacesDetail] = useState([]);
  const [onRecognize, setRecognize] = useState(false);
  const handeFaceDetect = async({faces}: any) => {
    
    if(onRecognize == false) {
      setTopLeft({
        ...topLeft,
        height: Math.ceil(faces[0].bounds.size.height)  ,
        width: Math.ceil(faces[0].bounds.size.width) ,
        x: Math.ceil(faces[0].bounds.origin.x),
        y: Math.ceil(faces[0].bounds.origin.y),
      });
      checkCoordinate() 
      if(rightNumber == 3) {
        await delay()
      }
    //  // setRecognize(true)
    } 
    //setFacesDetail(faces);
    //getdetail()
 
  };
  const [rightNumber, setNumber] = useState(0)
  const checkCoordinate = () => {
    if(topLeft.x <= 80 && topLeft.y <= 160 && topLeft.height <= 210 && topLeft.width <= 240 ) {
        setDetectPhase(1)
    }else {
      setDetectPhase(0)
    }
  };
  const delay = () => {
    return new Promise(res => {
      setTimeout(() => {
        res(setDetectPhase(0)); 
      }, 5000);
    })
  }
  const [detectPhase, setDetectPhase] = useState(0)
  const handleFaceDetection = async({faces}:any) => {
    switch (detectPhase) {
      case 0:
        setTopLeft({
          ...topLeft,
          height: Math.ceil(faces[0].bounds.size.height)  ,
          width: Math.ceil(faces[0].bounds.size.width) ,
          x: Math.ceil(faces[0].bounds.origin.x),
          y: Math.ceil(faces[0].bounds.origin.y),
        });
        checkCoordinate();
        break;
      case 1:
        takePicture();
        break;
      case 2:
        await delay();
        break;
      default:
        break;
    }
  }

  const toExistCamera = () => navigation.navigate('Home');
  const [cameraId, setcameraId] = useState('')
  const imageReview = (photo: any) => {
    return (
      <View
        style={{
          height: 170,
          width: 160,
          backgroundColor: 'red',
          alignContent: 'flex-end',
          left: 0,
          position: 'absolute',
          marginLeft: 20,
          marginTop: 10,
          marginBottom: 30,
        }}>
          { photo != "" &&  <Image style={{width: '100%', height: '100%'}} source={{uri: photo}} />}
      </View>
    );
  };
  return (
    <SafeAreaView style={Styles.container}>
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
      <View style={{height: '30%', alignItems: 'center', padding: '5%'}}>
        {/* <TouchableOpacity style={Styles.roundButtonBorder}>

        </TouchableOpacity> */}
        {imageReview(capturedImage)}
      </View>
      <View 
      style={{
        width: 200,
        height: 200,
        position: 'absolute',
        borderWidth: 2,
        borderColor: detectPhase>0? 'green':'black',
        alignSelf:'center',
        marginTop: '30%'
      }}
      >

      </View>
     
    </SafeAreaView>
  );
};
export default CameraScreen;
//
{
  /* <TouchableOpacity style={Styles.buttonExitCamera}>
<Text
  style={{
    fontSize: 20,
    color: 'white',
    position: 'absolute',
    marginLeft: 'auto',
  }}
  onPress={() => {
    navigation.navigate('Home');
  }}>
  X
</Text>
</TouchableOpacity> */
}
