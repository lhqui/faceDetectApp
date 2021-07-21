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
  buttonFlipCamera: {
    position: 'absolute',
    fontSize: 20,
    width: 50,
    height: 40,
    display: 'flex',
  },
  buttonExitCamera: {
    position: 'absolute',
    right: 0,
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    // flexDirection:'row',
  },
  camera: {
    height: '100%',
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
  roundButton: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 100,
    backgroundColor: '#e6e6e6',
    display: 'flex',
  },
  listButtonContainer: {
    flexDirection: 'row',
    padding: 10,
    flexWrap: 'wrap',
    // backgroundColor:'red',
    height: '60%',
  },
  viewContainAButton: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  homeTopScreen: {
    // backgroundColor: 'powderblue',
    height: '50%',
  },
  homeImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
  profileTopScreen: {
    // backgroundColor: '#cccccc',
    alignItems: 'flex-start',
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
    marginTop:'5%',
    flexDirection: 'row',
    borderBottomWidth: 2,
    paddingBottom: "2%",
    borderColor:'#b3b3b3'
  },
  profileLabel: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  profileText: {
    fontSize: 25,
  },
  viewContainLog: {
    flexDirection: 'row',
  },
  logLabel: {
    fontWeight: 'bold',
    fontSize: 18
  },
  logText: {
    fontSize: 18,
  },
});
