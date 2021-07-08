import {BOOKING_HISTORY} from "../actions/type"

const initialState=false;


export default function history(state=initialState,action){

    switch(action.type){
        case BOOKING_HISTORY:
            return action.payload;
        default:
            return state
    }
}