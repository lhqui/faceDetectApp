import {initialStateType} from '../../components/Types';
import {ActionType} from '../actionTypes/ActionTypes';
interface setUser {
    type: ActionType.SETUSER;
    payload: initialStateType;
  }
  interface resetUser {
    type: ActionType.RESETUSER;
  }
  
export type Action = setUser | resetUser;