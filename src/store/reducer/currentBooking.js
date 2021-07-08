import {CURRENT_BOOKING} from "../actions/type"

const initialState={};


export default function currentBooking(state=initialState,action){

    switch(action.type){
        case CURRENT_BOOKING:
            return action.payload;
        default:
            return state
    }
}