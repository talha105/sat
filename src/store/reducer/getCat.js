import {GET_REG_CAT} from "../actions/type"

const initialState=[{ label: "name" ,value:"abc" }];


export default function getCat(state=initialState,action){

    switch(action.type){
        case GET_REG_CAT:
            return action.payload;
        default:
            return state
    }
}