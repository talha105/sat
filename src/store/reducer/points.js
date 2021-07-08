import {GET_POINTS} from "../actions/type"

const initialState={points:"loading"}


export default function points(state=initialState,action){

    switch(action.type){
        case GET_POINTS:
            return action.payload;
        default:
            return state
    }
}