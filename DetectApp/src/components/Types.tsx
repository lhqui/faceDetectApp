import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type ScreenProps = {
    Home: { userName: String};
    Login: any;
  };
type HomeScreenRouteProp = RouteProp<ScreenProps, 'Home'>
 export type Props = {
   navigation: any
   route: HomeScreenRouteProp
 }
export type initialStateType = {
  id: string;
  group_id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  last_login: string;
  created_at: string;
  token: string;
  id_camera: string,
  id_office: string
};