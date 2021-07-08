import {GET_AGENCIES} from "../actions/type"

const initialState=[{
    DESIGNATION:"",
    CODE_AGENCE:""
}];


export default function agencies(state=initialState,action){

    switch(action.type){
        case GET_AGENCIES:
            return action.payload;
        default:
            return state
    }


}