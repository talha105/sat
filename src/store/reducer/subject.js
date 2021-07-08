import {GET_SUBJECT} from "../actions/type"

const initialState=[];


export default function agencies(state=initialState,action){

    switch(action.type){
        case GET_SUBJECT:
            return action.payload;
        default:
            return state
    }


}