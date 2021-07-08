import {GET_PDF} from "../actions/type"

const initialState={};


export default function agencies(state=initialState,action){

    switch(action.type){
        case GET_PDF:
            return action.payload;
        default:
            return state
    }


}