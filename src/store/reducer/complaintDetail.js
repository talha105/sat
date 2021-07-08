import {GET_COM_DET} from "../actions/type"

const initialState=[{
    DESIGNATION:"",
    CODE_AGENCE:""
}];


export default function complaintDetail(state=initialState,action){

    switch(action.type){
        case GET_COM_DET:
            return action.payload;
        default:
            return state
    }


}