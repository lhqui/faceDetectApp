import {ActionType} from "../actionTypes/ActionTypes"
import { Dispatch } from "redux"
import {Action} from '../actions/Actions'
import {initialStateType} from '../../components/Types'
export const setUsertoStore =  (data:initialStateType ) => {
    return(dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SETUSER,
            payload: data
        })
    }
}

export const resetUsertoStore =  () => {
    return(dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.RESETUSER
        })
    }
}