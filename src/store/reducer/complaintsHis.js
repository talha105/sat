import {GET_COM_HIS} from "../actions/type"

const initialState=false;


export default function complaintsHis(state=initialState,action){

    switch(action.type){
        case GET_COM_HIS:
            return action.payload;
        default:
            return state
    }
}