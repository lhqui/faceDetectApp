import {ActionType} from '../actionTypes/ActionTypes';
import {initialStateType} from '../../components/Types'
import {Action} from '../actions/Actions'

const initialState = {
  id: '',
  group_id: '',
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  last_login: '',
  created_at: '',
  token: '',
  id_camera: '',
  id_office: ''
};
// type initialStateType = {
//   id: string;
//   group_id: string;
//   username: string;
//   email: string;
//   first_name: string;
//   last_name: string;
//   last_login: string;
//   create_at: string;
// };


const userReducer = (
  state: initialStateType = initialState,
  action: Action,
) => {
  switch (action.type) {
    case ActionType.SETUSER:
      return {
        ...state,
        id: action.payload.id,
        group_id: action.payload.group_id,
        username: action.payload.username,
        email: action.payload.email,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        last_login: action.payload.last_login,
        created_at: action.payload.created_at,
        token: action.payload.token,
        id_camera: action.payload.id_camera,
        id_office: action.payload.id_office
      };
    case ActionType.RESETUSER:
      return initialState;
    default:
      return state;
  }
};
export default userReducer;
