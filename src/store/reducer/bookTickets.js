import {GET_BOOK_TICKET} from "../actions/type"

const initialState=false;


export default function bookTickets(state=initialState,action){

    switch(action.type){
        case GET_BOOK_TICKET:
            return action.payload;
        default:
            return state
    }


}