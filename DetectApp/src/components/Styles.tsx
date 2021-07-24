import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    elevation: 0,
  },
  avatar: {
    backgroundColor: '#e6e6e6',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    width: 120,
    height: 120,
  },
  avatarName: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  btnInUser: {
    //position: 'absolute',
    // marginLeft: 320,
    // color: "#8c8c8c",
    textAlign: 'center',
    fontSize: 50,
  },
  ViewCameraButtonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    margin: 20,
    flexDirection: 'row',
  },

  textCameraButton: {
    fontSize: 30,
    color: 'white',
  },
  topScreen: {
    backgroundColor: '#0464ac',
    height: 300,
    elevation: 1,
  },
  bottomScreen: {
    // backgroundColor: 'powderblue',
    backgroundColor: 'white',
    height: '60%',
    elevation: 1,
  },
  cardLogin: {
    position: 'absolute',
    width: '90%',
    height: 330,
    marginTop: '45%',
    margin: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 2,
  },
  avatarLogin: {
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: 20,
    backgroundColor: '#2c74bc',
  },
  roundButtonBorder: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 100,
    backgroundColor: '#e6e6e6',
    display: 'flex',
    borderWidth: 1,
  },

  buttonImage: {
    width: '100%',
    height: '100%',
  },
  settingLoginHolder: {
    position: 'absolute',
    right: 0,
    margin: 10,
    width: 40,
    height: 40,
  },
  forgetPassword: {
    color: '#2c74bc',
    fontSize: 20,
    padding: 10,
    alignSelf: 'center',
  },
  modalLoadingAnimation: {
    elevation: 4,
    height: 150,
    width: 150,
    position: 'absolute',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 300,
    justifyContent: 'center',
    borderRadius: 10,
  },
  viewContainProfileInfor: {
    marginTop: '5%',
    flexDirection: 'row',
    borderBottomWidth: 2,
    paddingBottom: '2%',
    borderColor: '#b3b3b3',
  },

  viewContainLog: {
    flexDirection: 'row',
  },
  logLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  logText: {
    fontSize: 18,
  },
  // components chung //////////////////////
  screenImage: {
    width: '100%',
    height: '100%',
  },
  roundButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 100,
    backgroundColor: '#e6e6e6',
    display: 'flex',
  },
  // Home screen//////////////////////////////////////////
  homeTopScreen: {
    width: '100%',
    height: '50%',
    flexWrap: 'wrap',
  },
  homeBottomScreen: {
    width: '100%',
    maxHeight: '70%',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  homeBottomScreenRowContainButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
    // backgroundColor:'red',
  },
  homeCreenCameraImage: {
    width: 100,
    height: 100,
    flexWrap: 'wrap',
    // backgroundColor:'green'
  },
  homeCreenCamera: {
    width: '74%',
    height: 50,
    borderRadius: 50,
    backgroundColor: '#2c74bc',
    justifyContent: 'center',
  },
  homeButtonLabel: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  homeButtonAndName: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  homeButtonAndNameAtMid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginLeft: '6%',
    marginRight: '6%',
  },
  // log creen,
  logContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    //borderWidth:1,
    //borderColor:'#b3b3b3'
  },
  logContainLeft: {
    width: '20%',
    paddingTop: 5,
    //backgroundColor:'red',
    flexWrap: 'wrap',
    alignContent: 'center',
  },
  logContainRight: {
    width: '80%',
    //backgroundColor:'blue',
    flexWrap: 'wrap',
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: '#b3b3b3',
  },
  // Camera screen////////////////////////////////////////////
  cameraTopScreen: {
    width: '100%',
    height: '70%',
    flexWrap: 'wrap',
    backgroundColor: 'blue',
  },
  cameraDisplay: {
    width: '100%',
    flex: 1,
  },
  cameraBottomScreen: {
    width: '100%',
    height: '30%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    //backgroundColor:'green'
  },
  cameraBottomLeft: {
    width: '40%',
    height: '100%',
    flexWrap: 'wrap',
    backgroundColor: 'gray',
  },
  cameraBottomRight: {
    width: '60%',
    height: '100%',
    //backgroundColor:'blue',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: 10,
  },
  cameraBottomInfoLabel: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  cameraBottomNameDisplay: {
    fontSize: 20,
    color: 'black',
  },
  buttonExitCamera: {
    position: 'absolute',
    right: 0,
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    // flexDirection:'row',
  },
  buttonFlipCamera: {
    position: 'absolute',
    fontSize: 20,
    width: 60,
    height: 60,
    display: 'flex',
  },
  //profile screen/////////////////////////////
  profileTopSCrenn: {
    height: '20%',
    width: '100%',
    //backgroundColor: '#c4c4c4',
    elevation: 2,
  },
  profileViewContainAvata: {
    width: '100%',
    height: '20%',
    marginTop: '30%',
    position: 'absolute',
    elevation: 3,
    backgroundColor: 'transparent',
  },
  profileScreenAvata: {
    width: 120,
    height: 120,
    borderRadius: 80,
    elevation: 3,
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
  profileBottomScreen: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    elevation: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '20%',
  },
  profileBottomInfoContain: {
    width: '100%',
    height: '100%',
   // backgroundColor: 'red',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  profileBottomInfoContainLeft: {
    width: '35%',
    height: '100%',
    flexDirection: 'column',
   // backgroundColor: 'blue',
    paddingLeft:'5%',
    paddingTop:'5%',
  },
  profileBottomInfoContainRight: {
    width: '65%',
    height: '100%',
    flexDirection: 'column',
   // backgroundColor: 'green',
    paddingTop:'5%',
    paddingRight:'4%'

  },
  profileLabel: {
    fontWeight: 'bold',
    fontSize: 23,
    borderBottomWidth:2,
    borderColor:'#b3b3b3',
    marginBottom:25
  },
  profileText: {
    fontSize: 23,
    marginBottom:25,
    borderBottomWidth:2,
    borderColor:'#b3b3b3'
    
  },
});
