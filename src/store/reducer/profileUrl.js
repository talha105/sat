import {GET_PROFILE_PIC} from "../actions/type"

const initialState={imgUrl:""}


export default function profileUrl(state=initialState,action){

    switch(action.type){
        case GET_PROFILE_PIC:
            return action.payload;
        default:
            return state
    }
}