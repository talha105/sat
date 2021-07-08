import {GET_NOTIFICATION} from "../actions/type"

const initialState=[{
    title:"",
    msg:"",
    date_notif:"",
    heure:""
}];


export default function Notification(state=initialState,action){

    switch(action.type){
        case GET_NOTIFICATION:
            return action.payload;
        default:
            return state
    }
}