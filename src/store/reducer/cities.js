import {GET_CITIES} from "../actions/type"

const initialState=[{
    City:""
}];


export default function cities(state=initialState,action){

    switch(action.type){
        case GET_CITIES:
            return action.payload;
        default:
            return state
    }
}